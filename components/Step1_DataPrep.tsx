import React, { useState } from 'react';
import CodeSnippet from './CodeSnippet';
import { generateJsonlData } from '../services/geminiService';
import { Wand2, Loader2, FileJson } from 'lucide-react';

const Step1_DataPrep: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedData, setGeneratedData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await generateJsonlData(topic);
      setGeneratedData(data);
    } catch (e) {
      setError('Failed to generate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Prepare Training Data</h2>
        <p className="text-vercel-gray mb-6">
            LLMs need data in <code>JSONL</code> (JSON Lines) format to learn new patterns.
            Each line represents one training example. We need three files: <code>train.jsonl</code>, <code>test.jsonl</code>, and <code>valid.jsonl</code>.
        </p>
      </div>

      <div className="p-6 border border-vercel-border rounded-lg bg-vercel-dark">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
           <Wand2 className="text-vercel-accent" size={20} />
           AI Data Generator
        </h3>
        <p className="text-sm text-vercel-gray mb-4">
            Don't have a dataset? Enter a topic below, and we'll generate sample JSONL data for you using Gemini.
        </p>
        
        <div className="flex gap-2 mb-4">
            <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Shakespearean insults, Python coding tips, Pirate dialogue..." 
                className="flex-1 bg-black border border-vercel-border rounded px-3 py-2 text-white focus:outline-none focus:border-white transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button 
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
                {loading ? <Loader2 className="animate-spin" size={16}/> : 'Generate'}
            </button>
        </div>

        {error && <p className="text-vercel-error text-sm">{error}</p>}

        {generatedData && (
            <div className="mt-6 animate-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-vercel-gray font-mono uppercase">Preview Output</span>
                    <span className="text-xs text-vercel-warning bg-vercel-warning/10 px-2 py-1 rounded border border-vercel-warning/20">
                        Copy this to data/train.jsonl
                    </span>
                </div>
                <CodeSnippet code={generatedData} label="train.jsonl" />
            </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-2">Manual Structure</h3>
        <p className="text-sm text-vercel-gray mb-3">
            If you are creating your own files manually, ensure every line looks like this:
        </p>
        <CodeSnippet 
            code={`{"text": "Q: What is the capital of France? A: Paris."}\n{"text": "Q: What is 5 + 5? A: 10."}\n{"text": "Q: Who wrote Hamlet? A: Shakespeare."}`}
            label="Example Content"
        />
        <div className="bg-blue-900/20 border border-blue-900/50 p-4 rounded-lg mt-4">
            <p className="text-sm text-blue-200 flex items-start gap-2">
                <FileJson size={16} className="mt-0.5 shrink-0" />
                <span>
                    <strong>Tip:</strong> You should create three files in your <code>data/</code> folder:
                    <br/>- <code>train.jsonl</code> (Most of your data)
                    <br/>- <code>valid.jsonl</code> (A small subset for validation)
                    <br/>- <code>test.jsonl</code> (A small subset for testing)
                    <br/>
                    For this tutorial, you can just copy the same content into all three files.
                </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Step1_DataPrep;