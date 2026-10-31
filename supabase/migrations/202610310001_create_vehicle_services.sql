begin;

create table public.vehicle_services (
    id uuid primary key default gen_random_uuid(),
    vehicle_id uuid not null references public.vehicles(id) on delete cascade,
    service_type text not null,
    custom_service_type text,
    visit_reason text,
    custom_visit_reason text,
    service_date date not null,
    mileage_km integer not null check (mileage_km >= 0),
    provider text,
    work_performed text,
    parts_cost numeric(12, 2) check (parts_cost >= 0),
    labor_cost numeric(12, 2) check (labor_cost >= 0),
    currency_code text not null default 'EUR',
    symptoms text,
    part_name text,
    part_brand text,
    part_number text,
    part_quantity integer check (part_quantity > 0),
    fluid_type text,
    custom_fluid_type text,
    fluid_specification text,
    fluid_quantity numeric(12, 2) check (fluid_quantity > 0),
    service_outcome text,
    invoice_number text,
    warranty_date date,
    warranty_mileage_km integer check (warranty_mileage_km >= 0),
    recommended_work text,
    notes text,
    next_service_date date,
    next_service_mileage_km integer check (next_service_mileage_km >= 0),
    created_at timestamptz not null default now(),
    constraint custom_service_required check (
        service_type <> 'other'
        or nullif(trim(custom_service_type), '') is not null
    ),
    constraint custom_reason_required check (
        visit_reason is distinct from 'other'
        or nullif(trim(custom_visit_reason), '') is not null
    ),
    constraint custom_fluid_required check (
        fluid_type is distinct from 'other'
        or nullif(trim(custom_fluid_type), '') is not null
    )
);

create index vehicle_services_vehicle_date_idx
    on public.vehicle_services(vehicle_id, service_date desc);

alter table public.vehicle_services enable row level security;

revoke all on public.vehicle_services from anon, authenticated;
grant select, insert on public.vehicle_services to authenticated;

create policy "Owners can view vehicle services"
on public.vehicle_services for select to authenticated
using (
    exists (
        select 1 from public.vehicles as v
        where v.id = vehicle_services.vehicle_id
          and v.user_id = (select auth.uid())
          and v.archived_at is null
    )
);

create policy "Owners can add vehicle services"
on public.vehicle_services for insert to authenticated
with check (
    exists (
        select 1 from public.vehicles as v
        where v.id = vehicle_services.vehicle_id
          and v.user_id = (select auth.uid())
          and v.archived_at is null
    )
);

commit;
