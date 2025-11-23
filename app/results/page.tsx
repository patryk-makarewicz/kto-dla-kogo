'use client';

import Link from 'next/link';

import { useUsers } from '@/providers/';
import { Gift, MoveRight } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field } from '@/components/ui';

const ResultsPage = () => {
  const { results } = useUsers();

  return (
    <>
      <div className="flex items-center gap-2 self-center font-medium">
        <Gift className="text-primary size-8" />
        Kto dla kogo?
      </div>
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle>Wyniki losowania</CardTitle>
          <CardDescription>Lista kto dla kogo robi prezent</CardDescription>
        </CardHeader>
        <CardContent>
          {results && results.length > 0 ? (
            <div className="mx-auto max-w-md overflow-x-auto">
              <div className="text-muted-foreground flex items-center gap-2 font-semibold">
                <div className="flex-1 text-right">kto</div>
                <div className="flex w-8 items-center justify-center">dla</div>
                <div className="flex-1 text-left">kogo</div>
              </div>
              <ul className="bg-card flex flex-col gap-2 rounded p-4">
                {results.map((res) => (
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
          ) : (
            <p className="text-muted-foreground">Brak wyników do wyświetlenia. Dodaj osoby i przeprowadź losowanie!</p>
          )}
        </CardContent>
        <CardFooter className="border-t">
          <Field orientation="horizontal" className="justify-end">
            <Link href="/users">
              <Button variant="outline">Powrót do edycji</Button>
            </Link>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
};

export default ResultsPage;
