'use client';

import {
  AssignmentSchema,
  EMPTY_EVENT,
  EventInfoSchema,
  ExclusionSchema,
  ParticipantSchema,
  type Assignment,
  type EventInfo,
  type Exclusion,
  type Participant
} from '@/model/event.model';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { z } from 'zod';

import { loadFromStorage, saveToStorage } from '@/lib/storage';

const STORAGE_KEY = 'kto-dla-kogo:v2';

export const STEPS = ['event', 'participants', 'exclusions', 'results'] as const;
export type Step = (typeof STEPS)[number];

const DrawStateSchema = z.object({
  step: z.enum(STEPS),
  event: EventInfoSchema,
  participants: z.array(ParticipantSchema),
  exclusions: z.array(ExclusionSchema),
  assignments: z.array(AssignmentSchema).nullable()
});

export type DrawState = z.infer<typeof DrawStateSchema>;

type StoreState = DrawState & { isHydrated: boolean };

type Action =
  | { type: 'hydrate'; state: DrawState | null }
  | { type: 'goToStep'; step: Step }
  | { type: 'setEvent'; event: EventInfo }
  | { type: 'setParticipants'; participants: Participant[] }
  | { type: 'setExclusions'; exclusions: Exclusion[] }
  | { type: 'setAssignments'; assignments: Assignment[] }
  | { type: 'reset' };

const INITIAL_STATE: DrawState = {
  step: 'event',
  event: EMPTY_EVENT,
  participants: [],
  exclusions: [],
  assignments: null
};

const sameIds = (a: Participant[], b: Participant[]) =>
  a.length === b.length && a.every((participant, i) => participant.id === b[i].id && participant.name === b[i].name);

const reducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'hydrate':
      return { ...(action.state ?? state), isHydrated: true };
    case 'goToStep':
      return { ...state, step: action.step };
    case 'setEvent':
      return { ...state, event: action.event };
    case 'setParticipants': {
      const ids = new Set(action.participants.map((p) => p.id));
      return {
        ...state,
        participants: action.participants,
        // drop exclusions pointing at removed people
        exclusions: state.exclusions.filter(({ a, b }) => ids.has(a) && ids.has(b)),
        // results are stale once the list of people changes
        assignments: sameIds(state.participants, action.participants) ? state.assignments : null
      };
    }
    case 'setExclusions':
      return { ...state, exclusions: action.exclusions, assignments: null };
    case 'setAssignments':
      return { ...state, assignments: action.assignments, step: 'results' };
    case 'reset':
      return { ...INITIAL_STATE, isHydrated: true };
  }
};

interface DrawStore {
  state: DrawState;
  isHydrated: boolean;
  dispatch: React.Dispatch<Action>;
}

const DrawContext = createContext<DrawStore | null>(null);

export const DrawProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, dispatch] = useReducer(reducer, { ...INITIAL_STATE, isHydrated: false });

  // localStorage is read after mount so server and first client render match.
  useEffect(() => {
    const parsed = DrawStateSchema.safeParse(loadFromStorage(STORAGE_KEY));
    dispatch({ type: 'hydrate', state: parsed.success ? parsed.data : null });
  }, []);

  const value = useMemo(() => {
    const { isHydrated, ...state } = store;
    return { state, isHydrated, dispatch };
  }, [store]);

  useEffect(() => {
    if (value.isHydrated) saveToStorage(STORAGE_KEY, value.state);
  }, [value]);

  return <DrawContext.Provider value={value}>{children}</DrawContext.Provider>;
};

export const useDrawStore = () => {
  const context = useContext(DrawContext);
  if (!context) throw new Error('useDrawStore must be used within DrawProvider');
  return context;
};
