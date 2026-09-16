import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;
const password = process.env.SUPABASE_PASSWORD || 'aaJKTDVYAMu8DpDk';

const variations = [
  {
    name: 'Pooler 5432 with user postgres.mtkqkzgjaxugtoazcjvv',
    config: {
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 5432,
      user: 'postgres.mtkqkzgjaxugtoazcjvv',
      password,
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Pooler 6543 with user postgres.mtkqkzgjaxugtoazcjvv',
    config: {
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      user: 'postgres.mtkqkzgjaxugtoazcjvv',
      password,
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Pooler 5432 with user postgres',
    config: {
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 5432,
      user: 'postgres',
      password,
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Direct db host 5432 with user postgres',
    config: {
      host: 'db.mtkqkzgjaxugtoazcjvv.supabase.co',
      port: 5432,
      user: 'postgres',
      password,
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    }
  }
];

async function tryAll() {
  for (const v of variations) {
    console.log(`\n--- Trying: ${v.name} ---`);
    const client = new Client(v.config);
    try {
      await client.connect();
      console.log(`✅ SUCCESS! Connected using ${v.name}`);
      const res = await client.query('SELECT current_database(), current_user;');
      console.log('Result:', res.rows[0]);
      await client.end();
      return v.config;
    } catch (e) {
      console.log(`❌ Failed: ${e.message}`);
    }
  }
}

tryAll();
