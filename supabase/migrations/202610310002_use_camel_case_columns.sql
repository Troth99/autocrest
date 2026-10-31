-- Prepared from the supplied Supabase schema snapshot.
-- Run this with the matching camelCase application release.
-- Renames preserve rows, foreign keys, indexes, constraints, grants and RLS policies.
-- Supabase Auth metadata and Storage system columns retain their provider-defined names.
begin;

lock table public.profiles, public.vehicles, public.vehicle_makes,
    public.vehicle_models, public.vehicle_photos, public.vehicle_services
    in access exclusive mode;

-- Accept the original schema and the already-renamed serviceType column.
-- Fail atomically if a column is missing or both spellings exist.
do $migration$
declare
    field record;
    old_exists boolean;
    new_exists boolean;
begin
    for field in
        select * from (values
            ('profiles', 'full_name', 'fullName'),
            ('profiles', 'avatar_url', 'avatarUrl'),
            ('profiles', 'created_at', 'createdAt'),
            ('profiles', 'updated_at', 'updatedAt'),
            ('vehicle_makes', 'vehicle_type', 'vehicleType'),
            ('vehicle_models', 'make_id', 'makeId'),
            ('vehicle_photos', 'vehicle_id', 'vehicleId'),
            ('vehicle_photos', 'storage_path', 'storagePath'),
            ('vehicle_photos', 'is_primary', 'isPrimary'),
            ('vehicle_photos', 'sort_order', 'sortOrder'),
            ('vehicle_photos', 'created_at', 'createdAt'),
            ('vehicle_services', 'vehicle_id', 'vehicleId'),
            ('vehicle_services', 'custom_service_type', 'customServiceType'),
            ('vehicle_services', 'visit_reason', 'visitReason'),
            ('vehicle_services', 'custom_visit_reason', 'customVisitReason'),
            ('vehicle_services', 'service_date', 'serviceDate'),
            ('vehicle_services', 'mileage_km', 'mileageKm'),
            ('vehicle_services', 'work_performed', 'workPerformed'),
            ('vehicle_services', 'parts_cost', 'partsCost'),
            ('vehicle_services', 'labor_cost', 'laborCost'),
            ('vehicle_services', 'currency_code', 'currencyCode'),
            ('vehicle_services', 'part_name', 'partName'),
            ('vehicle_services', 'part_brand', 'partBrand'),
            ('vehicle_services', 'part_number', 'partNumber'),
            ('vehicle_services', 'part_quantity', 'partQuantity'),
            ('vehicle_services', 'fluid_type', 'fluidType'),
            ('vehicle_services', 'custom_fluid_type', 'customFluidType'),
            ('vehicle_services', 'fluid_specification', 'fluidSpecification'),
            ('vehicle_services', 'fluid_quantity', 'fluidQuantity'),
            ('vehicle_services', 'service_outcome', 'serviceOutcome'),
            ('vehicle_services', 'invoice_number', 'invoiceNumber'),
            ('vehicle_services', 'warranty_date', 'warrantyDate'),
            ('vehicle_services', 'warranty_mileage_km', 'warrantyMileageKm'),
            ('vehicle_services', 'recommended_work', 'recommendedWork'),
            ('vehicle_services', 'next_service_date', 'nextServiceDate'),
            ('vehicle_services', 'next_service_mileage_km', 'nextServiceMileageKm'),
            ('vehicle_services', 'created_at', 'createdAt'),
            ('vehicles', 'user_id', 'userId'),
            ('vehicles', 'vehicle_type', 'vehicleType'),
            ('vehicles', 'registration_certificate_number', 'registrationCertificateNumber'),
            ('vehicles', 'manufacture_year', 'manufactureYear'),
            ('vehicles', 'first_registration_date', 'firstRegistrationDate'),
            ('vehicles', 'registration_country_code', 'registrationCountryCode'),
            ('vehicles', 'purchase_date', 'purchaseDate'),
            ('vehicles', 'purchase_price', 'purchasePrice'),
            ('vehicles', 'purchase_currency_code', 'purchaseCurrencyCode'),
            ('vehicles', 'vehicle_use', 'vehicleUse'),
            ('vehicles', 'fuel_type', 'fuelType'),
            ('vehicles', 'engine_cc', 'engineCc'),
            ('vehicles', 'power_hp', 'powerHp'),
            ('vehicles', 'euro_standard', 'euroStandard'),
            ('vehicles', 'mileage_km', 'mileageKm'),
            ('vehicles', 'mileage_recorded_at', 'mileageRecordedAt'),
            ('vehicles', 'is_primary', 'isPrimary'),
            ('vehicles', 'archived_at', 'archivedAt'),
            ('vehicles', 'created_at', 'createdAt'),
            ('vehicles', 'updated_at', 'updatedAt'),
            ('vehicles', 'mileage_adjustment', 'mileageAdjustment'),
            ('vehicle_services', 'service_type', 'serviceType')
        ) as columns_to_rename(table_name, old_name, new_name)
    loop
        select exists (
            select 1 from information_schema.columns
            where table_schema = 'public' and table_name = field.table_name
              and column_name = field.old_name
        ) into old_exists;
        select exists (
            select 1 from information_schema.columns
            where table_schema = 'public' and table_name = field.table_name
              and column_name = field.new_name
        ) into new_exists;

        if old_exists and new_exists then
            raise exception 'Both %.% and %.% exist; resolve the conflict first.',
                field.table_name, field.old_name, field.table_name, field.new_name;
        elsif old_exists then
            execute format('alter table public.%I rename column %I to %I',
                field.table_name, field.old_name, field.new_name);
        elsif not new_exists then
            raise exception 'Expected %.% or %.% to exist.',
                field.table_name, field.old_name, field.table_name, field.new_name;
        end if;
    end loop;
