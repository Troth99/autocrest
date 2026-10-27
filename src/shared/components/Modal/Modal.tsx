import { ReactNode } from "react";
import AddService from "../../../features/garage/components/vehicle-details/components/vehicle-records/AddServices"

type Props = {
    isOpen: boolean;
    onClose: () => void
    children: ReactNode;
}
export default function Modal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <section
                role="dialog"
                aria-modal="true"
                aria-label="Vehicle record"
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 text-white"
            >
                <button type="button" aria-label="Close modal" className="cursor-pointer" onClick={onClose}>
                    ✕
                </button>

                {children}
            </section>
        </div>
    );
}