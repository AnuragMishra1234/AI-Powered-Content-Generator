'use client';

import Header from '@/app/components/Header';
import Link from 'next/link';

const tools = [
  {
    icon: '✨',
    title: 'Text Generator',
    description: 'Create captions, blogs, and creative ideas',
    href: '/dashboard/text',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🎨',
    title: 'Poster Generator',
    description: 'Design beautiful marketing posters instantly',
    href: '/dashboard/poster',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📄',
    title: 'Resume Builder',
    description: 'Generate professional resumes in seconds',
    href: '/dashboard/resume',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: '💻',
    title: 'Website Generator',
    description: 'Create HTML websites without coding',
    href: '/dashboard/website',
    color: 'from-orange-500 to-red-500',
  },
];

export default function Dashboard() {
  return (
    <div className="w-full">
      <Header title="Dashboard" />

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-8">Welcome to GenAI Hub</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br p-1 transition hover:shadow-lg"
            >
              <div className={`bg-gradient-to-br ${tool.color} p-6 rounded-lg h-full group-hover:scale-105 transition`}>
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-white/80 text-sm">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Getting Started</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">100 Credits</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">You start with 100 credits. Each generation costs a certain number of credits.</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-200">Track History</h4>
              <p className="text-sm text-purple-800 dark:text-purple-300">All your generations are saved in your history. Download or copy anytime.</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-900 dark:text-green-200">AI Powered</h4>
              <p className="text-sm text-green-800 dark:text-green-300">Powered by advanced AI models for high-quality content generation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
