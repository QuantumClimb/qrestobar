import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

async function runMigration() {
  const host = 'aws-0-ap-southeast-1.pooler.supabase.com';
  const port = 5432;
  const user = 'postgres.mtkqkzgjaxugtoazcjvv';
  const database = 'postgres';
  const password = process.env.SUPABASE_PASSWORD || 'myJTHbJ5#?xRcsQ';

  console.log(`Connecting to Supabase Session Pooler: ${user}@${host}:${port}/${database}`);

  const client = new Client({
    host,
    port,
    user,
    database,
    password,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully to Supabase Session Pooler!');

    const sqlPath = path.resolve('supabase', 'full_setup.sql');
    console.log('Reading migration script from:', sqlPath);
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('🚀 Executing full_setup.sql (schema + RLS + seed data)...');
    await client.query(sql);

    console.log('🎉 Migration completed successfully!');

    // Verify created tables and counts
    const menuCount = await client.query('SELECT COUNT(*) FROM public.menu_items;');
    const promoCount = await client.query('SELECT COUNT(*) FROM public.promotions;');
    const catCount = await client.query('SELECT COUNT(*) FROM public.menu_categories;');

    console.log(`📊 Verification:`);
    console.log(`  - Categories seeded: ${catCount.rows[0].count}`);
    console.log(`  - Menu Items seeded: ${menuCount.rows[0].count}`);
    console.log(`  - Promotions seeded: ${promoCount.rows[0].count}`);

    await client.end();
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    if (client) {
      try { await client.end(); } catch (_) {}
    }
    process.exit(1);
  }
}

runMigration();
