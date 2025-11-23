import { DrawResult } from '@/contexts/users-context';
import { MoveRight } from 'lucide-react';

interface DrawResultsListProps {
  results: DrawResult[];
}

export const DrawResultsList = ({ results }: DrawResultsListProps) => {
  return (
    <div className="mx-auto mt-9 mb-9 max-w-md overflow-x-auto">
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
  );
};


