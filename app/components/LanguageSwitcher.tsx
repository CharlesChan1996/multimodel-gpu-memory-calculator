'use client';

import { useI18n } from '../i18n/context';
import { locales, localeNames } from '../i18n/locales';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const { trackLanguageSwitch } = useGoogleAnalytics();

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as any);
    trackLanguageSwitch(newLocale);
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="text-xs sm:text-sm border border-gray-300 rounded px-1 sm:px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
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