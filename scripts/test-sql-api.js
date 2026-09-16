import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testSqlApi() {
  const url = `${process.env.SUPABASE_URL}/rest/v1/rpc`;
  const key = process.env.SUPABASE_SECRETKEY;

  console.log('Testing SQL execution via API with Service Key...');
  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/pg/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({ query: 'SELECT 1;' })
    });
    console.log('Status:', res.status);
    const body = await res.text();
    console.log('Body:', body);
  } catch (e) {
    console.log('Error:', e.message);
  }
}

testSqlApi();
