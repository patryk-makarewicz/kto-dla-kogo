'use client';

import { useRouter } from 'next/navigation';

import { UsersFormSchema, UsersFormValuesType } from '@/model/users.model';
import { useUsers } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  const router = useRouter();
  const { users, setUsers, setResults } = useUsers();

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

  const onSubmit = (data: UsersFormValuesType) => {
    setUsers(data.users);
    const names = data.users.map((u) => u.name);
    const draw = drawUsers(names);
    setResults(draw);
    toast.success('Gratulacje! Losowanie zakonczyło się sukcesem.');
    router.push('/results');
  };

  const onReset = () => {
    setUsers(initialUsers);
    setResults(null);
    form.reset({ users: initialUsers });
  };

  return (
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
          <Button type="button" variant="outline" onClick={onReset}>
            Zresetuj
          </Button>
          <Button type="submit" form="form-rhf-array">
            Losowanie
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
