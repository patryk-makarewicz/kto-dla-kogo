import { UsersFormValuesType } from '@/model/users.model';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Spinner
} from '@/components/ui';
import { Field } from '@/components/ui/field';

import { UsersFormFields } from './users-form-fields';

interface UsersFormCardProps {
  initialUsers: { name: string }[];
  onSubmit: (data: UsersFormValuesType) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
}

export const UsersFormCard = ({ initialUsers, onSubmit, onReset, isLoading }: UsersFormCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Wprowadz osoby</CardTitle>
        <CardDescription>Wpisz imiona osób które biorą udział w losowaniu.</CardDescription>
      </CardHeader>
      <CardContent>
        <UsersFormFields initialUsers={initialUsers} onSubmit={onSubmit} onReset={onReset} isLoading={isLoading} />
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
};
