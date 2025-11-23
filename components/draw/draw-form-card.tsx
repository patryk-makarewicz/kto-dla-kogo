import { UsersFormValuesType } from '@/model/users.model';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  Spinner
} from '@/components/ui';

import { DrawFormFields } from './draw-form-fields';

interface DrawFormCardProps {
  initialUsers: { name: string }[];
  onSubmit: (data: UsersFormValuesType) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
}

export const DrawFormCard = ({ initialUsers, onSubmit, onReset, isLoading }: DrawFormCardProps) => (
  <Card className="w-full">
    <CardHeader className="border-b">
      <CardTitle>Wprowadz osoby</CardTitle>
      <CardDescription>Wpisz imiona osób które biorą udział w losowaniu.</CardDescription>
    </CardHeader>
    <CardContent>
      <DrawFormFields initialUsers={initialUsers} onSubmit={onSubmit} />
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
);
