import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
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
    default: 'Template',
    template: '%s | Template',
  },
  description: 'Next.js + Shadcn Template',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={bodyClass}>
        <ThemeProvider enableHotkey>{children}</ThemeProvider>
      </body>
    </html>
  )
}
