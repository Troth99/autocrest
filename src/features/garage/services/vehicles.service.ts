"use server";

import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";
import type { Vehicle } from "@/features/garage/types/vehicle";
import { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";
import { createUpdateMileageSchema } from "@/features/garage/validators/update-mileage-validator";
import { z } from "zod";
import { getVehicleFieldErrors } from "@/features/garage/validators/getVehicleFieldErrors";

// Every exported function is an entry point, including calls from Client Components.
async function getVehicleSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await getAuthenticatedUser(supabase);

  if (error || !user) throw new Error("Please sign in again.");

  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (assuranceError)
    throw new Error("Could not verify your session. Please try again.");
  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    throw new Error("Please complete two-factor authentication first.");
  }

  return { supabase, user };
}

// Expected errors must be returned; production Server Actions redact thrown errors.
async function runVehicleMutation<T>(operation: () => Promise<T>) {
  try {
    return { data: await operation(), error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: "Please correct the highlighted fields.",
        fieldErrors: getVehicleFieldErrors(error),
      };
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Could not complete the vehicle operation. Please try again.",
    };
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  const { supabase, user } = await getVehicleSession();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("userId", user.id)
    .is("archivedAt", null)
    .order("isPrimary", { ascending: false })
    .order("createdAt", { ascending: false })
    .overrideTypes<Vehicle[]>();

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function addVehicle(input: unknown) {
  return await runVehicleMutation(async () => {
    const { supabase, user } = await getVehicleSession();
    // Validate the input using the Zod schema
    const values = addVehicleSchema.parse(input);

    const { data, error } = await supabase
      .from("vehicles")
      .insert({
        ...values,
        userId: user.id,
        vehicleType: "car",
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "Vehicle insert failed",
        JSON.stringify({
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        }),
      );

      if (error.code === "23505") {
        if (error.message.includes("vehicles_one_primary_per_user_idx")) {
          throw new Error(
            "A primary vehicle is already set. Uncheck 'Set as my primary vehicle' to add another vehicle.",
          );
        }
        throw new Error("A vehicle with these unique details already exists.");
      }
      if (error.code === "23514") {
        throw new Error(
          "The vehicle details do not meet a database rule. Check the supplied values.",
        );
      }
      if (error.code === "42501") {
        throw new Error(
          "Your account is not allowed to save this vehicle. Check the vehicles access policies.",
        );
      }
      throw new Error(
        `Could not save the vehicle (${error.code || "database error"}). Please try again.`,
      );
    }
    if (!data) {
      throw new Error("Could not save the vehicle.");
    }
    return data.id as string;
  });
}

export async function getVehicleById(
  vehicleId: string,
): Promise<Vehicle | null> {
  const { supabase, user } = await getVehicleSession();
  return await findOwnedVehicle(supabase, user.id, vehicleId);
}

async function findOwnedVehicle(
  supabase: SupabaseClient,
  userId: string,
  vehicleId: string,
): Promise<Vehicle | null> {
  if (!z.uuid().safeParse(vehicleId).success) {
    throw new Error("Invalid vehicle ID format.");
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .eq("userId", userId)
    .is("archivedAt", null)
    .maybeSingle<Vehicle>();

  if (error) {
    console.error(
      "Vehicle fetch failed",
      JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      }),
    );
    throw error;
  }

  return data ?? null;
}

export async function updateVehicle(vehicleId: string, input: unknown) {
  return await runVehicleMutation(async () => {
    const { supabase, user } = await getVehicleSession();
    if (!z.uuid().safeParse(vehicleId).success) {
      throw new Error("Invalid vehicle ID format.");
    }
    const values = addVehicleSchema.parse(input);

    const { data, error } = await supabase
      .from("vehicles")
      // Mileage is owned by the mileage dialog; do not overwrite it from a stale edit form.
      .update({
        ...values,
        mileageKm: undefined,
        mileageRecordedAt: undefined,
      })
      .eq("id", vehicleId)
      .eq("userId", user.id)
      .is("archivedAt", null)
      .select("id")
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Vehicle not found or changes were not allowed.");
    }

    return data.id;
  });
}

export async function updateVehicleMileage(vehicleId: string, input: unknown) {
  return await runVehicleMutation(async () => {
    const { supabase, user } = await getVehicleSession();
    const vehicle = await findOwnedVehicle(supabase, user.id, vehicleId);

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    const values = createUpdateMileageSchema(
      vehicle.mileageKm,
      vehicle.mileageRecordedAt,
    ).parse(input);

    const recordedAt = `${values.mileageRecordedAt}T00:00:00.000Z`;

    if (
      values.mileageKm === vehicle.mileageKm &&
      values.mileageRecordedAt === vehicle.mileageRecordedAt?.slice(0, 10)
    ) {
      throw new Error("There were no changes to save.");
    }

    const { data, error } = await supabase
      .from("vehicles")
      .update({
        mileageKm: values.mileageKm,
        mileageRecordedAt: recordedAt,
        ...(values.mode !== "reading"
          ? {
              mileageAdjustment: {
                kind: values.mode,
                reason: values.reason,
                previousMileageKm: vehicle.mileageKm,
                previousRecordedAt: vehicle.mileageRecordedAt,
                mileageKm: values.mileageKm,
                recordedAt: recordedAt,
                adjustedAt: new Date().toISOString(),
              },
            }
          : {}),
      })
      .eq("id", vehicleId)
      .eq("userId", vehicle.userId)
      .eq("mileageKm", vehicle.mileageKm)
      .eq("updatedAt", vehicle.updatedAt)
      .is("archivedAt", null)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error(
        "Mileage could not be updated. Refresh the page and try again.",
      );
    }

    return data.id;
  });
}

export async function setPrimaryVehicle(vehicleId: string) {
  return await runVehicleMutation(async () => {
    const { supabase } = await getVehicleSession();
    if (!z.uuid().safeParse(vehicleId).success) {
      throw new Error("Invalid vehicle ID format.");
    }
    const { error } = await supabase.rpc("set_primary_vehicle", {
      p_vehicle_id: vehicleId,
    });

    if (error) {
      throw error;
    }
  });
}

export async function deleteVehicle(vehicleId: string) {
  return await runVehicleMutation(async () => {
    const { supabase, user } = await getVehicleSession();
    // Verify ownership before deleting any files.
    const vehicle = await findOwnedVehicle(supabase, user.id, vehicleId);

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    const { data: photos, error: photosError } = await supabase
      .from("vehicle_photos")
      .select("storagePath")
      .eq("vehicleId", vehicleId);

    if (photosError) throw photosError;

    const paths = (photos ?? []).map((photo) => photo.storagePath);

    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("vehicle-photos")
        .remove(paths);

      if (storageError) {
        throw new Error(
          "Could not remove the vehicle photos. Please try again.",
        );
      }
    }

    // Related photo records are removed by ON DELETE CASCADE.
    const { data: deleted, error: deleteError } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicleId)
      .eq("userId", vehicle.userId)
      .select("id")
      .maybeSingle();

    if (deleteError || !deleted) {
      throw new Error(
        paths.length > 0
          ? "Photos were removed, but the vehicle could not be deleted. Please try again."
          : "Could not delete the vehicle. Please try again.",
      );
    }
  });
}
