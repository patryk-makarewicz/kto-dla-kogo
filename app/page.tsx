import Link from 'next/link';

import { Footer } from '@/components/';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Witaj!</CardTitle>
          <CardDescription>Wylosuj osobę, której zrobisz prezent</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Link href="/donation">
            <Button variant={'outline'} className="w-full cursor-pointer">
              Wsparcie
            </Button>
          </Link>
          <Link href="/draw">
            <Button className="w-full cursor-pointer">Zaczynamy</Button>
          </Link>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default Home;
