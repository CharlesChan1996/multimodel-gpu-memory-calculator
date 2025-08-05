'use client';

import { useState } from 'react';
import { ScenarioParams } from './types';
import { calculateMemory, getServerRecommendations } from './utils/calculator';
import ParameterForm from './components/ParameterForm';
import ResultDisplay from './components/ResultDisplay';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useI18n } from './i18n/context';
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
  const [params, setParams] = useState<ScenarioParams>(defaultParams);
  const [showResults, setShowResults] = useState(false);

  const calculation = calculateMemory(params);
  const recommendations = getServerRecommendations(calculation.totalMemory);

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
                <p className="text-sm text-gray-500">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Cpu className="h-4 w-4" />
                <span>{t('smartComputing')}</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parameter Form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('scenarioConfig')}</h2>
              <p className="text-gray-600">
                {t('scenarioDescription')}
              </p>
            </div>
            
            <ParameterForm params={params} onChange={setParams} />
            
            <div className="mt-8">
              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Calculator className="h-5 w-5" />
                <span>{t('calculateButton')}</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('calculationResults')}</h2>
                <p className="text-gray-600">
                  {t('resultsDescription')}
                </p>
              </div>

              {showResults ? (
                <ResultDisplay
                  calculation={calculation}
                  recommendations={recommendations}
                />
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('waitingCalculation')}</h3>
                  <p className="text-gray-500 text-sm">
                    {t('waitingDescription')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
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