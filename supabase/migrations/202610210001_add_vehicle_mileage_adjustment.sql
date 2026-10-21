-- Preserve the latest mileage correction or odometer replacement and its reason.
alter table public.vehicles
  add column if not exists mileage_adjustment jsonb;

notify pgrst, 'reload schema';
