import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

// Configura a conexão com o seu MariaDB usando a URL do .env
const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)

// Cria a conexão (o Prisma Client) e exporta para o projeto inteiro poder usar
export const prisma = new PrismaClient({ adapter })