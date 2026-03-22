'use client';

import Header from '@/app/components/Header';
import OutputCard from '@/app/components/OutputCard';
import { useState } from 'react';

export default function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/generate/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt, type: 'text' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Generation failed');
      }

      setOutput(data.data.output);
      setCreditsRemaining(data.data.creditsRemaining);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Header title="✨ Text Generator" />

      <div className="p-4 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Generate Text Content</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded">
                  {error}
                </div>
              )}

              {creditsRemaining !== null && (
                <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded">
                  Credits remaining: <strong>{creditsRemaining}</strong>
                </div>
              )}

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here... e.g., 'Write a catchy Instagram caption for a coffee shop'"
                className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
              />

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Text'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div>
            {output ? (
              <OutputCard output={output} toolType="text" isLoading={loading} />
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-full flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">No output yet</p>
                  <p className="text-sm">Enter a prompt and click generate to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg border border-amber-300 dark:border-amber-700">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">💡 Tips for Better Results</h3>
          <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
            <li>• Be specific with your requirements</li>
            <li>• Include the tone and style you want</li>
            <li>• Mention the target audience</li>
            <li>• More detailed prompts = better results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
