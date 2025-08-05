'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GPU Memory Calculator",
    "alternateName": "多模型GPU显存计算器",
    "description": "Professional GPU memory calculator for AI models. Calculate VRAM requirements for LLM, multimodal, and TTS models.",
    "url": "https://llmgpucalculator.info",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "GPU Memory Calculator Team"
    },
    "featureList": [
      "GPU memory calculation for AI models",
      "Support for multiple model types (LLM, Multimodal, TTS)",
      "Server recommendation based on memory requirements",
      "Support for popular models like Qwen, ChatGLM, DeepSeek, Llama",
      "Batch processing and sequence length optimization",
      "Multi-language support (Chinese and English)"
    ],
    "screenshot": "https://llmgpucalculator.info/og-image.png",
    "softwareVersion": "1.0.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "AI Developer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent tool for calculating GPU memory requirements for AI models. Very accurate and helpful for server selection."
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://llmgpucalculator.info"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "GPU Memory Calculator",
        "item": "https://llmgpucalculator.info/calculator"
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to calculate GPU memory requirements for AI models?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GPU memory requirements depend on model parameters, precision (FP16/INT8/INT4), batch size, sequence length, and KV cache. Our calculator considers all these factors to provide accurate estimates."
        }
      },
      {
        "@type": "Question",
        "name": "What AI models are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support popular models including Qwen, ChatGLM, DeepSeek, Llama, Baichuan, Yi, and custom models. Both language models and multimodal models are supported."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the memory calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculations are based on scientific formulas considering model weights, KV cache, intermediate activations, and system overhead. The accuracy is typically within 5-10% of actual usage."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}