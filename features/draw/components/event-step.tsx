'use client';

import { EventInfoSchema, type EventInfo } from '@/model/event.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { DatePicker } from '@/components/date-picker';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input
} from '@/components/ui';

import { useDrawStore } from '../state/draw-store';

export const EventStep = () => {
  const { state, dispatch } = useDrawStore();
  const form = useForm<EventInfo>({
    resolver: zodResolver(EventInfoSchema),
    defaultValues: state.event
  });
  const { errors } = form.formState;

  const onSubmit = (event: EventInfo) => {
    dispatch({ type: 'setEvent', event });
    dispatch({ type: 'goToStep', step: 'participants' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Na jaką okazję?</CardTitle>
        <CardDescription>
          Te informacje zobaczy każdy uczestnik razem z wylosowaną osobą. Wszystkie pola są opcjonalne.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="event-name">Nazwa</FieldLabel>
            <Input
              id="event-name"
              placeholder="np. Wigilia u babci 2026"
              aria-invalid={!!errors.name}
              {...form.register('name')}
            />
            <FieldError errors={[errors.name]} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.budget}>
              <FieldLabel htmlFor="event-budget">Budżet na prezent</FieldLabel>
              <Input
                id="event-budget"
                placeholder="np. do 150 zł"
                aria-invalid={!!errors.budget}
                {...form.register('budget')}
              />
              <FieldError errors={[errors.budget]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="event-date">Data wręczenia</FieldLabel>
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => <DatePicker id="event-date" value={field.value} onChange={field.onChange} />}
              />
            </Field>
          </div>
          <FieldDescription>
            Wspólny budżet sprawia, że prezenty są podobnej wartości i nikt nie czuje się niezręcznie.
          </FieldDescription>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" form="event-form">
          Dalej: uczestnicy
        </Button>
      </CardFooter>
    </Card>
  );
};
