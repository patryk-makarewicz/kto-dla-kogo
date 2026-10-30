import { cn } from '@/lib/utils';

const COLORS = [
  'bg-primary text-primary-foreground',
  'bg-ribbon text-ribbon-foreground',
  'bg-sun text-ink',
  'bg-[#6b4cff] text-white',
  'bg-[#ff8a3d] text-ink'
];

const hash = (text: string) => [...text].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('pl'))
    .join('') || '?';

interface AvatarProps {
  name: string;
  seed?: string;
  className?: string;
}

export const Avatar = ({ name, seed = name, className }: AvatarProps) => (
  <span
    aria-hidden
    className={cn(
      'border-ink inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold',
      COLORS[hash(seed) % COLORS.length],
      className
    )}
  >
    {initials(name)}
  </span>
);
