import Link from 'next/link';

import { CoffeeList } from '@/components/';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const DonationPage = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Drogi Użytkowniku!</CardTitle>
          <CardDescription>
            Korzystanie z naszej strony jest całkowicie <span className="font-bold">darmowe</span>. Jeśli jednak
            uważasz, że nasza praca jest wartościowa i chcesz nas wesprzeć, możesz to zrobić „stawiając nam kawę”
            poprzez poniższe linki. Każde wsparcie pomaga nam utrzymać serwis i pracować nad nowymi funkcjami.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <CoffeeList />
          <Link href="/">
            <Button variant={'outline'} className="w-full cursor-pointer">
              Powrót
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default DonationPage;
