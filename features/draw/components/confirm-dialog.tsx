'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export const ConfirmDialog = ({ trigger, title, description, confirmLabel, onConfirm }: ConfirmDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Anuluj</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
