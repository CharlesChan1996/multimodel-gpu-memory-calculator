'use client';

import { ModelConfig } from '../types';
import { PREDEFINED_MODELS } from '../utils/calculator';
import { useI18n } from '../i18n/context';
import { Plus, Trash2 } from 'lucide-react';

interface MultiModelSelectorProps {
  models: ModelConfig[];
  onChange: (models: ModelConfig[]) => void;
}

export default function MultiModelSelector({ models, onChange }: MultiModelSelectorProps) {
  const { t } = useI18n();

  const addModel = () => {
    const newModel: ModelConfig = {
      name: 'Custom Model',
      parameterSize: 7,
      hiddenDim: 4096,
      layers: 32,
      type: 'language',
    };
    onChange([...models, newModel]);
  };

  const removeModel = (index: number) => {
    if (models.length > 1) {
      onChange(models.filter((_, i) => i !== index));
    }
  };

  const updateModel = (index: number, updates: Partial<ModelConfig>) => {
    const updatedModels = models.map((model, i) => 
      i === index ? { ...model, ...updates } : model
    );
    onChange(updatedModels);
  };

  const handlePresetChange = (index: number, preset: string) => {
    if (preset === 'custom') return;
    const presetModel = PREDEFINED_MODELS[preset as keyof typeof PREDEFINED_MODELS];
    if (presetModel) {
      updateModel(index, presetModel);
    }
  };

  const getModelsByType = (type: string) => {
    return Object.entries(PREDEFINED_MODELS).filter(([_, model]) => model.type === type);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'language': return t('languageModel');
      case 'multimodal': return t('multimodalModel');
      case 'tts': return t('ttsModel');
      default: return t('customModelType');
    }
  };

  return (
    <div className="space-y-6">
      {models.map((model, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">
              {t('modelName')} #{index + 1}
            </h4>
            <div className="flex items-center space-x-2">
              {models.length > 1 && (
                <button
                  onClick={() => removeModel(index)}
                  className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                  title={t('removeModel')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* 模型类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('modelType')}
              </label>
              <select
                value={model.type}
                onChange={(e) => updateModel(index, { type: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="language">{t('languageModel')}</option>
                <option value="multimodal">{t('multimodalModel')}</option>
                <option value="tts">{t('ttsModel')}</option>
                <option value="custom">{t('customModelType')}</option>
              </select>
            </div>

            {/* 预设模型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('selectPresetModel')}
              </label>
              <select
                onChange={(e) => handlePresetChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('selectPresetPlaceholder')}</option>
                {['language', 'multimodal', 'tts'].map(type => {
                  const modelsOfType = getModelsByType(type);
                  if (modelsOfType.length === 0) return null;
                  
                  return (
                    <optgroup key={type} label={getTypeLabel(type)}>
                      {modelsOfType.map(([key, presetModel]) => (
                        <option key={key} value={key}>
                          {presetModel.name}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
                <option value="custom">{t('customModel')}</option>
              </select>
            </div>

            {/* 模型参数配置 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('modelName')}
                </label>
                <input
                  type="text"
                  value={model.name}
                  onChange={(e) => updateModel(index, { name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('modelNamePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('parameterSize')}
                </label>
                <input
                  type="number"
                  value={model.parameterSize}
                  onChange={(e) => updateModel(index, { parameterSize: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('hiddenDimension')}
                </label>
                <input
                  type="number"
                  value={model.hiddenDim}
                  onChange={(e) => updateModel(index, { hiddenDim: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="4096"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('layers')}
                </label>
                <input
                  type="number"
                  value={model.layers}
                  onChange={(e) => updateModel(index, { layers: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="32"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 添加模型按钮 */}
      <button
        onClick={addModel}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>{t('addModel')}</span>
      </button>
    </div>
  );
}