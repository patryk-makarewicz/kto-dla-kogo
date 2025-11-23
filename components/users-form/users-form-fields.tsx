'use client';

import { UsersFormValuesType } from '@/model/users.model';
import { UsersFormSchema } from '@/model/users.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@/components/ui';
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

interface UsersFormFieldsProps {
  initialUsers: { name: string }[];
  onSubmit: (data: UsersFormValuesType) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
}

export const UsersFormFields = ({ initialUsers, onSubmit, onReset, isLoading }: UsersFormFieldsProps) => {
  const form = useForm<UsersFormValuesType>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: {
      users: initialUsers
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users'
  });

  // Synchronizuj formularz z initialUsers
  useEffect(() => {
    form.reset({ users: initialUsers });
  }, [initialUsers, form]);

  return (
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
  );
};
