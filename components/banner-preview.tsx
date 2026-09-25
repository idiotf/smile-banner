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
    <div className='flex flex-col h-52.5 overflow-hidden'>
      <div
        className='flex-1 bg-center bg-no-repeat bg-size-[1200px]'
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : '',
          backgroundColor,
        }}
      />
      <div
        className='bg-white pl-[calc(50%-417px)] max-[1200px]:pl-38.5 max-[768px]:pl-30'
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

export type ProfilePreviewProps = BannerPreviewProps

export function ProfilePreview(props: ProfilePreviewProps) {
  return (
    <div className='overflow-hidden bg-white nanum-square-web-font'>
      <BannerPreview {...props} />
      <div className='relative w-265.5 -mt-14.75 mb-11 mx-auto select-none'>
        <div className='size-29.5 border-4 border-white rounded-full -ml-1 bg-[#eee]' />
        <div className='mt-6'>
          <div className='w-48 h-7 rounded-md bg-[#eee]' />
          <div className='mt-4.5'>
            <span className='pr-1.5 text-[#555] text-sm leading-4 align-top'>
              팔로잉{' '}
              <em className='align-middle inline-block w-8 h-[1em] rounded-md bg-[#eee]' />
            </span>
            <span className='relative pl-2 pr-1.5 text-[#555] text-sm leading-4 align-top'>
              팔로워{' '}
              <em className='align-middle inline-block w-8 h-[1em] rounded-md bg-[#eee]' />
              <span className='absolute left-0 top-1/2 size-0.5 -mt-px rounded-full bg-[#a4a4a4]' />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
