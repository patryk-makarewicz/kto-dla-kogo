import type { Metadata } from 'next';

import { DrawWizard } from '@/features/draw/components/draw-wizard';

export const metadata: Metadata = {
  title: 'Losowanie — Kto dla kogo?'
};

const DrawPage = () => <DrawWizard />;

export default DrawPage;
