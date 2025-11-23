'use client';

import { UsersFormSchema, UsersFormValuesType } from '@/model/users.model';
import { useUsers } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Spinner } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet
} from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { drawUsers } from '@/lib/draw';

export const UsersForm = () => {
  const { users, setUsers, results, setResults } = useUsers();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialUsers = [{ name: '' }];

  const form = useForm<UsersFormValuesType>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: {
      users: users.length > 0 ? users : initialUsers
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users'
  });

  const onSubmit = async (data: UsersFormValuesType) => {
    setIsLoading(true);
    setUsers(data.users);

    // Symulacja opóźnienia dla lepszego UX (opcjonalne)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const names = data.users.map((u) => u.name);
    const draw = drawUsers(names);
    setResults(draw);
    setIsLoading(false);
    setIsFlipped(true);
    toast.success('Gratulacje! Losowanie zakonczyło się sukcesem.');
  };

  const onReset = () => {
    setUsers(initialUsers);
    setResults(null);
    setIsFlipped(false);
    form.reset({ users: initialUsers });
  };

  const onEditAgain = () => {
    // Najpierw obróć kartę
    setIsFlipped(false);
    // Opóźnij usunięcie wyników, aby karta najpierw się obróciła
    setTimeout(() => {
      setResults(null);
    }, 600); // Czas trwania animacji flip (0.6s)
  };

  return (
    <div className="flip-container">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front side - Form */}
        <div className="flip-card-front">
          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle>Wprowadz osoby</CardTitle>
              <CardDescription>Wpisz imiona osób które biorą udział w losowaniu.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldSet className="gap-4">
                  <FieldLegend variant="label">Osoby</FieldLegend>
                  <FieldDescription>Wprowadz maksymalnie 20 imion.</FieldDescription>
                  <FieldGroup className="gap-4">
                    {fields.map((field, index) => (
                      <Controller
                        key={field.id}
                        name={`users.${index}.name`}
                        control={form.control}
                        render={({ field: controllerField, fieldState }) => (
                          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                            <FieldContent>
                              <InputGroup>
                                <InputGroupInput
                                  {...controllerField}
                                  id={`form-rhf-array-name-${index}`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Wpisz imię"
                                  type="text"
                                  autoComplete="text"
                                />
                                {fields.length > 1 && (
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      size="icon-xs"
                                      onClick={() => remove(index)}
                                      aria-label={`Usuń imię ${index + 1}`}>
                                      <XIcon />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                )}
                              </InputGroup>
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </FieldContent>
                          </Field>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ name: '' })}
                      disabled={fields.length >= 20}>
                      Dodaj kolejną osobę
                    </Button>
                  </FieldGroup>
                  {form.formState.errors.users?.root && <FieldError errors={[form.formState.errors.users.root]} />}
                </FieldSet>
              </form>
            </CardContent>
            <CardFooter className="border-t">
              <Field orientation="horizontal" className="justify-end">
                <Button type="button" variant="outline" onClick={onReset} disabled={isLoading}>
                  Zresetuj
                </Button>
                <Button type="submit" form="form-rhf-array" disabled={isLoading}>
                  {isLoading && <Spinner />}
                  Losowanie
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>

        {/* Back side - Results */}
        <div className="flip-card-back">
          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle>Wyniki losowania</CardTitle>
              <CardDescription>Lista kto dla kogo robi prezent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto mt-9 mb-9 max-w-md overflow-x-auto">
                <div className="text-muted-foreground flex items-center gap-2 font-semibold">
                  <div className="flex-1 text-right">kto</div>
                  <div className="flex w-8 items-center justify-center">dla</div>
                  <div className="flex-1 text-left">kogo</div>
                </div>
                <ul className="bg-card flex flex-col gap-2 rounded p-4">
                  {results?.map((res) => (
                    <li key={res.giver} className="flex min-w-0 items-center gap-2 py-1">
                      <span className="text-foreground flex-1 truncate text-right font-medium">{res.giver}</span>
                      <span className="text-primary flex w-8 shrink-0 items-center justify-center">
                        <MoveRight className="text-primary size-4" />
                      </span>
                      <span className="text-foreground flex-1 truncate text-left font-medium">{res.receiver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Field orientation="horizontal" className="justify-end">
                <Button type="button" variant="outline" onClick={onEditAgain}>
                  Powrót do edycji
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
