import Image from 'next/image';

import BuyCoffeeLogo from '@/assets/buy-coffee.png';

export const CoffeeButton = () => (
  <a
    href="https://buycoffee.to/tinformacje"
    target="_blank"
    className="bg-primary flex items-center gap-4 rounded-full border p-2 font-bold text-white">
    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white p-2">
      <Image
        priority
        src={BuyCoffeeLogo}
        width={20}
        height={13}
        alt="Postaw mi kawę na buycoffee.to"
        className="mt-1"
      />
    </div>
    <span className="mr-3">Postaw kawę</span>
  </a>
);
