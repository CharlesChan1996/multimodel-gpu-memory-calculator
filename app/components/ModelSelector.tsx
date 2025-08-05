'use client';

import { ModelConfig } from '../types';
import { PREDEFINED_MODELS } from '../utils/calculator';
import { useI18n } from '../i18n/context';

interface ModelSelectorProps {
  value: ModelConfig;
  onChange: (model: ModelConfig) => void;
}

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const { t } = useI18n();
  
  const handlePresetChange = (preset: string) => {
    if (preset === 'custom') return;
    onChange(PREDEFINED_MODELS[preset as keyof typeof PREDEFINED_MODELS]);
  };

  const handleCustomChange = (field: keyof ModelConfig, val: string | number) => {
    onChange({
      ...value,
      [field]: val,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('selectPresetModel')}
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => handlePresetChange(e.target.value)}
        >
          <option value="">{t('selectPresetPlaceholder')}</option>
          {Object.entries(PREDEFINED_MODELS).map(([key, model]) => (
            <option key={key} value={key}>
              {model.name}
            </option>
          ))}
          <option value="custom">{t('customModel')}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('modelName')}
          </label>
          <input
            type="text"
            value={value.name}
            onChange={(e) => handleCustomChange('name', e.target.value)}
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
            value={value.parameterSize}
            onChange={(e) => handleCustomChange('parameterSize', parseFloat(e.target.value) || 0)}
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
            value={value.hiddenDim}
            onChange={(e) => handleCustomChange('hiddenDim', parseInt(e.target.value) || 0)}
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
            value={value.layers}
            onChange={(e) => handleCustomChange('layers', parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="32"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}