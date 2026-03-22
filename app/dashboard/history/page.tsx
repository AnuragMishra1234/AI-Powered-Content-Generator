'use client';

import Header from '@/app/components/Header';
import { useEffect, useState } from 'react';

interface HistoryItem {
  _id: string;
  toolType: string;
  input: string;
  output: string;
  creditsUsed: number;
  createdAt: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setHistory(data.data.history);
      } else {
        setError(data.message || 'Failed to fetch history');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/history?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setHistory(history.filter((item) => item._id !== id));
        setSelectedItem(null);
      } else {
        setError('Failed to delete item');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toolIcons: { [key: string]: string } = {
    text: '✨',
    poster: '🎨',
    resume: '📄',
    website: '💻',
  };

  const toolNames: { [key: string]: string } = {
    text: 'Text Generator',
    poster: 'Poster Generator',
    resume: 'Resume Builder',
    website: 'Website Generator',
  };

  if (loading) {
    return (
      <div className="w-full">
        <Header title="📜 History" />
        <div className="p-8 flex items-center justify-center min-h-screen">
          <div className="spin-slow text-4xl">⏳</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header title="📜 Generation History" />

      <div className="p-4 md:p-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-12 border border-gray-200 dark:border-slate-700 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">No generation history yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Your generations will appear here</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* History List */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-slate-700 font-semibold">
                Recent Generations
              </div>
              {history.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 border-b border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition ${
                    selectedItem?._id === item._id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{toolIcons[item.toolType]}</span>
                    <span className="font-medium">{toolNames[item.toolType]}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.input}
                  </p>
                </div>
              ))}
            </div>

            {/* Detail View */}
            <div className="lg:col-span-2">
              {selectedItem ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {toolIcons[selectedItem.toolType]} {toolNames[selectedItem.toolType]}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(selectedItem.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedItem._id)}
                      className="px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Input</h3>
                      <div className="bg-gray-100 dark:bg-slate-900 p-3 rounded text-sm">
                        {selectedItem.input}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Output</h3>
                      <div className="bg-gray-100 dark:bg-slate-900 p-3 rounded text-sm max-h-48 overflow-y-auto">
                        {selectedItem.toolType === 'website' ? (
                          <iframe
                            srcDoc={selectedItem.output}
                            className="w-full h-64 border border-gray-300 dark:border-slate-600 rounded"
                            title="Website Output"
                          />
                        ) : (
                          <pre className="whitespace-pre-wrap">{selectedItem.output}</pre>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedItem.output);
                          alert('Copied to clipboard!');
                        }}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
                      >
                        Copy Output
                      </button>
                      <button
                        onClick={() => {
                          const element = document.createElement('a');
                          const file = new Blob([selectedItem.output], { type: 'text/plain' });
                          element.href = URL.createObjectURL(file);
                          element.download = `output-${Date.now()}.${selectedItem.toolType === 'website' ? 'html' : 'txt'}`;
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);
                        }}
                        className="flex-1 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-12 border border-gray-200 dark:border-slate-700 flex items-center justify-center h-96">
                  <p className="text-gray-500 dark:text-gray-400">Select an item to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
