import Link from 'next/link';

import { Gift } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FieldDescription } from '@/components/ui';

const Home = () => {
  return (
    <>
      <div className="flex items-center gap-2 self-center font-medium">
        <Gift className="text-primary size-8" />
        Kto dla kogo?
      </div>
      <div className="flex flex-col gap-6">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Witaj!</CardTitle>
            <CardDescription>Wylosuj osobę, której zrobisz prezent</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/users">
              <Button className="w-full cursor-pointer">Zaczynamy</Button>
            </Link>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          Przez kliknięcie &quot;Zaczynamy&quot;, akceptujesz nasz <a href="#">Regulamin</a> oraz{' '}
          <a href="#">Politykę prywatności</a>.
        </FieldDescription>
      </div>
    </>
  );
};

export default Home;
