import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const method = req.method;
  if (method === 'GET') {
    const { data, error } = await supabase.from('crm.leads').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }
  res.status(405).json({ error: 'Method not allowed' });
}