end;
$migration$;

-- PL/pgSQL function bodies must be updated explicitly after column renames.
-- Keep function names, arguments, privileges and SECURITY DEFINER settings.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (
    id,
    username,
    "fullName",
    "avatarUrl"
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    username = coalesce(
      public.profiles.username,
      excluded.username
    ),
    "fullName" = coalesce(
      public.profiles."fullName",
      excluded."fullName"
    ),
    "avatarUrl" = coalesce(
      public.profiles."avatarUrl",
      excluded."avatarUrl"
    );

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.set_vehicle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin
  new."updatedAt" := now();
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.set_primary_vehicle(p_vehicle_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'You must be signed in.';
  end if;

  -- Prevent simultaneous primary switches for this user.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text, 0)
  );

  -- Verify the selected vehicle belongs to this user.
  perform id
  from public.vehicles
  where id = p_vehicle_id
    and "userId" = v_user_id
    and "archivedAt" is null
  for update;

  if not found then
    raise exception 'Vehicle not found or access denied.';
  end if;

  -- Clear the previous primary designation.
  update public.vehicles
  set "isPrimary" = false
  where "userId" = v_user_id
    and "isPrimary" = true;

  -- Make the selected vehicle primary.
  update public.vehicles
  set "isPrimary" = true
  where id = p_vehicle_id
    and "userId" = v_user_id
    and "archivedAt" is null;

  if not found then
    raise exception 'Could not set the primary vehicle.';
  end if;
end;
$function$;

-- Preserve the existing updatedAt timestamps while renaming JSON keys.
alter table public.vehicles disable trigger vehicles_set_updated_at;

-- JSON object keys are data, so ALTER TABLE does not rename them.
update public.vehicles
set "mileageAdjustment" = ("mileageAdjustment" - 'previous_mileage_km')
    || case when "mileageAdjustment" ? 'previousMileageKm' then '{}'::jsonb
       else jsonb_build_object('previousMileageKm', "mileageAdjustment" -> 'previous_mileage_km') end
where jsonb_typeof("mileageAdjustment") = 'object'
  and "mileageAdjustment" ? 'previous_mileage_km';

update public.vehicles
set "mileageAdjustment" = ("mileageAdjustment" - 'previous_recorded_at')
    || case when "mileageAdjustment" ? 'previousRecordedAt' then '{}'::jsonb
       else jsonb_build_object('previousRecordedAt', "mileageAdjustment" -> 'previous_recorded_at') end
where jsonb_typeof("mileageAdjustment") = 'object'
  and "mileageAdjustment" ? 'previous_recorded_at';

update public.vehicles
set "mileageAdjustment" = ("mileageAdjustment" - 'mileage_km')
    || case when "mileageAdjustment" ? 'mileageKm' then '{}'::jsonb
       else jsonb_build_object('mileageKm', "mileageAdjustment" -> 'mileage_km') end
where jsonb_typeof("mileageAdjustment") = 'object'
  and "mileageAdjustment" ? 'mileage_km';

update public.vehicles
set "mileageAdjustment" = ("mileageAdjustment" - 'recorded_at')
    || case when "mileageAdjustment" ? 'recordedAt' then '{}'::jsonb
       else jsonb_build_object('recordedAt', "mileageAdjustment" -> 'recorded_at') end
where jsonb_typeof("mileageAdjustment") = 'object'
  and "mileageAdjustment" ? 'recorded_at';

update public.vehicles
set "mileageAdjustment" = ("mileageAdjustment" - 'adjusted_at')
    || case when "mileageAdjustment" ? 'adjustedAt' then '{}'::jsonb
       else jsonb_build_object('adjustedAt', "mileageAdjustment" -> 'adjusted_at') end
where jsonb_typeof("mileageAdjustment") = 'object'
  and "mileageAdjustment" ? 'adjusted_at';

alter table public.vehicles enable trigger vehicles_set_updated_at;

notify pgrst, 'reload schema';
commit;
