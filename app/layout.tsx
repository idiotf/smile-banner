import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import lightIcon from './icons/light.svg'
import darkIcon from './icons/dark.svg'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
})

const bodyClass = cn(
  notoSansKR.className,
  'bg-background text-foreground antialiased',
)

export const metadata: Metadata = {
  title: {
    default: '스마일 배너 생성기',
    template: '%s | 스마일 배너 생성기',
  },
  description:
    '엔트리 마이 페이지에 쓰기 위한 스마일 배너를 생성하는 기능을 제공합니다.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <link
          rel='icon'
          href={lightIcon.src}
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          href={darkIcon.src}
          media='(prefers-color-scheme: dark)'
        />
      </head>
      <body className={bodyClass}>
        <ThemeProvider enableHotkey>{children}</ThemeProvider>
      </body>
    </html>
  )
}
