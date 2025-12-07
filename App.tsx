import React, { useState } from 'react';
import { SetupStep } from './types';
import Step0_Prereqs from './components/Step0_Prereqs';
import Step1_DataPrep from './components/Step1_DataPrep';
import Step2_Training from './components/Step2_Training';
import Step3_Inference from './components/Step3_Inference';
import { ChevronRight, Terminal, Database, Sliders, PlayCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SetupStep>(SetupStep.PREREQUISITES);

  const steps = [
    { id: SetupStep.PREREQUISITES, label: 'Setup', icon: Terminal },
    { id: SetupStep.DATA_PREPARATION, label: 'Data', icon: Database },
    { id: SetupStep.TRAINING_CONFIG, label: 'Train', icon: Sliders },
    { id: SetupStep.INFERENCE, label: 'Run', icon: PlayCircle },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case SetupStep.PREREQUISITES: return <Step0_Prereqs />;
      case SetupStep.DATA_PREPARATION: return <Step1_DataPrep />;
      case SetupStep.TRAINING_CONFIG: return <Step2_Training />;
      case SetupStep.INFERENCE: return <Step3_Inference />;
      default: return <Step0_Prereqs />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-vercel-accent selection:text-white">
      {/* Header */}
      <header className="border-b border-vercel-border sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black relative top-[-1px]"></div>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">MLX Trainer</span>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://github.com/ml-explore/mlx" target="_blank" rel="noreferrer" className="text-sm text-vercel-gray hover:text-white transition-colors">
                MLX Github
             </a>
             <div className="text-xs font-mono text-vercel-gray border border-vercel-border px-2 py-1 rounded">
                v1.0.0
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <nav className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-2">
            <p className="text-xs font-mono text-vercel-gray uppercase tracking-widest mb-4 px-3">Workflow</p>
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium text-left
                    ${isActive 
                        ? 'bg-vercel-light text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'text-vercel-gray hover:text-white hover:bg-vercel-dark'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-black' : isCompleted ? 'text-vercel-success' : 'text-vercel-gray'} />
                  <span>{step.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Container */}
        <div className="flex-1 min-w-0">
          {renderStep()}

          {/* Navigation Footer */}
          <div className="mt-16 flex justify-between border-t border-vercel-border pt-8">
            <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                className="px-6 py-2 rounded border border-vercel-border text-vercel-gray hover:text-white hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Back
            </button>
            
            {currentStep < SetupStep.INFERENCE ? (
                <button
                    onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                    className="px-6 py-2 rounded bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                    Next Step
                </button>
            ) : (
                <button
                    className="px-6 py-2 rounded bg-vercel-success text-black font-medium opacity-100 cursor-default"
                >
                    Completed
                </button>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-vercel-border py-8 mt-12 bg-black">
          <div className="max-w-5xl mx-auto px-6 text-center">
              <p className="text-vercel-gray text-sm">
                  Powered by <span className="text-white">Gemini</span> & <span className="text-white">Apple MLX</span>.
              </p>
          </div>
      </footer>
    </div>
  );
};

export default App;