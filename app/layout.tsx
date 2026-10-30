import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';

import { DrawProvider } from '@/features/draw/state/draw-store';

import { Toaster } from '@/components/ui/sonner';
import PageLayout from '@/layouts/page-layout';

import './globals.css';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin', 'latin-ext']
});

const DESCRIPTION = 'Wylosujcie, kto komu robi prezent. Jeden przemyślany prezent zamiast wielu drobiazgów.';

export const metadata: Metadata = {
  title: 'Kto dla kogo? — losowanie prezentów',
  description: DESCRIPTION,
  category: 'website',
  keywords: ['losowanie prezentów', 'kto dla kogo', 'secret santa', 'mikołajki', 'wigilia', 'prezenty', 'makadev'],
  authors: [{ name: 'Patryk Makarewicz', url: 'https://www.linkedin.com/in/patryk-makarewicz/' }],
  openGraph: {
    title: 'Kto dla kogo?',
    description: DESCRIPTION,
    images: ['/cover.png'],
    url: 'https://kto-dla-kogo.vercel.app',
    siteName: 'Kto dla kogo?',
    locale: 'pl_PL'
  },
  metadataBase: new URL('https://kto-dla-kogo.vercel.app')
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f1edff' },
    { media: '(prefers-color-scheme: dark)', color: '#15102e' }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${bricolage.variable} font-sans antialiased`}>
        <DrawProvider>
          <PageLayout>{children}</PageLayout>
        </DrawProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
