'use client';

import {
  MAX_PARTICIPANTS,
  MIN_PARTICIPANTS,
  ParticipantsFormSchema,
  type Participant,
  type ParticipantsFormValues
} from '@/model/event.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FieldError,
  Input
} from '@/components/ui';
import { createId } from '@/lib/id';
import { normalizePhone } from '@/lib/phone';

import { useDrawStore } from '../state/draw-store';
import { Avatar } from './avatar';

const emptyParticipant = (): Participant => ({ id: createId(), name: '', phone: '' });

export const ParticipantsStep = () => {
  const { state, dispatch } = useDrawStore();
  const form = useForm<ParticipantsFormValues>({
    resolver: zodResolver(ParticipantsFormSchema),
    defaultValues: {
      participants: state.participants.length
        ? state.participants
        : Array.from({ length: MIN_PARTICIPANTS }, emptyParticipant)
    }
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'participants', keyName: 'key' });
  const values = useWatch({ control: form.control, name: 'participants' });
  const { errors } = form.formState;

  const onSubmit = ({ participants }: ParticipantsFormValues) => {
    dispatch({
      type: 'setParticipants',
      participants: participants.map((p) => ({ ...p, phone: p.phone ? (normalizePhone(p.phone) ?? '') : '' }))
    });
    dispatch({ type: 'goToStep', step: 'exclusions' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kto bierze udział?</CardTitle>
        <CardDescription>
          Każdy zrobi prezent dokładnie jednej osobie. Numer telefonu jest opcjonalny — przyda się, żeby wysłać komuś
          jego wynik SMS-em lub na WhatsAppie.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="participants-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const fieldErrors = errors.participants?.[index];
              return (
                <li key={field.key} className="bg-muted/60 flex gap-3 rounded-xl p-3">
                  <Avatar name={values?.[index]?.name ?? ''} seed={field.id} className="mt-1" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
                    <div className="flex-1">
                      <label htmlFor={`name-${field.id}`} className="sr-only">
                        Imię osoby {index + 1}
                      </label>
                      <Input
                        id={`name-${field.id}`}
                        placeholder="Imię"
                        autoComplete="off"
                        aria-invalid={!!fieldErrors?.name}
                        {...form.register(`participants.${index}.name`)}
                      />
                      <FieldError className="mt-1" errors={[fieldErrors?.name]} />
                    </div>
                    <div className="sm:w-44">
                      <label htmlFor={`phone-${field.id}`} className="sr-only">
                        Telefon osoby {index + 1} (opcjonalnie)
                      </label>
                      <div className="relative">
                        <PhoneIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          id={`phone-${field.id}`}
                          type="tel"
                          inputMode="tel"
                          autoComplete="off"
                          placeholder="Telefon"
                          className="pl-9"
                          aria-invalid={!!fieldErrors?.phone}
                          {...form.register(`participants.${index}.phone`)}
                        />
                      </div>
                      <FieldError className="mt-1" errors={[fieldErrors?.phone]} />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mt-1"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                    aria-label={`Usuń osobę ${index + 1}`}
                  >
                    <Trash2Icon />
                  </Button>
                </li>
              );
            })}
          </ul>
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full border-dashed shadow-none"
            onClick={() => append(emptyParticipant())}
            disabled={fields.length >= MAX_PARTICIPANTS}
          >
            <PlusIcon />
            Dodaj osobę
          </Button>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            {fields.length} z {MAX_PARTICIPANTS} osób
          </p>
          <FieldError className="mt-2 text-center" errors={[errors.participants?.root ?? errors.participants]} />
        </form>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => dispatch({ type: 'goToStep', step: 'event' })}>
          Wstecz
        </Button>
        <Button type="submit" form="participants-form">
          Dalej: wykluczenia
        </Button>
      </CardFooter>
    </Card>
  );
};
