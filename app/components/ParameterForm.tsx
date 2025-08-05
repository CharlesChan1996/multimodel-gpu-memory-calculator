'use client';

import { ScenarioParams } from '../types';
import MultiModelSelector from './MultiModelSelector';
import { useI18n } from '../i18n/context';

interface ParameterFormProps {
  params: ScenarioParams;
  onChange: (params: ScenarioParams) => void;
}

export default function ParameterForm({ params, onChange }: ParameterFormProps) {
  const { t } = useI18n();
  
  const updateParams = (updates: Partial<ScenarioParams>) => {
    onChange({ ...params, ...updates });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 主模型配置 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('mainModelConfig')}</h3>
        <MultiModelSelector
          models={params.models}
          onChange={(models) => updateParams({ models })}
        />
        
        <div className="mt-4 sm:mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('modelPrecision')}
          </label>
          <select
            value={params.precision}
            onChange={(e) => updateParams({ precision: e.target.value as any })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="fp16">{t('fp16')}</option>
            <option value="int8">{t('int8')}</option>
            <option value="int4">{t('int4')}</option>
          </select>
        </div>
      </div>

      {/* 辅助模型配置 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('auxiliaryModelConfig')}</h3>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="embedding"
                checked={params.embeddingModel.enabled}
                onChange={(e) => updateParams({
                  embeddingModel: { ...params.embeddingModel, enabled: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="embedding" className="text-sm font-medium text-gray-700 flex-1">
                {t('enableEmbedding')}
              </label>
            </div>
            {params.embeddingModel.enabled && (
              <div className="flex items-center space-x-2 ml-7 sm:ml-0">
                <input
                  type="number"
                  value={params.embeddingModel.size}
                  onChange={(e) => updateParams({
                    embeddingModel: { ...params.embeddingModel, size: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-20 sm:w-24 p-1 border border-gray-300 rounded text-sm"
                  placeholder="1.5"
                  step="0.1"
                  min="0"
                />
                <span className="text-sm text-gray-500">GB</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rerank"
                checked={params.rerankModel.enabled}
                onChange={(e) => updateParams({
                  rerankModel: { ...params.rerankModel, enabled: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rerank" className="text-sm font-medium text-gray-700 flex-1">
                {t('enableRerank')}
              </label>
            </div>
            {params.rerankModel.enabled && (
              <div className="flex items-center space-x-2 ml-7 sm:ml-0">
                <input
                  type="number"
                  value={params.rerankModel.parameterSize}
                  onChange={(e) => updateParams({
                    rerankModel: { ...params.rerankModel, parameterSize: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-20 sm:w-24 p-1 border border-gray-300 rounded text-sm"
                  placeholder="1"
                  step="0.1"
                  min="0"
                />
                <span className="text-sm text-gray-500">{t('parameters')}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="ocr"
                checked={params.ocrModel.enabled}
                onChange={(e) => updateParams({
                  ocrModel: { ...params.ocrModel, enabled: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="ocr" className="text-sm font-medium text-gray-700 flex-1">
                {t('enableOcr')}
              </label>
            </div>
            {params.ocrModel.enabled && (
              <div className="flex items-center space-x-2 ml-7 sm:ml-0">
                <input
                  type="number"
                  value={params.ocrModel.size}
                  onChange={(e) => updateParams({
                    ocrModel: { ...params.ocrModel, size: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-20 sm:w-24 p-1 border border-gray-300 rounded text-sm"
                  placeholder="1.5"
                  step="0.1"
                  min="0"
                />
                <span className="text-sm text-gray-500">GB</span>
              </div>
            )}
          </div>


        </div>
      </div>

      {/* 业务负载配置 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('businessLoadConfig')}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('batchSize')}
            </label>
            <input
              type="number"
              value={params.batchSize}
              onChange={(e) => updateParams({ batchSize: parseInt(e.target.value) || 1 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('sequenceLength')}
            </label>
            <input
              type="number"
              value={params.sequenceLength}
              onChange={(e) => updateParams({ sequenceLength: parseInt(e.target.value) || 512 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('concurrentUsers')}
            </label>
            <input
              type="number"
              value={params.concurrentUsers}
              onChange={(e) => updateParams({ concurrentUsers: parseInt(e.target.value) || 10 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('qps')}
            </label>
            <input
              type="number"
              value={params.qps}
              onChange={(e) => updateParams({ qps: parseInt(e.target.value) || 10 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* 系统配置 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('systemConfig')}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('kvCacheRatio')}
            </label>
            <input
              type="number"
              value={params.kvCacheRatio}
              onChange={(e) => updateParams({ kvCacheRatio: parseFloat(e.target.value) || 20 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
              step="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('kvCacheDescription')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('systemOverheadRatio')}
            </label>
            <input
              type="number"
              value={params.systemOverhead}
              onChange={(e) => updateParams({ systemOverhead: parseFloat(e.target.value) || 20 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
              step="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('systemOverheadDescription')}
            </p>
          </div>
        </div>

        {/* 计算逻辑说明 */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">{t('calculationLogic')}</h4>
          <div className="text-xs text-blue-800 space-y-1">
            <div><strong>{t('systemOverheadCalculation')}</strong></div>
            <div className="ml-2">{t('systemOverheadFormula')}</div>
            <div className="ml-2">{t('totalMemoryFormula')}</div>
            <div className="mt-2"><strong>{t('explanation')}</strong></div>
            <div className="ml-2">{t('systemOverheadIncludes')}</div>
            <div className="ml-2">{t('recommendedRatio')}</div>
            <div className="ml-2">{t('dynamicCalculation')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}