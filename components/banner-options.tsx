import { paths, type PathType } from '@/paths'
import { IconPreview } from './banner-preview'
import { FileButtonWithLabel } from '@/components/file-select-button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
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

export interface BannerOptionsProps {
  spaceHeight: number
  selectedIcon: PathType
  onSpaceHeightChange: (value: number | undefined) => void
  onIconSelect: (value: PathType | null) => void
  onFileSelect: (fileList: FileList) => void
}

export function BannerOptions({
  spaceHeight,
  selectedIcon,
  onSpaceHeightChange,
  onIconSelect,
  onFileSelect,
}: BannerOptionsProps) {
  return (
    <FieldGroup className='max-w-300 mx-auto'>
      <Field>
        <FieldLabel>배너 이미지</FieldLabel>
        <FileButtonWithLabel
          onFileSelect={onFileSelect}
          className='w-min!'
        />
      </Field>
      <Field>
        <FieldLabel>여백 높이</FieldLabel>
        <NumberInput
          value={spaceHeight}
          onValueChange={onSpaceHeightChange}
          min={0}
          step='any'
          required
        />
      </Field>
      <Field>
        <FieldLabel>스마일 모양</FieldLabel>
        <Select
          items={pathItems}
          value={selectedIcon}
          onValueChange={onIconSelect}
        >
          <SelectTrigger>
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
      </Field>
    </FieldGroup>
  )
}
