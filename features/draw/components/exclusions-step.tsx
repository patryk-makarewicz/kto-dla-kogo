'use client';

import type { Exclusion } from '@/model/event.model';
import { HeartHandshakeIcon, PlusIcon, ShuffleIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label } from '@/components/ui';
import { drawAssignments } from '@/lib/draw';

import { celebrate } from '@/lib/celebrate';
import { useDrawStore } from '../state/draw-store';
import { Avatar } from './avatar';

const SELECT_CLASS =
  'bg-card border-input focus-visible:ring-ring h-11 w-full rounded-lg border-2 px-3 text-base outline-none focus-visible:ring-[3px]';

const isSamePair = (x: Exclusion, a: string, b: string) => (x.a === a && x.b === b) || (x.a === b && x.b === a);

export const ExclusionsStep = () => {
  const { state, dispatch } = useDrawStore();
  const { participants, exclusions } = state;
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const nameOf = useMemo(() => new Map(participants.map((p) => [p.id, p.name])), [participants]);
  const ids = useMemo(() => participants.map((p) => p.id), [participants]);
  const isFeasible = useMemo(() => drawAssignments(ids, exclusions).ok, [ids, exclusions]);

  const canAdd = first && second && first !== second && !exclusions.some((x) => isSamePair(x, first, second));

  const addExclusion = () => {
    if (!canAdd) return;
    dispatch({ type: 'setExclusions', exclusions: [...exclusions, { a: first, b: second }] });
    setFirst('');
    setSecond('');
  };

  const removeExclusion = (exclusion: Exclusion) =>
    dispatch({ type: 'setExclusions', exclusions: exclusions.filter((x) => x !== exclusion) });

  const runDraw = () => {
    const result = drawAssignments(ids, exclusions);
    if (!result.ok) {
      toast.error('Nie da się wylosować par przy tych wykluczeniach. Usuń któreś z nich.');
      return;
    }
    dispatch({ type: 'setAssignments', assignments: result.assignments });
    toast.success('Wylosowane! Każdy ma swoją osobę.');
    void celebrate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kto nie powinien trafić na siebie?</CardTitle>
        <CardDescription>
          Np. małżonkowie albo rodzeństwo, które i tak zrobi sobie prezent. Wykluczenie działa w obie strony. Możesz
          pominąć ten krok.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exclusion-a">Osoba</Label>
            <select id="exclusion-a" className={SELECT_CLASS} value={first} onChange={(e) => setFirst(e.target.value)}>
              <option value="">Wybierz…</option>
              {participants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <span className="text-muted-foreground pb-3 text-sm font-semibold">i</span>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exclusion-b">Osoba</Label>
            <select
              id="exclusion-b"
              className={SELECT_CLASS}
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            >
              <option value="">Wybierz…</option>
              {participants
                .filter((p) => p.id !== first)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Button type="button" variant="outline" onClick={addExclusion} disabled={!canAdd}>
          <PlusIcon />
          Dodaj wykluczenie
        </Button>

        {exclusions.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Wykluczenia">
            {exclusions.map((exclusion) => {
              const label = `${nameOf.get(exclusion.a)} i ${nameOf.get(exclusion.b)}`;
              return (
                <li
                  key={`${exclusion.a}-${exclusion.b}`}
                  className="bg-secondary border-ink flex items-center gap-2 rounded-full border-2 py-1 pr-1 pl-1.5"
                >
                  <span className="flex -space-x-2">
                    <Avatar name={nameOf.get(exclusion.a) ?? ''} seed={exclusion.a} className="size-7 text-xs" />
                    <Avatar name={nameOf.get(exclusion.b) ?? ''} seed={exclusion.b} className="size-7 text-xs" />
                  </span>
                  <span className="text-sm font-semibold">{label}</span>
                  <button
                    type="button"
                    onClick={() => removeExclusion(exclusion)}
                    className="hover:bg-card focus-visible:ring-ring rounded-full p-1 outline-none focus-visible:ring-[3px]"
                    aria-label={`Usuń wykluczenie: ${label}`}
                  >
                    <XIcon className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <HeartHandshakeIcon className="size-4" />
            Brak wykluczeń — każdy może trafić na każdego.
          </p>
        )}

        {!isFeasible && (
          <p role="alert" className="border-destructive text-destructive rounded-lg border-2 border-dashed p-3 text-sm">
            Przy tylu wykluczeniach nie da się dobrać par. Usuń któreś wykluczenie albo dodaj więcej osób.
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => dispatch({ type: 'goToStep', step: 'participants' })}>
          Wstecz
        </Button>
        <Button type="button" variant="ribbon" size="lg" onClick={runDraw} disabled={!isFeasible}>
          <ShuffleIcon />
          Losuj pary
        </Button>
      </CardFooter>
    </Card>
  );
};
