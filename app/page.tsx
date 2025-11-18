import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // ou '../../lib/supabaseClient' selon ton path

export async function GET() {
  const { data, error } = await supabase
    .from('leads', { schema: 'crm' })
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
