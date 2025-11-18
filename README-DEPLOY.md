# Deployment notes
- Create Supabase project.
- Run `sql/schema.sql`
- Add a user via Supabase Auth to create profiles manually, then insert a row in crm.profiles linking the user to an organization.
- Deploy Next.js to Vercel and set environment variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
- Configure webhooks from Meta to /api/webhooks/meta
