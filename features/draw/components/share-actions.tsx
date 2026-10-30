'use client';

import type { EventInfo } from '@/model/event.model';
import { CopyIcon, MessageCircleIcon, MessageSquareTextIcon, Share2Icon } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui';
import { buildRevealUrl, buildShareMessage, buildSmsHref, buildWhatsAppHref, encodeReveal } from '@/lib/share';

const noopSubscribe = () => () => {};

interface ShareActionsProps {
  giver: string;
  receiver: string;
  phone: string;
  event: EventInfo;
}

export const ShareActions = ({ giver, receiver, phone, event }: ShareActionsProps) => {
  const canShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === 'function',
    () => false
  );

  const buildMessage = () => {
    const url = buildRevealUrl(window.location.origin, encodeReveal(giver, receiver, event));
    return { url, message: buildShareMessage(giver, event.name, url) };
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage().message);
      toast.success(`Skopiowano wiadomość dla: ${giver}`);
    } catch {
      toast.error('Nie udało się skopiować. Spróbuj ponownie.');
    }
  };

  const share = async () => {
    const { url, message } = buildMessage();
    try {
      await navigator.share({ title: 'Kto dla kogo?', text: message.replace(url, '').trim(), url });
    } catch {
      // user closed the share sheet
    }
  };

  const open = (buildHref: (phone: string, message: string) => string) => () => {
    window.location.href = buildHref(phone, buildMessage().message);
  };

  return (
    <div className="flex gap-1.5">
      {phone && (
        <>
          <Button size="icon-sm" variant="ghost" onClick={open(buildSmsHref)} aria-label={`Wyślij SMS do: ${giver}`}>
            <MessageSquareTextIcon />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => window.open(buildWhatsAppHref(phone, buildMessage().message), '_blank', 'noopener')}
            aria-label={`Wyślij na WhatsAppie do: ${giver}`}
          >
            <MessageCircleIcon />
          </Button>
        </>
      )}
      {canShare ? (
        <Button size="icon-sm" variant="ghost" onClick={share} aria-label={`Udostępnij link dla: ${giver}`}>
          <Share2Icon />
        </Button>
      ) : (
        <Button size="icon-sm" variant="ghost" onClick={copyLink} aria-label={`Kopiuj wiadomość dla: ${giver}`}>
          <CopyIcon />
        </Button>
      )}
    </div>
  );
};
