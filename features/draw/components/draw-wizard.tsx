'use client';

import { Spinner } from '@/components/ui';

import { useDrawStore } from '../state/draw-store';
import { EventStep } from './event-step';
import { ExclusionsStep } from './exclusions-step';
import { ParticipantsStep } from './participants-step';
import { ResultsStep } from './results-step';
import { Stepper } from './stepper';

const STEP_COMPONENTS = {
  event: EventStep,
  participants: ParticipantsStep,
  exclusions: ExclusionsStep,
  results: ResultsStep
};

export const DrawWizard = () => {
  const { state, isHydrated } = useDrawStore();

  if (!isHydrated) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    );
  }

  const step = state.step === 'results' && !state.assignments ? 'exclusions' : state.step;
  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div className="flex flex-col gap-6">
      <Stepper />
      <StepComponent key={step} />
    </div>
  );
};
