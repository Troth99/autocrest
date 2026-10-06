export type VehiclePhoto = {
  id: string;
  vehicle_id: string;
  // Store a bucket-relative path rather than an expiring signed URL.
  storage_path: string;
  caption: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
};
