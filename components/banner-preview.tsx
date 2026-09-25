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
    <div className='flex h-52.5 flex-col overflow-hidden'>
      <div
        className='flex-1 bg-size-[1200px] bg-center bg-no-repeat'
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
    <div className='nanum-square-web-font overflow-hidden bg-white'>
      <BannerPreview {...props} />
      <div className='relative mx-auto -mt-14.75 mb-11 w-265.5 select-none'>
        <div className='-ml-1 size-29.5 rounded-full border-4 border-white bg-[#eee]' />
        <div className='mt-6'>
          <div className='h-7 w-48 rounded-md bg-[#eee]' />
          <div className='mt-4.5'>
            <span className='pr-1.5 align-top text-sm leading-4 text-[#555]'>
              팔로잉{' '}
              <em className='inline-block h-[1em] w-8 rounded-md bg-[#eee] align-middle' />
            </span>
            <span className='relative pr-1.5 pl-2 align-top text-sm leading-4 text-[#555]'>
              팔로워{' '}
              <em className='inline-block h-[1em] w-8 rounded-md bg-[#eee] align-middle' />
              <span className='absolute top-1/2 left-0 -mt-px size-0.5 rounded-full bg-[#a4a4a4]' />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
