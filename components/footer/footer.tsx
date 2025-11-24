import { Modal, PrivacyPolicy, TermsOfService } from '@/components/';
import { FieldDescription } from '@/components/ui';

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <div className="text-muted-foreground mb-3 px-6 text-center text-sm">
        Przez kliknięcie &quot;Zaczynamy&quot;, akceptujesz nasz
        <span className="inline-block">
          <Modal buttonLabel="Regulamin" content={<TermsOfService />} />
        </span>
        oraz
        <span className="inline-block">
          <Modal buttonLabel="Politykę prywatności" content={<PrivacyPolicy />} />
        </span>
      </div>
      <FieldDescription className="px-6 text-center text-xs">
        Copyright Ⓒ {year} Kto dla kogo?, ver. 1.1
      </FieldDescription>
    </footer>
  );
};
