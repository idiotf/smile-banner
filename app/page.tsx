'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'
import { generateBannerSvg } from '@/generator/banner'
import { downloadBlob } from '@/utils/common/download'
import { useBlobUrl } from '@/hooks/use-blob-url'
import { paths } from '@/paths'
import { ProfilePreview } from '@/components/banner-preview'
import { BannerOptions, type FieldErrors } from '@/components/banner-options'
import '@/fonts/nanum-square-web-font/index.css'

function preventDefault(e: { preventDefault(): void }) {
  e.preventDefault()
}

export default function Page() {
  const [file, setFile] = useState<File>()
  const [backgroundColor, setBackgroundColor] = useState('#16d8a3')
  const [spaceHeight, setSpaceHeight] = useReducer((_, v) => v ?? 0, 32)
  const [selectedIcon, setSelectedIcon] =
    useReducer<'basicSmile', ['basicSmile' | null]>((_, v) => v!, 'basicSmile')

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState('')

  const fileUrl = useBlobUrl(file)
  const selectedIconPathHtml = paths[selectedIcon]

  const handleFileList = useCallback((fileList: ArrayLike<File>) => {
    const files = Array.from(fileList)
    const file = files.find((v) => v.type.startsWith('image/')) ?? files[0]
    if (!file) return

    setFile(file)
  }, [])

  const downloadIcon = useCallback(() => {
    setError('')
    setFieldErrors({})

    if (!file) {
      setFieldErrors({ image: '배너 이미지를 선택해 주세요.' })
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', onLoad)
    reader.addEventListener('error', onError)
    reader.readAsDataURL(file)

    function cleanupListeners() {
      reader.removeEventListener('load', onLoad)
      reader.removeEventListener('error', onError)
    }

    function onLoad() {
      cleanupListeners()

      const imageUrl = reader.result as string
      const generatedSvg = generateBannerSvg({
        imageUrl,
        backgroundColor,
        spaceHeight,
        selectedIconHtml: paths[selectedIcon].content,
      })
      downloadBlob(new Blob([generatedSvg]), 'smile-banner.svg')
    }

    function onError() {
      cleanupListeners()
      setError('배너 이미지를 불러오는 중 오류가 발생했습니다.')
    }
  }, [file, backgroundColor, spaceHeight, selectedIcon])

  useEffect(() => {
    function onDrop(event: DragEvent) {
      event.preventDefault()
      handleFileList(event.dataTransfer?.files || [])
    }

    addEventListener('dragover', preventDefault)
    addEventListener('drop', onDrop)

    return () => {
      removeEventListener('dragover', preventDefault)
      removeEventListener('drop', onDrop)
    }
  }, [handleFileList])

  return (
    <main className='h-dvh flex flex-col'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='border box-content w-7xl shadow-[0_0_48px_-24px] overflow-hidden'>
          <ProfilePreview
            bgUrl={fileUrl}
            backgroundColor={backgroundColor}
            spaceHeight={spaceHeight}
            selectedIconHtml={selectedIconPathHtml.content}
          />
        </div>
      </div>
      <div className='bg-background border-t p-4 overflow-auto'>
        <BannerOptions
          backgroundColor={backgroundColor}
          spaceHeight={spaceHeight}
          selectedIcon={selectedIcon}
          onBackgroundColorChange={setBackgroundColor}
          onSpaceHeightChange={setSpaceHeight}
          onIconSelect={setSelectedIcon}
          onFileSelect={handleFileList}
          onGenerate={downloadIcon}
          fieldErrors={fieldErrors}
          error={error}
        />
      </div>
    </main>
  )
}
