import { Header } from '@/components/';

export default function PageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-3 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Header />
        {children}
      </div>
    </main>
  );
}
