'use client';

import Link from 'next/link';

import { celebrate } from '@/lib/celebrate';
import { GiftIcon } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Spinner } from '@/components/ui';
import { formatDate } from '@/lib/format';
import { decodeReveal } from '@/lib/share';
import { cn } from '@/lib/utils';

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

/** `null` on the server, the current hash on the client. */
const useHash = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => null
  );

export const GiftReveal = () => {
  const hash = useHash();
  const [isOpen, setIsOpen] = useState(false);

  if (hash === null) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    );
  }

  const payload = decodeReveal(hash);

  if (!payload) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ten link nie działa</CardTitle>
          <CardDescription>
            Link jest niepełny albo uszkodzony. Poproś osobę, która robiła losowanie, o wysłanie go jeszcze raz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Przejdź na stronę główną</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const open = () => {
    setIsOpen(true);
    void celebrate();
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <p className="text-muted-foreground font-semibold">{payload.e ?? 'Losowanie prezentów'}</p>
        <h1 className="font-display mt-1 text-4xl font-extrabold tracking-tight text-balance">Cześć, {payload.g}!</h1>
      </div>

      <div className="w-full max-w-sm [perspective:1200px]">
        <div
          className={cn(
            'relative grid transition-transform duration-700 ease-[cubic-bezier(.3,1.4,.5,1)] [transform-style:preserve-3d]',
            isOpen && '[transform:rotateY(180deg)]'
          )}
        >
          <button
            type="button"
            onClick={open}
            disabled={isOpen}
            aria-hidden={isOpen}
            className="gift-tag bg-primary text-primary-foreground focus-visible:ring-ring col-start-1 row-start-1 flex min-h-56 flex-col items-center justify-center gap-3 p-6 outline-none [backface-visibility:hidden] focus-visible:ring-[3px]"
          >
            <GiftIcon className="size-14" strokeWidth={1.75} />
            <span className="font-display text-2xl font-bold">Dotknij, żeby odkryć</span>
            <span className="text-sm opacity-90">Upewnij się, że nikt nie zagląda ci przez ramię</span>
          </button>

          <div
            aria-live="polite"
            className="gift-tag bg-card col-start-1 row-start-1 flex min-h-56 [transform:rotateY(180deg)] flex-col items-center justify-center gap-2 p-6 [backface-visibility:hidden]"
          >
            {isOpen && (
              <>
                <span className="text-muted-foreground font-semibold">Robisz prezent dla</span>
                <span className="font-display text-primary text-5xl font-extrabold tracking-tight break-words">
                  {payload.r}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpen && (payload.b || payload.d) && (
        <dl className="bg-card border-ink shadow-sticker grid w-full max-w-sm grid-cols-2 gap-px overflow-hidden rounded-xl border-2">
          {payload.b && (
            <div className={cn('p-3', !payload.d && 'col-span-2')}>
              <dt className="text-muted-foreground text-sm">Budżet</dt>
              <dd className="font-bold">{payload.b}</dd>
            </div>
          )}
          {payload.d && (
            <div className={cn('p-3', !payload.b && 'col-span-2')}>
              <dt className="text-muted-foreground text-sm">Wręczenie</dt>
              <dd className="font-bold">{formatDate(payload.d)}</dd>
            </div>
          )}
        </dl>
      )}

      {isOpen && (
        <p className="text-muted-foreground max-w-sm text-sm">
          Zachowaj to w tajemnicy. Chcesz zorganizować własne losowanie?{' '}
          <Link
            href="/"
            className="text-foreground decoration-primary font-semibold underline decoration-2 underline-offset-4"
          >
            Zrób to tutaj
          </Link>
          .
        </p>
      )}
    </div>
  );
};
