import Link from 'next/link';

import { GiftIcon } from 'lucide-react';

import { CoffeeButton } from '@/components/coffee';

export const Header = () => (
  <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
    <Link
      href="/"
      className="font-display focus-visible:ring-ring flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight outline-none focus-visible:ring-[3px]"
    >
      <span className="bg-primary text-primary-foreground border-ink shadow-sticker flex size-9 -rotate-6 items-center justify-center rounded-lg border-2">
        <GiftIcon className="size-5" />
      </span>
      Kto dla kogo?
    </Link>
    <CoffeeButton />
  </header>
);
