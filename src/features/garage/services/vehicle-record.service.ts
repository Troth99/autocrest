"use server";
import { createClient } from "@/lib/supabase/server";
import { getVehicleById } from "@/features/garage/services/vehicles.service";

import { addServiceSchema } from "@/features/garage/validators/add-service-validator";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import type {
  VehicleServiceRecord,
  VehicleServiceRecordDetails,
} from "@/features/garage/types/vehicle-service-record";
import { vehicleServiceLabels } from "@/features/garage/constants/vehicle-service-labels";
import { visitReasonLabels } from "@/features/garage/constants/visit-reason-labels";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";

export async function addVehicleService(
  vehicleId: string,
  values: AddServiceFormValues,
) {
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) throw new Error("Vehicle not found.");

  const validatedValues = addServiceSchema.parse(values);

  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicle_services")
    .insert({ vehicleId: vehicle.id, ...validatedValues });

  if (error) throw error;
}

export async function getVehicleReports(
  vehicleId: string,
): Promise<VehicleServiceRecord[]> {
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicle_services")
    .select("*")
    .eq("vehicleId", vehicleId)
    .order("serviceDate", { ascending: false })
    .overrideTypes<VehicleServiceRecord[]>();

  if (error) throw error;
  return data ?? [];
}

export async function getVehicleReportById(
  vehicleId: string,
  reportId: string,
): Promise<VehicleServiceRecordDetails | null> {
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicle_services")
    .select("*")
    .eq("vehicleId", vehicleId)
    .eq("id", reportId)
    .maybeSingle<VehicleServiceRecord>();

  if (error) {
    throw error;
  }
  if (!data) return null;

  // Prefer custom descriptions over the labels for stored values.
  const serviceType =
    data.customServiceType || vehicleServiceLabels[data.serviceType];
  const visitReason =
    data.customVisitReason ||
    (data.visitReason ? visitReasonLabels[data.visitReason] : null);

  // Prepare display labels and show "Not provided" for missing values.
  return {
    ...data,
    vehicleName: `${vehicle.make} ${vehicle.model}`,
    serviceTypeLabel: formatVehicleValue(serviceType),
    visitReasonLabel: formatVehicleValue(visitReason),
  };
}
