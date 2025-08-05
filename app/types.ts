export interface ModelConfig {
    name: string;
    parameterSize: number; // in billions
    hiddenDim: number;
    layers: number;
    type: 'language' | 'multimodal' | 'tts' | 'custom';
}

export interface ScenarioParams {
    // 主模型配置
    models: ModelConfig[];
    precision: 'fp16' | 'int8' | 'int4';

    // 辅助模型
    embeddingModel: {
        enabled: boolean;
        size: number; // in GB
    };
    rerankModel: {
        enabled: boolean;
        parameterSize: number; // in billions
    };
    ocrModel: {
        enabled: boolean;
        size: number; // in GB
    };

    // 业务负载
    batchSize: number;
    sequenceLength: number;
    concurrentUsers: number;
    qps: number;

    // 系统配置
    kvCacheRatio: number; // KV Cache占比
    systemOverhead: number; // 系统开销占比
}

export interface MemoryCalculation {
    modelWeights: number;
    kvCache: number;
    activations: number;
    systemOverhead: number;
    embeddingMemory: number;
    rerankMemory: number;
    ocrMemory: number;
    totalMemory: number;
    modelBreakdown: { name: string; memory: number; type: string }[];
}

export interface ServerRecommendation {
    name: string;
    memory: number;
    price: string;
    performance: string;
    suitable: boolean;
}