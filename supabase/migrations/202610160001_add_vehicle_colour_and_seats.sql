-- Existing vehicles keep unknown colour and seat count as NULL.
alter table public.vehicles
  add column if not exists colour text,
  add column if not exists seats integer check (seats > 0);

notify pgrst, 'reload schema';
