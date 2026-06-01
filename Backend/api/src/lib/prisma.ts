import { PrismaClient } from "@prisma/client";
console.log(process.env.DATABASE_URL)

export const prisma = new PrismaClient({
  log: ['query']
})

