import React from 'react';
import CodeSnippet from './CodeSnippet';
import { Play, Zap } from 'lucide-react';

const Step3_Inference: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Test Your Model</h2>
        <p className="text-vercel-gray mb-6">
            Once training is complete, a new folder named <code>adapters</code> will be created. 
            This contains your "fine-tuned" weights. Now let's run it!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-vercel-border rounded-lg bg-vercel-dark p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Play size={20} className="text-vercel-accent" />
                  Run Inference
              </h3>
              <p className="text-sm text-vercel-gray mb-4">
                  Use this command to chat with your model using the newly trained adapter.
                  Replace <code>&lt;YOUR_PROMPT&gt;</code> with a query relevant to your training data.
              </p>
              <CodeSnippet 
                code={`python -m mlx_lm.generate \\\n --model mlx-community/Mistral-7B-v0.1-4bit \\\n --adapter-path adapters \\\n --prompt "User: Hello!" \\\n --max-tokens 100`}
                label="Terminal"
              />
          </div>

          <div className="border border-vercel-border rounded-lg bg-vercel-dark p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-vercel-warning" />
                  Fuse Model
              </h3>
              <p className="text-sm text-vercel-gray mb-4">
                  Want to save the model as a standalone version so you don't need the adapter path later?
                  This combines the base model with your changes.
              </p>
              <CodeSnippet 
                code={`python -m mlx_lm.fuse \\\n --upload-name my-new-model`}
                label="Terminal"
              />
          </div>
      </div>
      
      <div className="text-center pt-10">
          <h3 className="text-xl font-bold text-white mb-2">Congratulations!</h3>
          <p className="text-vercel-gray">
              You have successfully learned the workflow for fine-tuning LLMs on Apple Silicon using MLX.
          </p>
      </div>
    </div>
  );
};

export default Step3_Inference;