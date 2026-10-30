'use client';

import { ClipboardListIcon, EyeIcon, EyeOffIcon, RotateCcwIcon, ShuffleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { drawAssignments } from '@/lib/draw';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

import { celebrate } from '@/lib/celebrate';
import { useDrawStore } from '../state/draw-store';
import { Avatar } from './avatar';
import { ConfirmDialog } from './confirm-dialog';
import { ShareActions } from './share-actions';

export const ResultsStep = () => {
  const { state, dispatch } = useDrawStore();
  const { participants, exclusions, assignments, event } = state;
  const [isHidden, setIsHidden] = useState(false);

  const byId = useMemo(() => new Map(participants.map((p) => [p.id, p])), [participants]);
  const pairs = useMemo(
    () =>
      (assignments ?? []).flatMap(({ giverId, receiverId }) => {
        const giver = byId.get(giverId);
        const receiver = byId.get(receiverId);
        return giver && receiver ? [{ giver, receiver }] : [];
      }),
    [assignments, byId]
  );
  const hasPhones = participants.some((p) => p.phone);

  const redraw = () => {
    const result = drawAssignments(
      participants.map((p) => p.id),
      exclusions
    );
    if (!result.ok) return;
    dispatch({ type: 'setAssignments', assignments: result.assignments });
    toast.success('Wylosowano od nowa.');
    void celebrate();
  };

  const copyAll = async () => {
    const header = event.name ? `${event.name}\n\n` : '';
    const text = header + pairs.map(({ giver, receiver }) => `${giver.name} → ${receiver.name}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Skopiowano listę par.');
    } catch {
      toast.error('Nie udało się skopiować. Spróbuj ponownie.');
    }
  };

  const details = [event.budget && `Budżet: ${event.budget}`, event.date && formatDate(event.date)].filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name || 'Wyniki losowania'}</CardTitle>
        <CardDescription>
          {details.length > 0 && <span className="text-foreground block font-semibold">{details.join(', ')}</span>}
          {hasPhones
            ? 'Wyślij każdemu jego wynik SMS-em lub na WhatsAppie. Link pokaże tylko jego osobę.'
            : 'Skopiuj każdemu jego prywatny link. Otworzy się na nim tylko jego osoba.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => setIsHidden((value) => !value)} aria-pressed={isHidden}>
            {isHidden ? <EyeIcon /> : <EyeOffIcon />}
            {isHidden ? 'Pokaż pary' : 'Ukryj pary'}
          </Button>
        </div>
        <ul className="flex flex-col gap-3" aria-live="polite">
          {pairs.map(({ giver, receiver }) => (
            <li key={giver.id} className="gift-tag bg-card flex items-center gap-3 py-2.5 pr-2">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-muted-foreground truncate text-xs font-semibold">
                  {giver.name} robi prezent dla
                </span>
                <span className="flex min-w-0 items-center gap-2">
                  <Avatar
                    name={receiver.name}
                    seed={receiver.id}
                    className={cn('size-7 text-xs', isHidden && 'invisible')}
                  />
                  <span
                    className={cn(
                      'font-display truncate text-lg font-bold transition-[filter]',
                      isHidden && 'blur-md select-none'
                    )}
                    aria-hidden={isHidden}
                  >
                    {receiver.name}
                  </span>
                </span>
              </div>
              <ShareActions giver={giver.name} receiver={receiver.name} phone={giver.phone} event={event} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <ConfirmDialog
            trigger={
              <Button variant="outline" className="w-full">
                <ShuffleIcon />
                Losuj ponownie
              </Button>
            }
            title="Wylosować jeszcze raz?"
            description="Pary się zmienią. Linki wysłane wcześniej będą pokazywać stary wynik — wyślij wszystkim nowe."
            confirmLabel="Losuj ponownie"
            onConfirm={redraw}
          />
          <Button variant="outline" className="w-full" onClick={copyAll}>
            <ClipboardListIcon />
            Kopiuj listę
          </Button>
        </div>
        <ConfirmDialog
          trigger={
            <Button variant="ghost">
              <RotateCcwIcon />
              Nowe losowanie
            </Button>
          }
          title="Zacząć od nowa?"
          description="Usuniemy okazję, uczestników i wyniki z tej przeglądarki. Wysłane wcześniej linki nadal będą działać."
          confirmLabel="Zacznij od nowa"
          onConfirm={() => dispatch({ type: 'reset' })}
        />
      </CardFooter>
    </Card>
  );
};
