'use client';

import { useState } from 'react';
import { ScenarioParams } from './types';
import { calculateMemory, getServerRecommendations } from './utils/calculator';
import ParameterForm from './components/ParameterForm';
import ResultDisplay from './components/ResultDisplay';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useI18n } from './i18n/context';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { Calculator, Cpu } from 'lucide-react';

const defaultParams: ScenarioParams = {
  models: [
    {
      name: 'Qwen2-7B',
      parameterSize: 7,
      hiddenDim: 4096,
      layers: 28,
      type: 'language',
    }
  ],
  precision: 'fp16',
  embeddingModel: {
    enabled: true,
    size: 1.5,
  },
  rerankModel: {
    enabled: false,
    parameterSize: 1,
  },
  ocrModel: {
    enabled: false,
    size: 1.5,
  },
  batchSize: 1,
  sequenceLength: 2048,
  concurrentUsers: 10,
  qps: 10,
  kvCacheRatio: 20,
  systemOverhead: 20,
};

export default function Home() {
  const { t } = useI18n();
  const { trackCalculation } = useGoogleAnalytics();
  const [params, setParams] = useState<ScenarioParams>(defaultParams);
  const [showResults, setShowResults] = useState(false);

  const calculation = calculateMemory(params);
  const recommendations = getServerRecommendations(calculation.totalMemory);

  const handleCalculate = () => {
    setShowResults(true);
    // 跟踪计算事件
    const mainModel = params.models[0];
    if (mainModel) {
      trackCalculation(mainModel.name, calculation.totalMemory);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO优化的隐藏内容 */}
      <div className="sr-only">
        <h1>GPU Memory Calculator for AI Models - Professional VRAM Requirements Tool</h1>
        <p>Calculate GPU memory requirements for popular AI models including Qwen, ChatGLM, DeepSeek, Llama, and more. Get accurate VRAM estimates and server recommendations for optimal AI model deployment.</p>
        <h2>Supported AI Models</h2>
        <ul>
          <li>Qwen Series: Qwen-7B, Qwen-14B, Qwen-72B, Qwen2-7B, Qwen2-72B</li>
          <li>DeepSeek Series: DeepSeek-7B, DeepSeek-67B, DeepSeek-Coder-7B, DeepSeek-Coder-33B</li>
          <li>ChatGLM Series: ChatGLM3-6B, ChatGLM4-9B</li>
          <li>Llama Series: Llama2-7B, Llama2-13B, Llama2-70B</li>
          <li>Baichuan Series: Baichuan2-7B, Baichuan2-13B</li>
          <li>Yi Series: Yi-6B, Yi-34B</li>
        </ul>
        <h2>Key Features</h2>
        <ul>
          <li>Accurate GPU memory calculation for AI inference</li>
          <li>Support for multiple precision formats (FP16, INT8, INT4)</li>
          <li>KV Cache optimization recommendations</li>
          <li>Server hardware recommendations</li>
          <li>Batch processing optimization</li>
          <li>Multi-language support (Chinese and English)</li>
        </ul>
      </div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-16 py-3">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex-shrink-0">
                <Calculator className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{t('title')}</h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <Cpu className="h-4 w-4" />
                <span>{t('smartComputing')}</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
          {/* 移动端显示副标题 */}
          <div className="sm:hidden pb-3">
            <p className="text-xs text-gray-500">{t('subtitle')}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8" role="main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Parameter Form */}
          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('scenarioConfig')}</h2>
              <p className="text-sm sm:text-base text-gray-600">
                {t('scenarioDescription')}
              </p>
            </div>
            
            <ParameterForm params={params} onChange={setParams} />
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('calculateButton')}</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('calculationResults')}</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {t('resultsDescription')}
                </p>
              </div>

              {showResults ? (
                <ResultDisplay
                  calculation={calculation}
                  recommendations={recommendations}
                />
              ) : (
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{t('waitingCalculation')}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {t('waitingDescription')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-500 text-xs sm:text-sm">
            <p>{t('footerCopyright')}</p>
            <p className="mt-2">
              {t('footerDescription')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}