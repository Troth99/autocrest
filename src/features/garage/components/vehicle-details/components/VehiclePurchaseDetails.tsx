import { ReceiptText } from "lucide-react";

// Static preview data and layout.
export default function VehiclePurchaseDetails() {
  return (
    <section className="section-card">
        <div className="mb-5 flex items-center gap-2"><ReceiptText className="size-5 text-info" aria-hidden="true" /><h2 className="text-lg font-semibold">Purchase details</h2></div>
        <dl className="space-y-4">
            <div className="flex justify-between gap-3"><dt className="text-sm text-muted">Purchased on</dt><dd className="text-sm font-medium">20 June 2023</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-sm text-muted">Purchase price</dt><dd className="text-sm font-medium">ˆ11,250.00</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-sm text-muted">Vehicle use</dt><dd className="text-sm font-medium">Personal</dd></div>
        </dl>
    </section>
  );
}
