'use client';

import { useCallback } from 'react';

// 声明gtag函数类型
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  // 跟踪页面浏览
  const trackPageView = useCallback((url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-P9BC1MTYL2', {
        page_location: url,
        page_title: title,
      });
    }
  }, []);

  // 跟踪自定义事件
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  // 跟踪计算事件
  const trackCalculation = useCallback((modelName: string, totalMemory: number) => {
    trackEvent('calculate_memory', 'calculator', modelName, Math.round(totalMemory));
  }, [trackEvent]);

  // 跟踪模型选择
  const trackModelSelection = useCallback((modelName: string, modelType: string) => {
    trackEvent('select_model', 'model_selection', `${modelType}_${modelName}`);
  }, [trackEvent]);

  // 跟踪语言切换
  const trackLanguageSwitch = useCallback((language: string) => {
    trackEvent('switch_language', 'ui_interaction', language);
  }, [trackEvent]);

  // 跟踪服务器推荐点击
  const trackServerRecommendation = useCallback((serverName: string) => {
    trackEvent('view_server', 'server_recommendation', serverName);
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackCalculation,
    trackModelSelection,
    trackLanguageSwitch,
    trackServerRecommendation,
  };
};