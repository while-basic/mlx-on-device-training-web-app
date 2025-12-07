import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  label?: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, label = "Terminal", language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full my-4 border border-vercel-border rounded-lg bg-vercel-dark overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-vercel-border">
        <div className="flex items-center gap-2 text-xs text-vercel-gray font-mono uppercase tracking-wider">
          <Terminal size={14} />
          <span>{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-vercel-gray hover:text-white transition-colors focus:outline-none"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-vercel-success" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-vercel-light leading-relaxed whitespace-pre-wrap break-all">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;