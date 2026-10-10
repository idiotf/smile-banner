export interface IconPreviewProps extends React.ComponentProps<'svg'> {
  selectedIconHtml: string
}

export function IconPreview({ selectedIconHtml, ...props }: IconPreviewProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      dangerouslySetInnerHTML={{ __html: selectedIconHtml }}
      {...props}
    />
  )
}
