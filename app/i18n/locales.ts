export const locales = ['zh', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  zh: '中文',
  en: 'English',
} as const;