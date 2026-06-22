import { prisma } from "../lib/prisma.js"

export const RoomService = {
  async criar(data: any) {
    return prisma.room.create({ data })
  },
  async listarTodas() {
    return prisma.room.findMany()
  },
  async buscarPorId(id: string) {
    return prisma.room.findUnique({ where: { id } })
  },
  async atualizar(id: string, data: any) {
    return prisma.room.update({ where: { id }, data })
  },
  async deletar(id: string) {
    return prisma.room.delete({ where: { id } })
  }
}