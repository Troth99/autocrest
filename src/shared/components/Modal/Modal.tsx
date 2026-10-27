"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose?: () => void;
    onOpenChange?: ComponentProps<typeof Dialog.Root>["onOpenChange"];
    trigger?: ReactNode;
    disablePointerDismissal?: boolean;
    popupProps?: Omit<ComponentProps<typeof Dialog.Popup>, "children">;
    backdropClassName?: string;
    title?: string;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, onOpenChange, title, children, trigger, disablePointerDismissal, popupProps, backdropClassName }: Props) {
    return (
        <Dialog.Root open={isOpen} disablePointerDismissal={disablePointerDismissal} onOpenChange={onOpenChange ?? ((open) => {
            if (!open) onClose?.();
        })}>
            {trigger}
            <Dialog.Portal>
                <Dialog.Backdrop className={backdropClassName ?? "fixed inset-0 z-50 bg-black/60"} />
                <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 text-white" {...popupProps}>
                    {title && <header className="mb-6 flex items-center justify-between gap-4">
                        <Dialog.Title className="text-xl font-semibold">
                            {title}
                        </Dialog.Title>
                        <Dialog.Close type="button" aria-label="Close modal" className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-white/5">
                            <X className="size-5" aria-hidden="true" />
                        </Dialog.Close>
                    </header>}
                    {children}
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
