-- Read-only inspection before renaming application columns.
-- Run in the Supabase SQL Editor and copy the schema_snapshot result.
-- This reads schema definitions, not application rows or API keys.
select jsonb_pretty(jsonb_build_object(
    'columns', (
        select coalesce(jsonb_agg(to_jsonb(c) order by c.table_name, c.ordinal_position), '[]'::jsonb)
        from information_schema.columns c
        where c.table_schema = 'public'
    ),
    'constraints', (
        select coalesce(jsonb_agg(jsonb_build_object(
            'table', c.conrelid::regclass::text,
            'name', c.conname,
            'definition', pg_get_constraintdef(c.oid)
        )), '[]'::jsonb)
        from pg_constraint c
        join pg_class t on t.oid = c.conrelid
        join pg_namespace n on n.oid = t.relnamespace
        where n.nspname = 'public'
    ),
    'functions', (
        select coalesce(jsonb_agg(jsonb_build_object(
            'name', p.oid::regprocedure::text,
            'definition', pg_get_functiondef(p.oid)
        )), '[]'::jsonb)
        from pg_proc p
        join pg_namespace n on n.oid = p.pronamespace
        where n.nspname = 'public'
          and p.prokind in ('f', 'p')
          and not exists (
              select 1 from pg_depend d
              where d.classid = 'pg_proc'::regclass
                and d.objid = p.oid and d.deptype = 'e'
          )
    ),
    'triggers', (
        select coalesce(jsonb_agg(jsonb_build_object(
            'table', t.tgrelid::regclass::text,
            'definition', pg_get_triggerdef(t.oid),
            'functionDefinition', pg_get_functiondef(t.tgfoid)
        )), '[]'::jsonb)
        from pg_trigger t
        join pg_class c on c.oid = t.tgrelid
        join pg_namespace n on n.oid = c.relnamespace
        where not t.tgisinternal
          and (n.nspname = 'public' or (n.nspname = 'auth' and c.relname = 'users'))
    ),
    'policies', (
        select coalesce(jsonb_agg(to_jsonb(p)), '[]'::jsonb)
        from pg_policies p
        where p.schemaname in ('public', 'storage')
    ),
    'indexes', (
        select coalesce(jsonb_agg(to_jsonb(i)), '[]'::jsonb)
        from pg_indexes i where i.schemaname = 'public'
    ),
    'views', (
        select coalesce(jsonb_agg(to_jsonb(v)), '[]'::jsonb)
        from pg_views v where v.schemaname = 'public'
    )
)) as schema_snapshot;
