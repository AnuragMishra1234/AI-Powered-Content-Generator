'use client';

import Header from '@/app/components/Header';
import OutputCard from '@/app/components/OutputCard';
import { useState } from 'react';

export default function ResumeBuilder() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!name.trim() || !title.trim()) {
      setError('Please enter your name and professional title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/generate/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, experience }),
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
      <Header title="📄 Resume Builder" />

      <div className="p-4 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Build Your Resume</h2>

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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Professional Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Experience Summary</label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Describe your work experience, skills, and achievements..."
                    className="w-full h-28 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Resume'}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div>
            {output ? (
              <OutputCard output={output} toolType="resume" isLoading={loading} />
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-full flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">No resume generated yet</p>
                  <p className="text-sm">Fill in your details and click generate</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-amber-100 dark:bg-amber-900/30 p-6 rounded-lg border border-amber-300 dark:border-amber-700">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">💡 Resume Tips</h3>
          <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
            <li>• Use action verbs to describe achievements</li>
            <li>• Include quantifiable results and metrics</li>
            <li>• Keep it concise and relevant</li>
            <li>• Highlight key skills for your target role</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
