"use client";

import { useFormStatus } from "react-dom";

export default function AddServiceButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="button-base button-primary px-5 py-2.5 cursor-pointer disabled:cursor-not-allowed"
        >
            {pending ? "Saving..." : "Save service"}
        </button>
    );
}
