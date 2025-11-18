/**
 * Example webhook endpoint to accept incoming lead JSON from Meta/Ads.
 * NOTE: Protect with verification token in production.
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const payload = req.body;
  const lead = {
    organization_id: payload.organization_id || null,
    full_name: payload.name || payload.full_name || 'Meta Lead',
    email: payload.email || null,
    phone: payload.phone || null,
    source: 'Meta',
    meta: payload
  };
  try {
    const { error } = await supabase.from('crm.leads').insert([lead]);
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
