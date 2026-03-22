'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  title: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  credits: number;
}

export default function Header({ title }: HeaderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

        {!loading && user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{user.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>⭐ {user.credits} Credits</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
