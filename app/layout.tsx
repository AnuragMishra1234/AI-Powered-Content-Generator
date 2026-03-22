import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/app/lib/ThemeProvider';
import ThemeToggle from '@/app/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'GenAI Hub - Your AI Content Generator',
  description: 'Generate text, posters, resumes, and websites using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
