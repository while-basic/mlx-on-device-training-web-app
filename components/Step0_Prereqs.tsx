import React from 'react';
import CodeSnippet from './CodeSnippet';
import { Monitor, Cpu, Package } from 'lucide-react';

const Step0_Prereqs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
        <p className="text-vercel-gray mb-6">
            Before we start training, ensure your Apple Silicon Mac is ready. 
            MLX is a framework designed specifically for Apple's unified memory architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border border-vercel-border rounded-lg bg-vercel-dark">
            <div className="flex items-center gap-3 mb-2 text-white">
                <Cpu size={20} />
                <span className="font-medium">Apple Silicon</span>
            </div>
            <p className="text-sm text-vercel-gray">M1, M2, or M3 chip required. 16GB RAM recommended for 7B models.</p>
        </div>
        <div className="p-4 border border-vercel-border rounded-lg bg-vercel-dark">
            <div className="flex items-center gap-3 mb-2 text-white">
                <Monitor size={20} />
                <span className="font-medium">Python 3.10+</span>
            </div>
            <p className="text-sm text-vercel-gray">Ensure you have a recent version of Python installed.</p>
        </div>
        <div className="p-4 border border-vercel-border rounded-lg bg-vercel-dark">
            <div className="flex items-center gap-3 mb-2 text-white">
                <Package size={20} />
                <span className="font-medium">MLX Libraries</span>
            </div>
            <p className="text-sm text-vercel-gray">We'll install the specific LM tools next.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-2">1. Install MLX LM Tools</h3>
        <p className="text-sm text-vercel-gray mb-3">
            Open your terminal and run the following command to install the necessary libraries.
        </p>
        <CodeSnippet 
            code="pip install mlx mlx-lm" 
            label="Terminal" 
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-2">2. Prepare your workspace</h3>
        <p className="text-sm text-vercel-gray mb-3">
            Create a folder for your project.
        </p>
        <CodeSnippet 
            code={`mkdir my-llm-project\ncd my-llm-project\nmkdir data`} 
            label="Terminal" 
        />
      </div>
    </div>
  );
};

export default Step0_Prereqs;