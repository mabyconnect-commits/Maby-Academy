import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";

/**
 * A single PrismaClient per process. Next dev reloads modules on every edit,
 * so without the global cache we would exhaust the connection pool.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Taken from the validated config rather than read from process.env by
    // Prisma itself, so setup mode can supply a placeholder without writing
    // to the environment.
    datasourceUrl: env.DATABASE_URL,
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
