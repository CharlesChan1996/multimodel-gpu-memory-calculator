'use client';

import { useI18n } from '../i18n/context';
import { locales, localeNames } from '../i18n/locales';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}