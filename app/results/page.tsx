'use client';

import Link from 'next/link';

import { useUsers } from '@/providers/';
import { Gift, MoveRight } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field } from '@/components/ui';

const ResultsPage = () => {
  const { results } = useUsers();

  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
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
                <div className="text-muted-foreground mb-2 grid grid-cols-3 text-center font-semibold">
                  <div>kto</div>
                  <div>dla</div>
                  <div>kogo</div>
                </div>
                <ul className="bg-card flex flex-col gap-2 rounded p-4">
                  {results.map((res) => (
                    <li key={res.giver} className="grid grid-cols-3 items-center py-1 text-center">
                      <span className="text-foreground text-right font-medium">{res.giver}</span>
                      <span className="text-primary flex items-center justify-center">
                        <MoveRight className="text-primary size-4" />
                      </span>
                      <span className="text-foreground text-left font-medium">{res.receiver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Brak wyników do wyświetlenia. Dodaj osoby i przeprowadź losowanie!
              </p>
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
      </div>
    </main>
  );
};

export default ResultsPage;
