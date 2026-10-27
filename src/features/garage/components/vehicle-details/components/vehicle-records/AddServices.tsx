

type Props = {
    onClose: () => void;
};
export default function AddService({ onClose }: Props) {


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-service-title"
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 text-white"
            >
                <header className="mb-6 flex items-center justify-between">
                    <h2 id="add-service-title" className="text-xl font-semibold">
                        Add service
                    </h2>

                    <button
                        type="button"
                        aria-label="Close modal"
                        className="rounded-lg px-3 py-1 text-slate-400 hover:bg-white/5 cursor-pointer"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </header>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="service-name" className="block text-sm">
                            Service name
                        </label>
                        <input
                            id="service-name"
                            type="text"
                            placeholder="e.g. Engine oil change"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="service-date" className="block text-sm">
                                Date
                            </label>
                            <input
                                id="service-date"
                                type="date"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 scheme-dark"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="service-mileage" className="block text-sm">
                                Mileage (km)
                            </label>
                            <input
                                id="service-mileage"
                                type="number"
                                min="0"
                                placeholder="150000"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="service-cost" className="block text-sm">
                            Cost (€)
                        </label>
                        <input
                            id="service-cost"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="service-notes" className="block text-sm">
                            Notes
                        </label>
                        <textarea
                            id="service-notes"
                            rows={3}
                            placeholder="Additional details..."
                            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        />
                    </div>
                </div>

                <footer className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        className="rounded-xl border border-white/10 px-5 py-3 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="rounded-xl bg-violet-400 px-5 py-3 font-semibold text-slate-950"
                    >
                        Save service
                    </button>
                </footer>
            </section>
        </div>

    )
}