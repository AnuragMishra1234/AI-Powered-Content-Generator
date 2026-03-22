'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { icon: '📊', label: 'Dashboard', href: '/dashboard' },
  { icon: '✨', label: 'Text Generator', href: '/dashboard/text' },
  { icon: '🎨', label: 'Poster Generator', href: '/dashboard/poster' },
  { icon: '📄', label: 'Resume Builder', href: '/dashboard/resume' },
  { icon: '💻', label: 'Website Generator', href: '/dashboard/website' },
  { icon: '📜', label: 'History', href: '/dashboard/history' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-white/10 transition-transform md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold gradient-text mb-8">GenAI Hub</h2>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}
    </>
  );
}
