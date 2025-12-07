import React, { useState, useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import { AVAILABLE_MODELS, TrainingConfig } from '../types';
import { Settings, Info } from 'lucide-react';
import { explainConcept } from '../services/geminiService';

const Step2_Training: React.FC = () => {
  const [config, setConfig] = useState<TrainingConfig>({
    model: AVAILABLE_MODELS[0].id,
    loraLayers: 4,
    batchSize: 4,
    iterations: 600,
    learningRate: 1e-5
  });
  
  const [explanation, setExplanation] = useState<string>("");

  const updateConfig = (key: keyof TrainingConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };
  
  const getExplanation = async (term: string) => {
      setExplanation("Thinking...");
      const text = await explainConcept(term);
      setExplanation(text);
  };

  const generateCommand = () => {
    return `python -m mlx_lm.lora \\
  --model ${config.model} \\
  --train \\
  --data ./data \\
  --iters ${config.iterations} \\
  --batch-size ${config.batchSize} \\
  --lora-layers ${config.loraLayers} \\
  --learning-rate ${config.learningRate} \\
  --adapter-path adapters`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div>
        <h2 className="text-2xl font-bold text-white mb-4">Configure & Train</h2>
        <p className="text-vercel-gray mb-6">
            We use LoRA (Low-Rank Adaptation) to fine-tune models efficiently. 
            This allows us to train large models on consumer hardware by only updating a small fraction of parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-vercel-gray block">Base Model</label>
                <select 
                    value={config.model}
                    onChange={(e) => updateConfig('model', e.target.value)}
                    className="w-full bg-black border border-vercel-border text-white rounded px-3 py-2 text-sm focus:border-white focus:outline-none appearance-none"
                >
                    {AVAILABLE_MODELS.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
                <p className="text-xs text-vercel-gray">
                    {AVAILABLE_MODELS.find(m => m.id === config.model)?.desc}
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                     <label className="text-sm font-medium text-vercel-gray block">LoRA Layers</label>
                     <button onClick={() => getExplanation('LoRA Layers')} className="text-vercel-gray hover:text-white"><Info size={14} /></button>
                </div>
                <input 
                    type="range" min="4" max="32" step="4"
                    value={config.loraLayers}
                    onChange={(e) => updateConfig('loraLayers', parseInt(e.target.value))}
                    className="w-full accent-white"
                />
                <div className="flex justify-between text-xs text-vercel-gray">
                    <span>Speed</span>
                    <span className="font-mono text-white">{config.loraLayers} layers</span>
                    <span>Quality</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-vercel-gray block">Iterations</label>
                    <button onClick={() => getExplanation('Training Iterations')} className="text-vercel-gray hover:text-white"><Info size={14} /></button>
                </div>
                <input 
                    type="number"
                    value={config.iterations}
                    onChange={(e) => updateConfig('iterations', parseInt(e.target.value))}
                    className="w-full bg-black border border-vercel-border text-white rounded px-3 py-2 text-sm font-mono focus:border-white focus:outline-none"
                />
            </div>
            
            {explanation && (
                <div className="p-3 bg-vercel-dark border border-vercel-border rounded text-xs text-vercel-gray animate-in fade-in">
                    <span className="font-semibold text-white block mb-1">AI Explanation:</span>
                    {explanation}
                </div>
            )}

        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2 flex flex-col">
             <div className="flex items-center gap-2 mb-4 text-white">
                <Settings size={20} className="text-vercel-success" />
                <h3 className="font-medium">Generated Training Command</h3>
             </div>
             
             <div className="flex-1">
                <p className="text-sm text-vercel-gray mb-4">
                    Run this command in the root of your project folder (where the <code>data/</code> folder is located). 
                    MLX will automatically download the model weights from Hugging Face if you don't have them.
                </p>
                <CodeSnippet code={generateCommand()} label="Terminal" />
                
                <div className="mt-4 p-4 border border-yellow-900/30 bg-yellow-900/10 rounded-lg">
                    <p className="text-sm text-yellow-200/80">
                        <strong>Note:</strong> Training time depends on your Mac's chip. 
                        A 600 iteration run on an M1 Max takes about 5-10 minutes for small models.
                    </p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Step2_Training;