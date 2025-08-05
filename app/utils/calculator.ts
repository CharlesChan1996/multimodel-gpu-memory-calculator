import { ScenarioParams, MemoryCalculation, ServerRecommendation } from '../types';

// 预定义模型配置
export const PREDEFINED_MODELS = {
  // 语言模型
  'llama2-7b': { name: 'Llama2-7B', parameterSize: 7, hiddenDim: 4096, layers: 32, type: 'language' as const },
  'llama2-13b': { name: 'Llama2-13B', parameterSize: 13, hiddenDim: 5120, layers: 40, type: 'language' as const },
  'llama2-70b': { name: 'Llama2-70B', parameterSize: 70, hiddenDim: 8192, layers: 80, type: 'language' as const },
  
  // Qwen系列
  'qwen-7b': { name: 'Qwen-7B', parameterSize: 7, hiddenDim: 4096, layers: 32, type: 'language' as const },
  'qwen-14b': { name: 'Qwen-14B', parameterSize: 14, hiddenDim: 5120, layers: 40, type: 'language' as const },
  'qwen-72b': { name: 'Qwen-72B', parameterSize: 72, hiddenDim: 8192, layers: 80, type: 'language' as const },
  'qwen2-7b': { name: 'Qwen2-7B', parameterSize: 7, hiddenDim: 4096, layers: 28, type: 'language' as const },
  'qwen2-72b': { name: 'Qwen2-72B', parameterSize: 72, hiddenDim: 8192, layers: 80, type: 'language' as const },
  
  // DeepSeek系列
  'deepseek-7b': { name: 'DeepSeek-7B', parameterSize: 7, hiddenDim: 4096, layers: 30, type: 'language' as const },
  'deepseek-67b': { name: 'DeepSeek-67B', parameterSize: 67, hiddenDim: 8192, layers: 95, type: 'language' as const },
  'deepseek-coder-7b': { name: 'DeepSeek-Coder-7B', parameterSize: 7, hiddenDim: 4096, layers: 30, type: 'language' as const },
  'deepseek-coder-33b': { name: 'DeepSeek-Coder-33B', parameterSize: 33, hiddenDim: 7168, layers: 62, type: 'language' as const },
  
  // ChatGLM系列
  'chatglm3-6b': { name: 'ChatGLM3-6B', parameterSize: 6, hiddenDim: 4096, layers: 28, type: 'language' as const },
  'chatglm4-9b': { name: 'ChatGLM4-9B', parameterSize: 9, hiddenDim: 4096, layers: 40, type: 'language' as const },
  
  // Baichuan系列
  'baichuan2-7b': { name: 'Baichuan2-7B', parameterSize: 7, hiddenDim: 4096, layers: 32, type: 'language' as const },
  'baichuan2-13b': { name: 'Baichuan2-13B', parameterSize: 13, hiddenDim: 5120, layers: 40, type: 'language' as const },
  
  // Yi系列
  'yi-6b': { name: 'Yi-6B', parameterSize: 6, hiddenDim: 4096, layers: 32, type: 'language' as const },
  'yi-34b': { name: 'Yi-34B', parameterSize: 34, hiddenDim: 7168, layers: 60, type: 'language' as const },
  
  // 多模态模型
  'qwen-vl-7b': { name: 'Qwen-VL-7B', parameterSize: 7, hiddenDim: 4096, layers: 32, type: 'multimodal' as const },
  'qwen-vl-14b': { name: 'Qwen-VL-14B', parameterSize: 14, hiddenDim: 5120, layers: 40, type: 'multimodal' as const },
  'chatglm4v-9b': { name: 'ChatGLM4V-9B', parameterSize: 9, hiddenDim: 4096, layers: 40, type: 'multimodal' as const },
  'yi-vl-6b': { name: 'Yi-VL-6B', parameterSize: 6, hiddenDim: 4096, layers: 32, type: 'multimodal' as const },
  'yi-vl-34b': { name: 'Yi-VL-34B', parameterSize: 34, hiddenDim: 7168, layers: 60, type: 'multimodal' as const },
  
  // TTS模型
  'cosyvoice-300m': { name: 'CosyVoice-300M', parameterSize: 0.3, hiddenDim: 1024, layers: 12, type: 'tts' as const },
  'chattts-40k': { name: 'ChatTTS-40K', parameterSize: 0.04, hiddenDim: 768, layers: 8, type: 'tts' as const },
  'fishtts-1b': { name: 'FishTTS-1B', parameterSize: 1, hiddenDim: 2048, layers: 16, type: 'tts' as const },
};

