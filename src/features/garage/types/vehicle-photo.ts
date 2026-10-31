export type VehiclePhoto = {
  id: string;
  vehicleId: string;
  // Store a bucket-relative path rather than an expiring signed URL.
  storagePath: string;
  caption: string | null;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
};
