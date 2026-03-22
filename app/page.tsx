'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[url('beautiful-view-stars-night-sky.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">GenAI Hub</h1>
        <div>
          {token ? (
            <Link href="/dashboard" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
              Dashboard
            </Link>
          ) : (
            <div className="space-x-4">
              <Link href="/auth/login" className="px-6 py-2 text-white hover:text-primary transition">
                Login
              </Link>
              <Link href="/auth/signup" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
          AI-Powered Content Generation
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Generate stunning text content, posters, resumes, and websites in seconds using advanced AI technology.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          {token ? (
            <Link href="/dashboard" className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition text-lg font-semibold">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/signup" className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition text-lg font-semibold">
                Get Started Free
              </Link>
              <Link href="/auth/login" className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-lg font-semibold">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '✨', title: 'Text Generator', desc: 'Create captions, blogs, and ideas' },
            { icon: '🎨', title: 'Poster Generator', desc: 'Generate beautiful posters' },
            { icon: '📄', title: 'Resume Builder', desc: 'Build professional resumes' },
            { icon: '💻', title: 'Website Generator', desc: 'Create HTML websites instantly' },
          ].map((feature, i) => (
            <div key={i} className="glass-effect p-6 rounded-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
