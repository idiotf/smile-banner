import { useCallback, type ChangeEvent } from 'react'
import { FileIcon, DownloadIcon, CircleAlert } from 'lucide-react'
import { useBlobUrl } from '@/hooks/use-blob-url'
import { paths, type PathType } from '@/paths'
import { IconPreview } from './banner-preview'
import { FileButtonWithLabel } from '@/components/file-select-button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { NumberInput } from '@/components/number-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateImageSvg } from '@/generator/image-svg'
import { selectFile } from '@/utils/common/select-file'

const pathItems = Object.entries(paths).map(([k, v]) => ({
  label: v.label,
  value: k,
})) as { label: string; value: PathType }[]

interface IconSelectProps {
  selectedIcon: PathType | File | null
  onIconSelect: (value: PathType | File | null) => void
}

function IconSelect({ selectedIcon, onIconSelect }: IconSelectProps) {
  const selectedValue = selectedIcon === null
    ? 'none'
    : selectedIcon instanceof File
      ? 'custom'
      : `icon-${selectedIcon}`

  const onValueChange = useCallback(
    async (value: string | null) => {
      if (value === 'custom') {
        const fileList = await selectFile({
          accept: ['image/*'],
        })
        const file = fileList[0]
        if (!file) return

        onIconSelect(file)
        return
      }

      onIconSelect(
        value === 'none' || value === null
          ? null
          : value.replace('icon-', '') as PathType,
      )
    },
    [onIconSelect],
  )

  const iconFileUrl = useBlobUrl(selectedIcon instanceof File ? selectedIcon : null)

  const selectedIconInfo = selectedIcon === null
    ? null
    : selectedIcon instanceof File
      ? {
        preview: generateImageSvg(iconFileUrl!, 32, 32),
        label: selectedIcon.name,
      }
      : paths[selectedIcon]

  return (
    <Select
      items={pathItems}
      value={selectedValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className='w-56!'>
        <SelectValue>
          <IconPreview
            viewBox='0 0 32 32'
                selectedIconHtml={selectedIconInfo?.preview ?? ''}
            className='h-full scale-125 *:fill-foreground'
          />
          {selectedIconInfo?.label ?? '스마일 없음'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='none'>
            <div className='inline-block size-5' />
            스마일 없음
          </SelectItem>
          {pathItems.map(({ label, value }) => (
            <SelectItem key={value} value={`icon-${value}`}>
              <IconPreview
                viewBox='0 0 32 32'
                    selectedIconHtml={paths[value].preview}
                className='size-5 h-full scale-125 *:fill-foreground'
              />
              {label}
            </SelectItem>
          ))}
          <SelectItem value='custom'>
            <FileIcon className='size-5' />
            사용자 지정
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export type FieldType =
  'image' | 'backgroundColor' | 'spaceHeight' | 'selectedIcon'
export type FieldErrors = { [K in FieldType]?: string }

export interface BannerOptionsProps extends React.ComponentProps<
  typeof FieldGroup
> {
  backgroundColor: string
  spaceHeight: number
  selectedIcon: PathType | File | null
  onBackgroundColorChange: (value: string) => void
  onSpaceHeightChange: (value: number | undefined) => void
  onIconSelect: (value: PathType | File | null) => void
  onFileSelect: (fileList: FileList) => void
  onGenerate: () => void
  fieldErrors?: FieldErrors
  error?: string | undefined | null
}

export function BannerOptions({
  backgroundColor,
  spaceHeight,
  selectedIcon,
  onBackgroundColorChange,
  onSpaceHeightChange,
  onIconSelect,
  onFileSelect,
  onGenerate,
  fieldErrors = {},
  error,
  ...props
}: BannerOptionsProps) {
  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onBackgroundColorChange(event.target.value)
    },
    [onBackgroundColorChange],
  )

  return (
    <FieldGroup {...props}>
      <Field data-invalid={!!fieldErrors.image}>
        <FieldLabel>배너 이미지</FieldLabel>
        <FileButtonWithLabel
          accept={['image/*']}
          onFileSelect={onFileSelect}
          className='w-min!'
        />
        <FieldError>{fieldErrors.image}</FieldError>
      </Field>
      <Field data-invalid={!!fieldErrors.backgroundColor}>
        <FieldLabel>배경 색깔</FieldLabel>
        <Input
          type='color'
          value={backgroundColor}
          onChange={handleColorChange}
          className='size-8! p-0.5'
        />
        <FieldError>{fieldErrors.backgroundColor}</FieldError>
      </Field>
      <Field data-invalid={!!fieldErrors.spaceHeight}>
        <FieldLabel>여백 높이</FieldLabel>
        <NumberInput
          value={spaceHeight}
          onValueChange={onSpaceHeightChange}
          min={0}
          step='any'
          required
          className='w-56!'
        />
        <FieldError>{fieldErrors.spaceHeight}</FieldError>
      </Field>
      <Field data-invalid={!!fieldErrors.selectedIcon}>
        <FieldLabel>스마일 모양</FieldLabel>
        <IconSelect
          selectedIcon={selectedIcon}
          onIconSelect={onIconSelect}
        />
        <FieldError>{fieldErrors.selectedIcon}</FieldError>
      </Field>
      <div className='flex items-stretch gap-2'>
        <Button onClick={onGenerate}>
          <DownloadIcon />
          다운로드
        </Button>
        {error && (
          <p className='flex items-center gap-1 text-destructive'>
            <CircleAlert className='inline-block size-[1em]' />
            {error}
          </p>
        )}
      </div>
    </FieldGroup>
  )
}
