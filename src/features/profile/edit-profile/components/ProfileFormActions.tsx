import Link from "next/link";
import { Save } from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
type Props = { saveError: string | null; isSaving: boolean };
export default function ProfileFormActions({ saveError, isSaving }: Props) {
  return (
    <>
      {saveError && (
        <p role="alert" className="text-sm text-destructive">
          {saveError}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <Link
          href="/profile"
          className={buttonVariants({
            variant: "outline",
            className: "h-11 px-6",
          })}
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={isSaving}
          className="h-11 cursor-pointer bg-accent px-6 text-ink hover:bg-accent/85"
        >
          <Save />
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </>
  );
}
