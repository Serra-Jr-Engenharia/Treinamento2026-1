import { prisma } from "../lib/prisma.js"
import { Prisma } from "@prisma/client" 
export const RoomService = {
  async criar(data: Prisma.RoomCreateInput) { 
    return prisma.room.create({ data })
  },
  async listarTodas() {
    return prisma.room.findMany()
  },
  async buscarPorId(id: string) {
    return prisma.room.findUnique({ where: { id } })
  },
  async atualizar(id: string, data: Prisma.RoomUpdateInput) { 
  },
  async deletar(id: string) {
    return prisma.room.delete({ where: { id } })
  }
}