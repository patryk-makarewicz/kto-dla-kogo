import Link from 'next/link';

import { CoffeeIcon } from 'lucide-react';

import { Button } from '@/components/ui';

export const CoffeeButton = () => (
  <Button asChild variant="outline" size="sm">
    <Link href="/dotacja">
      <CoffeeIcon />
      <span className="hidden sm:inline">Postaw kawę</span>
      <span className="sm:hidden">Wesprzyj</span>
    </Link>
  </Button>
);
