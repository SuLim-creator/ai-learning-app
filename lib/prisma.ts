import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

function createPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Turso URL이 있으면 원격 DB, 없으면 로컬 SQLite fallback (dev 전용)
  const dbUrl = url ?? `file://${path.resolve(process.cwd(), "dev.db")}`;
  const adapter = new PrismaLibSql(url ? { url, authToken } : { url: dbUrl });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
