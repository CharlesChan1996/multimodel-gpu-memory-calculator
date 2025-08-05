'use client';

import { MemoryCalculation, ServerRecommendation } from '../types';
import { CheckCircle, XCircle, Server, Zap, DollarSign } from 'lucide-react';
import { useI18n } from '../i18n/context';

interface ResultDisplayProps {
  calculation: MemoryCalculation;
  recommendations: ServerRecommendation[];
}

export default function ResultDisplay({ calculation, recommendations }: ResultDisplayProps) {
  const { t } = useI18n();
  
  const formatMemory = (gb: number) => {
    if (gb < 1) {
      return `${(gb * 1024).toFixed(0)} MB`;
    }
    return `${gb.toFixed(2)} GB`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'language': return t('languageModel');
      case 'multimodal': return t('multimodalModel');
      case 'tts': return t('ttsModel');
      default: return t('customModelType');
    }
  };

  const memoryBreakdown = [
    { label: t('modelWeights'), value: calculation.modelWeights, color: 'bg-blue-500' },
    { label: t('kvCache'), value: calculation.kvCache, color: 'bg-green-500' },
    { label: t('intermediateActivations'), value: calculation.activations, color: 'bg-yellow-500' },
    { label: t('embeddingModel'), value: calculation.embeddingMemory, color: 'bg-purple-500' },
    { label: t('rerankModel'), value: calculation.rerankMemory, color: 'bg-pink-500' },
    { label: t('ocrModel'), value: calculation.ocrMemory, color: 'bg-indigo-500' },
    { label: t('systemOverhead'), value: calculation.systemOverhead, color: 'bg-gray-500' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      {/* 显存需求总览 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('memoryAnalysis')}</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatMemory(calculation.totalMemory)}
            </span>
            <span className="text-sm text-gray-500">{t('totalMemoryRequirement')}</span>
          </div>
          
          {/* 显存占用可视化 */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            {memoryBreakdown.map((item, index) => {
              const percentage = (item.value / calculation.totalMemory) * 100;
              return (
                <div
                  key={index}
                  className={`h-4 ${item.color} ${index === 0 ? 'rounded-l-full' : ''} ${
                    index === memoryBreakdown.length - 1 ? 'rounded-r-full' : ''
                  }`}
                  style={{ 
                    width: `${percentage}%`,
                    marginLeft: index === 0 ? '0' : '0',
                    display: 'inline-block'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* 详细分解 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memoryBreakdown.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.color}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{formatMemory(item.value)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 模型详细分解 */}
        {calculation.modelBreakdown && calculation.modelBreakdown.length > 1 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-700 mb-3">📋 模型显存分解</h4>
            <div className="space-y-2">
              {calculation.modelBreakdown.map((model, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${
                      model.type === 'language' ? 'bg-blue-400' :
                      model.type === 'multimodal' ? 'bg-purple-400' :
                      model.type === 'tts' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <span className="font-medium text-blue-800">{model.name}</span>
                    <span className="text-blue-600">({getTypeLabel(model.type)})</span>
                  </div>
                  <span className="font-semibold text-blue-700">{formatMemory(model.memory)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 计算公式展示 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('formulaDetails')}</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <div><strong>1. {t('modelWeightsFormula')}</strong> {calculation.modelWeights.toFixed(2)} GB = Σ({t('parameterSize')} × {t('modelPrecision')})</div>
              <div><strong>2. {t('kvCacheFormula')}</strong> {calculation.kvCache.toFixed(2)} GB = batch_size × seq_len × hidden_dim × layers × 2 × precision ÷ 1024³</div>
              <div><strong>3. {t('activationsFormula')}</strong> {calculation.activations.toFixed(2)} GB = {t('modelWeights')} × 15% {t('inferenceTemp')}</div>
              {calculation.embeddingMemory > 0 && (
                <div><strong>4. {t('embeddingFormula')}</strong> {calculation.embeddingMemory.toFixed(2)} GB {t('userConfigured')}</div>
              )}
              {calculation.rerankMemory > 0 && (
                <div><strong>5. {t('rerankFormula')}</strong> {calculation.rerankMemory.toFixed(2)} GB = {t('parameterSize')} × {t('modelPrecision')}</div>
              )}
              {calculation.ocrMemory > 0 && (
                <div><strong>6. {t('ocrFormula')}</strong> {calculation.ocrMemory.toFixed(2)} GB {t('userConfigured')}</div>
              )}
              <div className="pt-2 border-t border-gray-200">
                <div><strong>{t('baseMemory')}</strong> {(calculation.totalMemory - calculation.systemOverhead).toFixed(2)} GB</div>
                <div><strong>{t('systemOverheadFinal')}</strong> {calculation.systemOverhead.toFixed(2)} GB = {t('baseMemory')} × {t('systemOverheadRatio')}</div>
                <div className="font-semibold text-blue-600"><strong>{t('totalMemoryFinal')}</strong> {calculation.totalMemory.toFixed(2)} GB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 服务器推荐 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('serverRecommendations')}</h3>
        
        <div className="space-y-4">
          {recommendations.map((server, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                server.suitable
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {server.suitable ? (
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{server.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Server className="h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{server.memory} GB {t('memory')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{server.performance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{server.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div className={`text-sm font-medium whitespace-nowrap ${
                    server.suitable ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {server.suitable ? t('recommended') : t('insufficient')}
                  </div>
                  {server.suitable && (
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {t('remaining')} {formatMemory(server.memory - calculation.totalMemory)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 系统开销详细说明 */}
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">{t('systemOverheadDetails')}</h3>
        <div className="text-sm text-amber-800 space-y-2">
          <div><strong>{t('systemOverheadIncludes2')} ({calculation.systemOverhead.toFixed(2)} GB) {t('includes')}</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• <strong>{t('cudaRuntime')}</strong> {t('cudaDescription')}</li>
            <li>• <strong>{t('inferenceFramework')}</strong> {t('frameworkDescription')}</li>
            <li>• <strong>{t('memoryFragmentation')}</strong> {t('fragmentationDescription')}</li>
            <li>• <strong>{t('buffers')}</strong> {t('buffersDescription')}</li>
            <li>• <strong>{t('monitoringTools')}</strong> {t('monitoringDescription')}</li>
          </ul>
          <div className="mt-3 p-3 bg-amber-100 rounded border border-amber-300">
            <div className="text-xs">
              <strong>{t('calculationLogicLabel')}</strong> {t('systemOverhead')} = {t('baseMemoryLabel')} × {((calculation.systemOverhead / (calculation.totalMemory - calculation.systemOverhead)) * 100).toFixed(1)}%
            </div>
            <div className="text-xs mt-1">
              {t('baseMemoryLabel')} = {(calculation.totalMemory - calculation.systemOverhead).toFixed(2)} GB，
              {t('overheadRatio')} = {calculation.systemOverhead.toFixed(2)} GB
            </div>
          </div>
        </div>
      </div>

      {/* 性能建议 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('optimizationSuggestions')}</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          {calculation.totalMemory > 40 && (
            <li>{t('quantizationSuggestion')}</li>
          )}
          {calculation.kvCache > calculation.modelWeights * 0.5 && (
            <li>{t('kvCacheSuggestion')}</li>
          )}
          {calculation.systemOverhead / calculation.totalMemory > 0.3 && (
            <li>{t('systemOverheadSuggestion')}</li>
          )}
          <li>{t('reserveMemory')}</li>
          <li>{t('parallelization')}</li>
          <li>{t('productionFramework')}</li>
        </ul>
      </div>
    </div>
  );
}