import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GPU Memory Calculator - AI Model VRAM Requirements',
    short_name: 'GPU Calculator',
    description: 'Professional GPU memory calculator for AI models. Calculate VRAM requirements for LLM, multimodal, and TTS models.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['utilities', 'productivity', 'developer'],
    lang: 'zh-CN',
    orientation: 'portrait-primary',
    scope: '/',
  }
}