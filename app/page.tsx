import Link from 'next/link';

import { ShuffleIcon } from 'lucide-react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// Zig-zag, overlapping fan: reads as an illustration, not as a list of buttons.
const SAMPLE_TAGS = [
  { giver: 'Babcia Ela', receiver: 'Kuba', className: 'bg-card top-0 left-0 -rotate-6 z-10' },
  { giver: 'Kuba', receiver: 'Ciocia Ola', className: 'bg-sun text-ink top-14 right-0 rotate-3 z-20' },
  { giver: 'Ciocia Ola', receiver: 'Babcia Ela', className: 'bg-card top-28 left-4 -rotate-2 z-30' }
];

const STEPS = [
  {
    title: 'Wpisz uczestników',
    text: 'Dodaj imiona, a jeśli chcesz, także numery telefonów. Ustal budżet i datę.'
  },
  {
    title: 'Wyklucz pary',
    text: 'Małżonkowie albo rodzeństwo nie trafią na siebie nawzajem.'
  },
  {
    title: 'Wyślij każdemu jego wynik',
    text: 'SMS-em, na WhatsAppie albo jako link. Każdy zobaczy tylko swoją osobę.'
  }
];

const Home = () => (
  <div className="flex flex-col gap-14">
    <section className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-6xl">
          Jeden prezent. Za to porządny.
        </h1>
        <p className="text-muted-foreground max-w-prose text-lg">
          Kiedy w rodzinie jest czternaście osób, nikt nie chce kupować trzynastu drobiazgów. Wylosujcie, kto komu robi
          prezent, i niech każdy przygotuje jeden, ale przemyślany.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg" className="sm:w-fit">
          <Link href="/losowanie">
            <ShuffleIcon />
            Zacznij losowanie
          </Link>
        </Button>
        <p className="text-muted-foreground text-center text-sm sm:text-left">Za darmo, bez zakładania konta.</p>
      </div>

      <figure className="bg-secondary/70 flex flex-col gap-4 rounded-2xl px-5 pt-6 pb-4">
        <ul aria-label="Przykładowy wynik losowania" className="relative mx-auto h-48 w-full max-w-sm">
          {SAMPLE_TAGS.map(({ giver, receiver, className }) => (
            <li key={giver} className={cn('gift-tag absolute w-fit py-2.5 pr-6', className)}>
              <span className="block text-xs font-semibold opacity-70">{giver} robi prezent dla</span>
              <span className="font-display text-xl font-bold">{receiver}</span>
            </li>
          ))}
        </ul>
        <figcaption className="text-muted-foreground text-sm">
          Przykład: Babcia Ela, Kuba i Ciocia Ola. Każdy daje jeden prezent i jeden dostaje.
        </figcaption>
      </figure>
    </section>

    <section aria-labelledby="how-it-works" className="flex flex-col gap-5">
      <h2 id="how-it-works" className="font-display text-2xl font-bold tracking-tight">
        Jak to działa
      </h2>
      <ol className="flex flex-col gap-4">
        {STEPS.map(({ title, text }, index) => (
          <li key={title} className="flex gap-4">
            <span className="bg-primary text-primary-foreground border-ink font-display flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-muted-foreground border-ink rounded-xl border-2 border-dashed p-4 text-sm">
        Dane uczestników zostają w Twojej przeglądarce. Nie wysyłamy ich na żaden serwer.
      </p>
    </section>
  </div>
);

export default Home;
