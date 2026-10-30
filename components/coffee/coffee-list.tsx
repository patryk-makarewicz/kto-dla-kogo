import { CoffeeIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const COFFEE_URL = 'https://buycoffee.to/tinformacje';

const OPTIONS = [
  { size: 'small', price: '5 zł', icon: 'size-5', rotate: '-rotate-2' },
  { size: 'medium', price: '10 zł', icon: 'size-6', rotate: 'rotate-1' },
  { size: 'large', price: '15 zł', icon: 'size-7', rotate: '-rotate-1' }
];

export const CoffeeList = () => (
  <ul className="grid grid-cols-3 gap-3">
    {OPTIONS.map(({ size, price, icon, rotate }) => (
      <li key={size}>
        <a
          href={`${COFFEE_URL}?coffeeSize=${size}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'bg-sun text-ink border-ink shadow-sticker focus-visible:ring-ring flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-4 font-bold transition-transform outline-none hover:-translate-y-1 hover:rotate-0 focus-visible:ring-[3px]',
            rotate
          )}
        >
          <CoffeeIcon className={icon} />
          {price}
          <span className="sr-only">(otwiera się w nowej karcie)</span>
        </a>
      </li>
    ))}
  </ul>
);
