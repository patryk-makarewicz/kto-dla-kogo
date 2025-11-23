import { Gift } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center gap-2 self-center font-medium">
      <Gift className="text-primary size-8" />
      Kto dla kogo?
    </header>
  );
};
