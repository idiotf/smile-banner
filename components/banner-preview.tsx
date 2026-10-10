export interface BannerPreviewProps {
  bgUrl: string | undefined | null
  backgroundColor: string
  spaceHeight: number
  selectedIconHtml: string
}

export function BannerPreview({
  bgUrl,
  backgroundColor,
  spaceHeight,
  selectedIconHtml,
}: BannerPreviewProps) {
  return (
    <div className='@container flex h-52.5 flex-col overflow-hidden'>
      <div className='flex flex-1 justify-center' style={{ backgroundColor }}>
        <div
          className='h-full w-300 shrink-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : '',
          }}
        />
      </div>
      <div
        className='bg-white pl-[calc(50%-417px)] @max-[1200px]:pl-38.5 @max-[768px]:pl-30'
        style={{ height: spaceHeight }}
      >
        <IconPreview
          selectedIconHtml={selectedIconHtml}
          className='w-full'
          style={{ height: spaceHeight }}
        />
      </div>
    </div>
  )
}
