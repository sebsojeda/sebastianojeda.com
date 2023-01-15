import { PrismaClient } from "@prisma/client";

/** @type {import("@prisma/client").PrismaClient} */
let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  /** @type {globalThis & {prisma: import("@prisma/client").PrismaClient}} */
  // @ts-ignore
  let globalWithPrisma = global;
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
