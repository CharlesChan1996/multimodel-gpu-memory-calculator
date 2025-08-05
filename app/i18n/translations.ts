export const translations = {
  zh: {
    // Header
    title: '多模型GPU显存计算器',
    subtitle: '多模型GPU显存需求计算与服务器推荐',
    smartComputing: '智能算力评估',
    
    // Main page
    scenarioConfig: '场景参数配置',
    scenarioDescription: '请填写您的AI推理场景参数，系统将自动计算显存需求并推荐合适的服务器配置。',
    calculateButton: '计算显存需求',
    calculationResults: '计算结果',
    resultsDescription: '基于您的配置参数计算出的显存需求和服务器推荐。',
    waitingCalculation: '等待计算',
    waitingDescription: '请配置场景参数后点击"计算显存需求"按钮',
    
    // Model Configuration
    mainModelConfig: '推理模型配置',
    addModel: '添加模型',
    removeModel: '移除模型',
    selectPresetModel: '选择预设模型',
    selectPresetPlaceholder: '选择预设模型...',
    customModel: '自定义模型',
    modelName: '模型名称',
    modelNamePlaceholder: '输入模型名称',
    parameterSize: '参数量 (B)',
    hiddenDimension: '隐藏层维度',
    layers: '层数',
    modelType: '模型类型',
    languageModel: '语言模型',
    multimodalModel: '多模态模型',
    ttsModel: 'TTS模型',
    customModelType: '自定义模型',
    modelPrecision: '模型精度',
    fp16: 'FP16 (半精度浮点)',
    int8: 'INT8 (8位整数)',
    int4: 'INT4 (4位整数)',
    
    // Auxiliary Models
    auxiliaryModelConfig: '辅助模型配置',
    enableEmbedding: '启用Embedding模型',
    enableRerank: '启用Rerank模型',
    enableOcr: '启用OCR模型',
    parameters: 'B参数',
    
    // Business Load
    businessLoadConfig: '业务负载配置',
    batchSize: '批处理大小 (Batch Size)',
    sequenceLength: '序列长度 (Sequence Length)',
    concurrentUsers: '并发用户数',
    qps: '每秒查询数 (QPS)',
    
    // System Configuration
    systemConfig: '系统配置',
    kvCacheRatio: 'KV Cache占比 (%)',
    kvCacheDescription: '用于缓存键值对的显存预留比例',
    systemOverheadRatio: '系统开销占比 (%)',
    systemOverheadDescription: 'CUDA运行时、驱动程序等系统组件占用',
    
    // Calculation Logic
    calculationLogic: '💡 计算逻辑说明',
    systemOverheadCalculation: '系统开销计算：',
    systemOverheadFormula: '系统开销 = (模型权重 + KV Cache + 中间激活 + 辅助模型) × 系统开销占比',
    totalMemoryFormula: '总显存 = 基础显存需求 + 系统开销',
    explanation: '说明：',
    systemOverheadIncludes: '• 系统开销包括CUDA运行时、GPU驱动、推理框架等占用的显存',
    recommendedRatio: '• 推荐设置为15-25%，复杂部署环境可适当提高',
    dynamicCalculation: '• 该占比基于实际业务显存需求动态计算，确保预留足够缓冲',
    
    // Results Display
    memoryAnalysis: '显存需求分析',
    totalMemoryRequirement: '总显存需求',
    modelWeights: '模型权重',
    kvCache: 'KV Cache',
    intermediateActivations: '中间激活',
    embeddingModel: 'Embedding模型',
    rerankModel: 'Rerank模型',
    ocrModel: 'OCR模型',
    systemOverhead: '系统开销',
    
    // Formula Details
    formulaDetails: '🧮 计算公式详解',
    modelWeightsFormula: '模型权重：',
    kvCacheFormula: 'KV Cache：',
    activationsFormula: '中间激活：',
    embeddingFormula: 'Embedding模型：',
    rerankFormula: 'Rerank模型：',
    ocrFormula: 'OCR模型：',
    baseMemory: '基础显存：',
    systemOverheadFinal: '系统开销：',
    totalMemoryFinal: '总显存需求：',
    userConfigured: '(用户配置)',
    inferenceTemp: '(推理时临时计算)',
    
    // System Overhead Details
    systemOverheadDetails: '📊 系统开销构成说明',
    systemOverheadIncludes2: '系统开销',
    includes: '包含：',
    cudaRuntime: 'CUDA运行时：',
    cudaDescription: 'GPU计算库和驱动程序占用',
    inferenceFramework: '推理框架：',
    frameworkDescription: 'vLLM、TensorRT、Transformers等框架开销',
    memoryFragmentation: '内存碎片：',
    fragmentationDescription: 'GPU内存分配产生的碎片化空间',
    buffers: '缓冲区：',
    buffersDescription: '输入输出数据的临时存储空间',
    monitoringTools: '监控工具：',
    monitoringDescription: '性能监控和日志记录工具占用',
    calculationLogicLabel: '计算逻辑：',
    baseMemoryLabel: '基础显存',
    overheadRatio: '系统开销占比',
    
    // Server Recommendations
    serverRecommendations: '服务器推荐',
    recommended: '推荐',
    insufficient: '显存不足',
    remaining: '剩余:',
    memory: '显存',
    
    // Optimization Suggestions
    optimizationSuggestions: '💡 优化建议',
    quantizationSuggestion: '• 考虑使用模型量化(INT8/INT4)来减少显存占用',
    kvCacheSuggestion: '• KV Cache占用较高，可考虑减少序列长度或批处理大小',
    systemOverheadSuggestion: '• 系统开销占比较高，建议优化推理框架配置或减少辅助工具',
    reserveMemory: '• 建议预留10-20%的显存余量以应对峰值负载',
    parallelization: '• 可通过模型并行或流水线并行来分布显存压力',
    productionFramework: '• 生产环境建议使用专业推理框架(如vLLM)以提高显存利用率',
    
    // Footer
    footerCopyright: '© 2025 多模型GPU显存计算器. 专业的AI推理算力评估工具.',
    footerDescription: '支持主流大语言模型的显存需求计算，助力AI项目的硬件选型决策。',
  },
  
  en: {
    // Header
    title: 'Multimodel GPU Memory Calculator',
    subtitle: 'Multimodel GPU Memory Requirement Calculation & Server Recommendation',
    smartComputing: 'Smart Computing Assessment',
    
    // Main page
    scenarioConfig: 'Scenario Parameter Configuration',
    scenarioDescription: 'Please fill in your AI inference scenario parameters. The system will automatically calculate memory requirements and recommend suitable server configurations.',
    calculateButton: 'Calculate Memory Requirements',
    calculationResults: 'Calculation Results',
    resultsDescription: 'Memory requirements and server recommendations based on your configuration parameters.',
    waitingCalculation: 'Waiting for Calculation',
    waitingDescription: 'Please configure scenario parameters and click "Calculate Memory Requirements" button',
    
    // Model Configuration
    mainModelConfig: 'Inference Model Configuration',
    addModel: 'Add Model',
    removeModel: 'Remove Model',
    selectPresetModel: 'Select Preset Model',
    selectPresetPlaceholder: 'Select preset model...',
    customModel: 'Custom Model',
    modelName: 'Model Name',
    modelNamePlaceholder: 'Enter model name',
    parameterSize: 'Parameter Size (B)',
    hiddenDimension: 'Hidden Dimension',
    layers: 'Layers',
    modelType: 'Model Type',
    languageModel: 'Language Model',
    multimodalModel: 'Multimodal Model',
    ttsModel: 'TTS Model',
    customModelType: 'Custom Model',
    modelPrecision: 'Model Precision',
    fp16: 'FP16 (Half Precision Float)',
    int8: 'INT8 (8-bit Integer)',
    int4: 'INT4 (4-bit Integer)',
    
    // Auxiliary Models
    auxiliaryModelConfig: 'Auxiliary Model Configuration',
    enableEmbedding: 'Enable Embedding Model',
    enableRerank: 'Enable Rerank Model',
    enableOcr: 'Enable OCR Model',
    parameters: 'B Parameters',
    
    // Business Load
    businessLoadConfig: 'Business Load Configuration',
    batchSize: 'Batch Size',
    sequenceLength: 'Sequence Length',
    concurrentUsers: 'Concurrent Users',
    qps: 'Queries Per Second (QPS)',
    
    // System Configuration
    systemConfig: 'System Configuration',
    kvCacheRatio: 'KV Cache Ratio (%)',
    kvCacheDescription: 'Memory reservation ratio for caching key-value pairs',
    systemOverheadRatio: 'System Overhead Ratio (%)',
    systemOverheadDescription: 'CUDA runtime, drivers and other system components usage',
    
    // Calculation Logic
    calculationLogic: '💡 Calculation Logic Explanation',
    systemOverheadCalculation: 'System Overhead Calculation:',
    systemOverheadFormula: 'System Overhead = (Model Weights + KV Cache + Intermediate Activations + Auxiliary Models) × System Overhead Ratio',
    totalMemoryFormula: 'Total Memory = Base Memory Requirements + System Overhead',
    explanation: 'Explanation:',
    systemOverheadIncludes: '• System overhead includes memory usage by CUDA runtime, GPU drivers, inference frameworks, etc.',
    recommendedRatio: '• Recommended setting is 15-25%, can be increased for complex deployment environments',
    dynamicCalculation: '• This ratio is dynamically calculated based on actual business memory requirements to ensure sufficient buffer',
    
    // Results Display
    memoryAnalysis: 'Memory Requirement Analysis',
    totalMemoryRequirement: 'Total Memory Requirement',
    modelWeights: 'Model Weights',
    kvCache: 'KV Cache',
    intermediateActivations: 'Intermediate Activations',
    embeddingModel: 'Embedding Model',
    rerankModel: 'Rerank Model',
    ocrModel: 'OCR Model',
    systemOverhead: 'System Overhead',
    
    // Formula Details
    formulaDetails: '🧮 Formula Details',
    modelWeightsFormula: 'Model Weights:',
    kvCacheFormula: 'KV Cache:',
    activationsFormula: 'Intermediate Activations:',
    embeddingFormula: 'Embedding Model:',
    rerankFormula: 'Rerank Model:',
    ocrFormula: 'OCR Model:',
    baseMemory: 'Base Memory:',
    systemOverheadFinal: 'System Overhead:',
    totalMemoryFinal: 'Total Memory Requirement:',
    userConfigured: '(User Configured)',
    inferenceTemp: '(Temporary calculation during inference)',
    
    // System Overhead Details
    systemOverheadDetails: '📊 System Overhead Composition',
    systemOverheadIncludes2: 'System Overhead',
    includes: 'includes:',
    cudaRuntime: 'CUDA Runtime:',
    cudaDescription: 'GPU computing libraries and driver usage',
    inferenceFramework: 'Inference Framework:',
    frameworkDescription: 'vLLM, TensorRT, Transformers and other framework overhead',
    memoryFragmentation: 'Memory Fragmentation:',
    fragmentationDescription: 'Fragmented space from GPU memory allocation',
    buffers: 'Buffers:',
    buffersDescription: 'Temporary storage for input/output data',
    monitoringTools: 'Monitoring Tools:',
    monitoringDescription: 'Performance monitoring and logging tool usage',
    calculationLogicLabel: 'Calculation Logic:',
    baseMemoryLabel: 'Base Memory',
    overheadRatio: 'System Overhead Ratio',
    
    // Server Recommendations
    serverRecommendations: 'Server Recommendations',
    recommended: 'Recommended',
    insufficient: 'Insufficient',
    remaining: 'Remaining:',
    memory: 'Memory',
    
    // Optimization Suggestions
    optimizationSuggestions: '💡 Optimization Suggestions',
    quantizationSuggestion: '• Consider using model quantization (INT8/INT4) to reduce memory usage',
    kvCacheSuggestion: '• KV Cache usage is high, consider reducing sequence length or batch size',
    systemOverheadSuggestion: '• System overhead ratio is high, recommend optimizing inference framework configuration or reducing auxiliary tools',
    reserveMemory: '• Recommend reserving 10-20% memory margin for peak loads',
    parallelization: '• Consider model parallelism or pipeline parallelism to distribute memory pressure',
    productionFramework: '• Recommend using professional inference frameworks (like vLLM) in production to improve memory utilization',
    
    // Footer
    footerCopyright: '© 2025 Multimodel GPU Memory Calculator. Professional AI inference computing assessment tool.',
    footerDescription: 'Supports memory requirement calculation for mainstream large language models, assisting AI project hardware selection decisions.',
  }
} as const;