// 精度对应的字节数
const PRECISION_BYTES = {
  fp16: 2,
  int8: 1,
  int4: 0.5,
};

// 服务器配置
const SERVER_CONFIGS: ServerRecommendation[] = [
  { name: 'NVIDIA RTX 4090', memory: 24, price: '¥12,000', performance: '83 TFLOPS', suitable: false },
  { name: 'NVIDIA A100 40GB', memory: 40, price: '¥80,000', performance: '312 TFLOPS', suitable: false },
  { name: 'NVIDIA A100 80GB', memory: 80, price: '¥120,000', performance: '312 TFLOPS', suitable: false },
  { name: 'NVIDIA H100 80GB', memory: 80, price: '¥200,000', performance: '989 TFLOPS', suitable: false },
  { name: 'NVIDIA A6000', memory: 48, price: '¥45,000', performance: '150 TFLOPS', suitable: false },
  { name: 'NVIDIA V100 32GB', memory: 32, price: '¥35,000', performance: '125 TFLOPS', suitable: false },
];

export function calculateMemory(params: ScenarioParams): MemoryCalculation {
  const precisionBytes = PRECISION_BYTES[params.precision];
  
  // 1. 模型权重显存 (GB) - 支持多模型
  // 公式: Σ(参数量(B) × 精度字节数) for each model
  const modelBreakdown = params.models.map(model => ({
    name: model.name,
    memory: model.parameterSize * precisionBytes,
    type: model.type
  }));
  const modelWeights = modelBreakdown.reduce((sum, model) => sum + model.memory, 0);
  
  // 2. KV Cache显存 (GB) - 基于最大的语言模型计算
  // 公式: batch_size × seq_len × hidden_dim × layers × 2(K+V) × precision_bytes / (1024^3)
  // 说明: 每个token在每层都需要存储Key和Value向量，因此乘以2
  const mainLanguageModel = params.models.find(m => m.type === 'language') || params.models[0];
  const kvCache = (params.batchSize * params.sequenceLength * mainLanguageModel.hiddenDim * 
                   mainLanguageModel.layers * 2 * precisionBytes) / (1024 * 1024 * 1024);
  
  // 3. 中间激活显存 (GB)
  // 说明: 推理过程中前向传播的临时计算结果，通常为模型权重的10-20%
  const activations = modelWeights * 0.15;
  
  // 4. Embedding模型显存 (GB)
  // 说明: 文本向量化模型，用于RAG等场景的文档检索
  const embeddingMemory = params.embeddingModel.enabled ? params.embeddingModel.size : 0;
  
  // 5. Rerank模型显存 (GB)
  // 公式: 参数量(B) × 精度字节数
  // 说明: 用于对检索结果进行重新排序的模型
  const rerankMemory = params.rerankModel.enabled ? 
    (params.rerankModel.parameterSize * precisionBytes) : 0;
  
  // 6. OCR模型显存 (GB)
  // 说明: 用于文档解析和光学字符识别的模型
  const ocrMemory = params.ocrModel.enabled ? params.ocrModel.size : 0;
  
  // 7. 系统开销计算
  // 公式: (模型权重 + KV Cache + 中间激活 + 辅助模型) × 系统开销占比
  // 说明: 包括CUDA运行时、GPU驱动、推理框架(如vLLM、TensorRT)等系统组件的显存占用
  const baseMemory = modelWeights + kvCache + activations + embeddingMemory + rerankMemory + ocrMemory;
  const systemOverhead = baseMemory * (params.systemOverhead / 100);
  
  // 8. 总显存需求
  // 公式: 基础显存需求 + 系统开销
  const totalMemory = baseMemory + systemOverhead;
  
  return {
    modelWeights,
    kvCache,
    activations,
    systemOverhead,
    embeddingMemory,
    rerankMemory,
    ocrMemory,
    totalMemory,
    modelBreakdown,
  };
}

export function getServerRecommendations(totalMemory: number): ServerRecommendation[] {
  return SERVER_CONFIGS.map(server => ({
    ...server,
    suitable: server.memory >= totalMemory * 1.1, // 预留10%余量
  })).sort((a, b) => {
    // 优先推荐合适的服务器，然后按显存大小排序
    if (a.suitable && !b.suitable) return -1;
    if (!a.suitable && b.suitable) return 1;
    return a.memory - b.memory;
  });
}

export function calculateConcurrentCapacity(params: ScenarioParams, serverMemory: number): number {
  const singleUserMemory = calculateMemory({
    ...params,
    batchSize: 1,
  }).totalMemory;
  
  return Math.floor(serverMemory / singleUserMemory);
}