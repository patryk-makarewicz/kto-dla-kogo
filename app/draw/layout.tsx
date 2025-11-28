import { CoffeeButton } from '@/components/';

export default function DrawLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="fixed top-4 right-4">
        <CoffeeButton />
      </div>
    </>
  );
}
