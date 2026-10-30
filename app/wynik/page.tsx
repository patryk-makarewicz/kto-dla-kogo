import type { Metadata } from 'next';

import { GiftReveal } from '@/features/reveal/components/gift-reveal';

export const metadata: Metadata = {
  title: 'Twój wynik losowania — Kto dla kogo?',
  description: 'Sprawdź, komu robisz prezent.',
  robots: { index: false, follow: false }
};

const RevealPage = () => <GiftReveal />;

export default RevealPage;
