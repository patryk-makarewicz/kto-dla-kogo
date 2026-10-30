'use client';

import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { STEPS, type Step, useDrawStore } from '../state/draw-store';

const LABELS: Record<Step, string> = {
  event: 'Okazja',
  participants: 'Osoby',
  exclusions: 'Wykluczenia',
  results: 'Wyniki'
};

export const Stepper = () => {
  const { state, dispatch } = useDrawStore();
  const currentIndex = STEPS.indexOf(state.step);

  const isReachable = (step: Step, index: number) => {
    if (index <= currentIndex) return true;
    if (step === 'results') return state.assignments !== null;
    return state.participants.length > 0 && index <= STEPS.indexOf('exclusions');
  };

  return (
    <nav aria-label="Kroki losowania">
      <ol className="flex items-center gap-1.5">
        {STEPS.map((step, index) => {
          const isCurrent = step === state.step;
          const isDone = index < currentIndex;
          const reachable = isReachable(step, index);
          return (
            <li key={step} className="flex flex-1 items-center gap-1.5">
              <button
                type="button"
                disabled={!reachable || isCurrent}
                onClick={() => dispatch({ type: 'goToStep', step })}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'group focus-visible:ring-ring flex w-full flex-col items-center gap-1.5 rounded-lg py-1 outline-none focus-visible:ring-[3px] disabled:cursor-default',
                  !reachable && 'opacity-45'
                )}
              >
                <span
                  className={cn(
                    'border-ink flex size-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors',
                    isCurrent && 'bg-primary text-primary-foreground shadow-sticker',
                    isDone && 'bg-ribbon text-ribbon-foreground',
                    !isCurrent && !isDone && 'bg-card'
                  )}
                >
                  {isDone ? <CheckIcon className="size-4" strokeWidth={3} /> : index + 1}
                </span>
                <span className={cn('text-xs font-semibold', !isCurrent && 'text-muted-foreground')}>
                  {LABELS[step]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
