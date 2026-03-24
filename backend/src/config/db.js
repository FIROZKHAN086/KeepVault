import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

// Neon DB connection
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5HvCwgKYFk7Q@ep-odd-queen-am6vvv0g-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

// Prisma adapter
const adapter = new PrismaPg(pool);

// Prisma client
const prisma = new PrismaClient({
  adapter,
});

export default prisma;