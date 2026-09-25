import { useCallback, type ChangeEvent } from 'react'
import { DownloadIcon, CircleAlert } from 'lucide-react'
import { paths, type PathType } from '@/paths'
import { IconPreview } from './banner-preview'
import { FileButtonWithLabel } from '@/components/file-select-button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
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
import '@/fonts/nanum-square-web-font/index.css'

const pathItems = Object.entries(paths).map(([k, v]) => ({
  label: v.label,
  value: k,
})) as { label: string, value: PathType }[]

export type FieldType =
  | 'image'
  | 'backgroundColor'
  | 'spaceHeight'
  | 'selectedIcon'
export type FieldErrors = { [K in FieldType]?: string }

export interface BannerOptionsProps {
  backgroundColor: string
  spaceHeight: number
  selectedIcon: PathType
  onBackgroundColorChange: (value: string) => void
  onSpaceHeightChange: (value: number | undefined) => void
  onIconSelect: (value: PathType | null) => void
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
}: BannerOptionsProps) {
  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onBackgroundColorChange(event.target.value)
    },
    [onBackgroundColorChange],
  )

  return (
    <FieldGroup className='max-w-300 mx-auto'>
      <Field data-invalid={!!fieldErrors.image}>
        <FieldLabel>배너 이미지</FieldLabel>
        <FileButtonWithLabel
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
        <Select
          items={pathItems}
          value={selectedIcon}
          onValueChange={onIconSelect}
        >
          <SelectTrigger className='w-56!'>
            <SelectValue>
              <IconPreview
                viewBox='0 0 32 32'
                selectedIconHtml={paths[selectedIcon].preview}
                className='*:fill-foreground h-full scale-125'
              />
              {paths[selectedIcon].label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pathItems.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  <IconPreview
                    viewBox='0 0 32 32'
                    selectedIconHtml={paths[value].preview}
                    className='*:fill-foreground h-full size-5 scale-125'
                  />
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError>{fieldErrors.selectedIcon}</FieldError>
      </Field>
      <div className='flex items-stretch gap-2'>
        <Button onClick={onGenerate}>
          <DownloadIcon />
          다운로드
        </Button>
        {error && (
          <p className='text-destructive flex items-center gap-1'>
            <CircleAlert className='inline-block size-[1em]' />
            {error}
          </p>
        )}
      </div>
    </FieldGroup>
  )
}
