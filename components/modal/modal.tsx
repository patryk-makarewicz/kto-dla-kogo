'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks';

type ModalProps = {
  content: React.ReactNode;
  buttonLabel: string;
};

export const Modal = ({ content, buttonLabel }: ModalProps) => {
  const { isModalOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <div>
      <button
        onClick={onOpenModal}
        className="text-muted-foreground hover:text-primary cursor-pointer px-1 text-sm underline transition-all duration-300 ease-in-out">
        {buttonLabel}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-80" onClick={onCloseModal} />
          <div className="z-10 mx-2 max-h-[500px] w-full max-w-4xl rounded-lg bg-gray-100 px-2 py-3 shadow-lg dark:bg-gray-800">
            <div className="mb-3 flex items-center justify-end">
              <button
                className="transition-bg cursor-pointer rounded-md p-1 duration-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                onClick={onCloseModal}>
                <X size={30} strokeWidth={2} className="text-black dark:text-white" />
              </button>
            </div>
            <div className="custom-scrollbar max-h-[374px] overflow-y-scroll rounded-md bg-white px-2 dark:bg-gray-900">
              {content}
            </div>
            <div className="flex items-center justify-center">
              <Button onClick={onCloseModal} className="mt-3 cursor-pointer">
                Zamknij
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
