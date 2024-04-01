import { neon } from '@neondatabase/serverless';

const db = neon(process.env.DATABASE_URI);

export default db;