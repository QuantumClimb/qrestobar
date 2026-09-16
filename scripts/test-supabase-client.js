import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || 'https://mtkqkzgjaxugtoazcjvv.supabase.co';
const serviceKey = process.env.SUPABASE_SECRETKEY || '';
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';

console.log('Testing Supabase Client connection to:', supabaseUrl);

async function testClient() {
  const keyToUse = serviceKey || anonKey;
  console.log('Using Key starting with:', keyToUse.slice(0, 15) + '...');
  
  const supabase = createClient(supabaseUrl, keyToUse, {
    auth: { persistSession: false }
  });

  try {
    // Test querying tables
    const { data, error } = await supabase.from('menu_items').select('*').limit(1);
    if (error) {
      console.log('Response (expected if table not created yet):', error.message);
      console.log('Error details:', error);
    } else {
      console.log('✅ Connected! Data from menu_items:', data);
    }
  } catch (err) {
    console.error('Client exception:', err);
  }
}

testClient();
