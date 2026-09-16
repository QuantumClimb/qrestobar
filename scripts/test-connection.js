import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

async function testConnection() {
  const password = process.env.SUPABASE_PASSWORD || 'myJTHbJ5#?xRcsQ';
  const host = 'db.mtkqkzgjaxugtoazcjvv.supabase.co';
  
  console.log('Testing direct connection to Supabase PostgreSQL at:', host);
  
  const client = new Client({
    host,
    port: 5432,
    user: 'postgres',
    password,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to Supabase PostgreSQL!');
    const res = await client.query('SELECT version();');
    console.log('PostgreSQL version:', res.rows[0].version);
    await client.end();
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  }
}

testConnection();
