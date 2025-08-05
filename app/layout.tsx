import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from './i18n/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multimodel GPU Memory Calculator | 多模型GPU显存计算器',
  description: 'Multimodel GPU memory requirement calculation & server recommendation tool | 多模型GPU显存需求计算与服务器推荐工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}