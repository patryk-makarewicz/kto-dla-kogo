import { DrawResult } from '@/contexts/users-context';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { Field } from '@/components/ui/field';

import { DrawResultsList } from './draw-results-list';

interface DrawResultsCardProps {
  results: DrawResult[];
  onEditAgain: () => void;
}

export const DrawResultsCard = ({ results, onEditAgain }: DrawResultsCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Wyniki losowania</CardTitle>
        <CardDescription>Lista kto dla kogo robi prezent</CardDescription>
      </CardHeader>
      <CardContent>
        <DrawResultsList results={results} />
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal" className="justify-end">
          <Button type="button" variant="outline" onClick={onEditAgain}>
            Powrót do edycji
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
