import { BannerPreview, type BannerPreviewProps } from './banner'
import '@/fonts/nanum-square-web-font/index.css'

export type ProfilePreviewProps = BannerPreviewProps

export function ProfilePreview(props: ProfilePreviewProps) {
  return (
    <div className='nanum-square-web-font @container overflow-hidden bg-white'>
      <BannerPreview {...props} />
      <div className='relative mx-auto -mt-14.75 mb-11 w-265.5 select-none @max-[1200px]:-mt-12.5 @max-[1200px]:w-auto @max-[1200px]:px-7.5 @max-[768px]:-mt-10 @max-[768px]:px-4 @max-[768px]:pb-6'>
        <div className='-ml-1 box-content size-27.5 rounded-full border-4 border-white bg-[#eee] @max-[1200px]:size-30 @max-[768px]:size-25' />
        <div className='mt-6 @max-[1200px]:mt-5'>
          <div className='h-7 w-48 rounded-md bg-[#eee] @max-[1200px]:h-6.5 @max-[768px]:h-6' />
          <div className='mt-4.5 @max-[1200px]:mt-6 @max-[768px]:mt-4'>
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
