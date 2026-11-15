import Link from "next/link";
import { Save } from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { useFormStatus } from "react-dom";
type Props = { saveError: string | null };
export default function ProfileFormActions({ saveError }: Props) {

  const { pending } = useFormStatus();

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
          disabled={pending}
          className="h-11 cursor-pointer bg-accent px-6 text-ink hover:bg-accent/85"
        >
          <Save />
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </>
  );
}
