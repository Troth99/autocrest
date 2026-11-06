-- Allow registration to check a username without exposing profile rows.
begin;

create or replace function public.is_username_taken(candidate_username text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where username = btrim(candidate_username)
  );
$$;

revoke all on function public.is_username_taken(text) from public;
grant execute on function public.is_username_taken(text) to anon, authenticated;

-- Keep profiles_username_key as the final protection against concurrent signups.
commit;
