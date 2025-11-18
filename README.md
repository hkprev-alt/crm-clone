# CRM Clone (MTM LeadFlow style)
Repo includes:
- Next.js frontend (simple Kanban)
- Supabase client + example API endpoints
- SQL schema + RLS policies (for Supabase)
- Docker Compose for local Postgres (dev)
- Minimal components and instructions

## Setup (quick)
1. Create a Supabase project.
2. Run SQL in `sql/schema.sql` in Supabase SQL editor.
3. Set env vars in Vercel or .env.local:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (server-side only)
4. Install and run frontend:
   ```bash
   cd crm-clone
   npm install
   npm run dev
   ```
