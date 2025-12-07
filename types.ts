export enum SetupStep {
  PREREQUISITES = 0,
  DATA_PREPARATION = 1,
  TRAINING_CONFIG = 2,
  INFERENCE = 3
}

export interface TrainingConfig {
  model: string;
  loraLayers: number;
  batchSize: number;
  iterations: number;
  learningRate: number;
}

export const AVAILABLE_MODELS = [
  { id: "mlx-community/Mistral-7B-v0.1-4bit", name: "Mistral 7B (4-bit)", desc: "Best balance of speed and quality for M1/M2." },
  { id: "mlx-community/Llama-3-8B-4bit", name: "Llama 3 8B (4-bit)", desc: "Latest Meta model, highly capable." },
  { id: "mlx-community/TinyLlama-1.1B-Chat-v1.0-4bit", name: "TinyLlama 1.1B", desc: "Ultra-fast, runs on base M1 Air easily." },
  { id: "mlx-community/phi-2-4bit", name: "Phi-2", desc: "Microsoft's powerful small model." },
];

export interface JsonlExample {
  text: string;
}