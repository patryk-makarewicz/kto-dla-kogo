import type { Metadata } from 'next';
import Link from 'next/link';

import { CoffeeList } from '@/components/';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Wesprzyj projekt — Kto dla kogo?'
};

const DonationPage = () => (
  <Card>
    <CardHeader>
      <CardTitle>Postaw nam kawę</CardTitle>
      <CardDescription className="text-base">
        Kto dla kogo? jest i zostanie darmowe. Jeśli losowanie Wam się przydało, możesz wesprzeć utrzymanie strony i
        rozwój nowych funkcji.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-6">
      <CoffeeList />
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">Wróć na stronę główną</Link>
      </Button>
    </CardContent>
  </Card>
);

export default DonationPage;
