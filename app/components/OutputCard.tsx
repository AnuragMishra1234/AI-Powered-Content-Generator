'use client';

import { useState } from 'react';

interface OutputCardProps {
  output: string;
  toolType: string;
  isLoading?: boolean;
}

export default function OutputCard({ output, toolType, isLoading }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([output], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `output-${Date.now()}.${toolType === 'website' ? 'html' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-center h-40">
          <div className="spin-slow text-4xl">⏳</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Generated Output</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition text-sm"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition text-sm"
          >
            Download
          </button>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded max-h-96 overflow-y-auto">
        {toolType === 'website' ? (
          <iframe
            srcDoc={output}
            className="w-full h-96 border border-gray-300 dark:border-slate-600 rounded"
            title="Generated Website"
          />
        ) : (
          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
        )}
      </div>
    </div>
  );
}
