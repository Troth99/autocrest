"use client";

import { useRef, useState } from "react";
import { scanOdometerPhoto } from "@/features/garage/services/odometer-scan.service";

type Props = {
    disabled?: boolean;
    onReadingDetected: (mileageKm: number) => void;
};

export default function OdometerPhotoScan(
    {
        disabled = false,
        onReadingDetected
    }: Props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function scanHandler() {
        if (!photo || isScanning || disabled) return;

        setIsScanning(true);
        setError(null);

        try {
            const mileageKm = await scanOdometerPhoto(photo);
            onReadingDetected(mileageKm);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Scanning failed.",
            );
        } finally {
            setIsScanning(false);
        }
    }

    return (
        <div className="grid gap-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                className="hidden"
                disabled={disabled || isScanning}
                onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                        setPhoto(file);
                        setError(null);
                    }
                    event.target.value = "";
                }}
            />
            <button
                type="button"
                disabled={disabled || isScanning}
                onClick={() => inputRef.current?.click()}
                className="button-base w-full cursor-pointer justify-center bg-[#67e8f9] px-4 py-3 text-sm font-semibold text-[#171329] transition-colors hover:bg-[#a5f3fc] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {photo ? "Choose another photo" : "Scan odometer photo"}
            </button>
            {photo && (
                <>
                    <p role="status" className="break-all text-sm text-muted">
                        Selected: {photo.name}
                    </p>
                    <p className="text-xs text-muted">
                        Scanning sends this photo to Google Gemini and may incur API
                        usage costs. Check the detected reading before saving.
                    </p>
                    <button
                        type="button"
                        disabled={disabled || isScanning}
                        onClick={scanHandler}
                        className="button-base button-primary cursor-pointer px-4 py-3 text-sm disabled:cursor-not-allowed"
                    >
                        {isScanning ? "Scanning..." : "Read mileage"}
                    </button>
                </>
            )}
            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}
