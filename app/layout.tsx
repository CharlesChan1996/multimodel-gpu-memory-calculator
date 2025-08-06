import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from './i18n/context'
import StructuredData from './components/StructuredData'
import GoogleAnalytics from './components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GPU Memory Calculator - AI Model VRAM Requirements | 多模型GPU显存计算器',
    template: '%s | GPU Memory Calculator'
  },
  description: 'Professional GPU memory calculator for AI models. Calculate VRAM requirements for LLM, multimodal, and TTS models. Get server recommendations for optimal AI deployment. | 专业的AI模型GPU显存计算器，支持大语言模型、多模态模型显存需求计算与服务器推荐。',
  keywords: [
    'GPU memory calculator',
    'VRAM calculator',
    'AI model memory',
    'LLM memory requirements',
    'GPU显存计算器',
    'AI模型显存',
    '大语言模型显存',
    'Qwen',
    'ChatGLM',
    'DeepSeek',
    'Llama',
    'GPU server recommendation',
    'AI inference',
    'machine learning',
    'deep learning'
  ],
  authors: [{ name: 'GPU Memory Calculator Team' }],
  creator: 'GPU Memory Calculator',
  publisher: 'GPU Memory Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://llmgpucalculator.info'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'zh-CN': '/zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://llmgpucalculator.info',
    title: 'GPU Memory Calculator - AI Model VRAM Requirements',
    description: 'Professional GPU memory calculator for AI models. Calculate VRAM requirements for LLM, multimodal, and TTS models.',
    siteName: 'GPU Memory Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GPU Memory Calculator - AI Model VRAM Requirements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPU Memory Calculator - AI Model VRAM Requirements',
    description: 'Professional GPU memory calculator for AI models. Calculate VRAM requirements for LLM, multimodal, and TTS models.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <StructuredData />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}