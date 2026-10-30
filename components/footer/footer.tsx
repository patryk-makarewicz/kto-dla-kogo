import { PrivacyPolicy, TermsOfService } from '@/components/regulations';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui';

import packageJson from '@/package.json';

const LegalDialog = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger className="hover:text-foreground focus-visible:ring-ring rounded underline underline-offset-4 outline-none focus-visible:ring-[3px]">
      {label}
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogTitle className="sr-only">{label}</DialogTitle>
      <div className="-mr-3 overflow-y-auto pr-3 text-sm leading-relaxed [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5">
        {children}
      </div>
    </DialogContent>
  </Dialog>
);

export const Footer = () => (
  <footer className="text-muted-foreground mx-auto flex w-full max-w-xl flex-col items-center gap-2 px-4 pb-8 text-center text-sm">
    <nav aria-label="Dokumenty" className="flex gap-4">
      <LegalDialog label="Regulamin">
        <TermsOfService />
      </LegalDialog>
      <LegalDialog label="Polityka prywatności">
        <PrivacyPolicy />
      </LegalDialog>
    </nav>
    <p className="text-xs">
      © {new Date().getFullYear()} Kto dla kogo?, wersja {packageJson.version}
    </p>
  </footer>
);
