"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const formSchema = z.object({
  users: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, { message: "Minimalnie 3 znaki" })
          .max(32, { message: "Maksymalnie 32 znaki" }),
      })
    )
    .min(2, "Wprowadz co najmniej 2 imiona")
    .max(20, "Możesz dodać maksymalnie 20 imion"),
});

export const UsersForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Zapisane dane:", {
      description: (
        <pre className="bg-code text-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  };
  return (
    <Card className="w-full ">
      <CardHeader className="border-b">
        <CardTitle>Wprowadz osoby</CardTitle>
        <CardDescription>
          Wpisz imiona osób które mają być wylosowane.
        </CardDescription>
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
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
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
                                aria-label={`Usuń imię ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: "" })}
                disabled={fields.length >= 5}
              >
                Dodaj osobę
              </Button>
            </FieldGroup>
            {form.formState.errors.users?.root && (
              <FieldError errors={[form.formState.errors.users.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal" className="justify-end ">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Zresetuj
          </Button>
          <Button type="submit" form="form-rhf-array">
            Zapisz
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
