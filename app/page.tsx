'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'
import { useBlobUrl } from '@/hooks/use-blob-url'
import { paths } from '@/paths'
import { ProfilePreview } from '@/components/banner-preview'
import { BannerOptions } from '@/components/banner-options'
import '@/fonts/nanum-square-web-font/index.css'

function preventDefault(e: { preventDefault(): void }) {
  e.preventDefault()
}

export default function Page() {
  const [file, setFile] = useState<File>()
  const [spaceHeight, setSpaceHeight] = useReducer((_, v) => v ?? 0, 32)
  const [selectedIcon, setSelectedIcon] =
    useReducer<'basicSmile', ['basicSmile' | null]>((_, v) => v!, 'basicSmile')

  const fileUrl = useBlobUrl(file)
  const selectedIconPathHtml = paths[selectedIcon]

  const handleFileList = useCallback((fileList: ArrayLike<File>) => {
    const files = Array.from(fileList)
    const file = files.find((v) => v.type.startsWith('image/')) ?? files[0]
    if (!file) return

    setFile(file)
  }, [])

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
  }, [])

  return (
    <main className='h-dvh'>
      <div className='h-full flex justify-center items-center'>
        <div className='border box-content w-300 shadow-[0_0_48px_-24px] overflow-hidden'>
          <ProfilePreview
            bgUrl={fileUrl}
            spaceHeight={spaceHeight}
            selectedIconHtml={selectedIconPathHtml.content}
          />
        </div>
      </div>
      <div className='absolute left-0 right-0 bottom-0 h-64 bg-background border-t p-4 overflow-auto'>
        <BannerOptions
          spaceHeight={spaceHeight}
          selectedIcon={selectedIcon}
          onSpaceHeightChange={setSpaceHeight}
          onIconSelect={setSelectedIcon}
          onFileSelect={handleFileList}
        />
      </div>
    </main>
  )
}
