import { z } from 'zod';

import { normalizePhone } from '@/lib/phone';

export const MIN_PARTICIPANTS = 3;
export const MAX_PARTICIPANTS = 30;
export const MAX_NAME_LENGTH = 32;

export const EventInfoSchema = z.object({
  name: z.string().trim().max(60, 'Maksymalnie 60 znaków'),
  budget: z.string().trim().max(30, 'Maksymalnie 30 znaków'),
  date: z.string().trim()
});

export const ParticipantSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, 'Wpisz imię').max(MAX_NAME_LENGTH, `Maksymalnie ${MAX_NAME_LENGTH} znaki`),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || normalizePhone(value) !== null, 'Nieprawidłowy numer telefonu')
});

export const ParticipantsFormSchema = z.object({
  participants: z
    .array(ParticipantSchema)
    .min(MIN_PARTICIPANTS, `Dodaj co najmniej ${MIN_PARTICIPANTS} osoby`)
    .max(MAX_PARTICIPANTS, `Możesz dodać maksymalnie ${MAX_PARTICIPANTS} osób`)
    .superRefine((participants, ctx) => {
      const seen = new Map<string, number>();
      participants.forEach((participant, index) => {
        const key = participant.name.trim().toLocaleLowerCase('pl');
        if (!key) return;
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            message: 'To imię już jest na liście',
            path: [index, 'name']
          });
        } else {
          seen.set(key, index);
        }
      });
    })
});

export const ExclusionSchema = z.object({
  a: z.string().min(1),
  b: z.string().min(1)
});

export const AssignmentSchema = z.object({
  giverId: z.string(),
  receiverId: z.string()
});

export type EventInfo = z.infer<typeof EventInfoSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantsFormValues = z.infer<typeof ParticipantsFormSchema>;
export type Exclusion = z.infer<typeof ExclusionSchema>;
export type Assignment = z.infer<typeof AssignmentSchema>;

export const EMPTY_EVENT: EventInfo = { name: '', budget: '', date: '' };
