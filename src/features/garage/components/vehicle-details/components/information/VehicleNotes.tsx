type Props = {
  description: string | null;
};

export default function VehicleNotes({ description }: Props) {
  return (
    <section className="section-card">
        <h2 className="text-lg font-semibold">Notes</h2>
        <p className="mt-3 whitespace-pre-wrap section-description">
          {description?.trim() || "No notes added yet."}
        </p>
    </section>
  );
}
