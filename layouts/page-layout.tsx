import { Footer, Header } from '@/components/';

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="paper-dots flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-4 pb-12 sm:pt-8">{children}</main>
      <Footer />
    </div>
  );
}
