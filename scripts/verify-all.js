import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

async function testAllTables() {
  console.log('Testing public anon access (same as website frontend)...');
  const supabase = createClient(supabaseUrl, anonKey);

  const [categories, menu, promos, settings] = await Promise.all([
    supabase.from('menu_categories').select('*'),
    supabase.from('menu_items').select('*'),
    supabase.from('promotions').select('*'),
    supabase.from('restaurant_settings').select('*')
  ]);

  console.log('✅ Categories fetched (anon):', categories.data?.length);
  console.log('✅ Menu items fetched (anon):', menu.data?.length);
  console.log('✅ Promotions fetched (anon):', promos.data?.length);
  console.log('✅ Settings fetched (anon):', settings.data?.[0]?.name);

  // Test inserting a reservation via public anon
  console.log('\nTesting public table reservation insert...');
  const testRes = {
    reference_number: `QRESTO-${Math.floor(10000 + Math.random() * 90000)}`,
    full_name: 'Antigravity Verification Test',
    email: 'test@quantumclimb.com',
    phone: '+60 11-1234 5678',
    date: '2026-09-20',
    time: '19:30',
    guest_count: 4,
    seating_preference: 'indoor',
    occasion: 'celebration',
    special_requests: 'Verification test booking from migration suite',
    consent: true,
    status: 'new'
  };

  const { data: resData, error: resError } = await supabase
    .from('reservations')
    .insert([testRes])
    .select()
    .single();

  if (resError) {
    console.error('❌ Reservation insert failed:', resError);
  } else {
    console.log('✅ Reservation inserted successfully:', resData.reference_number, resData.full_name);
  }
}

testAllTables();
