'use client';

import Sidebar from '@/app/components/Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        {children}
      </main>
    </div>
  );
}
