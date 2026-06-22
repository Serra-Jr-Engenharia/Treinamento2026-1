import { prisma } from "../lib/prisma.js"

export const ReservationService = {

  async criar(userId: string, roomId: string, dataHoraStr: string) {
    const dataHora = new Date(dataHoraStr)

    const conflito = await prisma.reservation.findFirst({
      where: { roomId, dataHora }
    })

    if (conflito) throw new Error("Esta sala já está reservada para este dia e horário.")

    return prisma.reservation.create({
      data: { userId, roomId, dataHora }
    })
  },

  async buscarPorUsuario(userId: string) {
    return prisma.reservation.findMany({
      where: { userId },
      include: { room: true } 
    })
  },

  async cancelar(id: string, userId: string) {
    const reserva = await prisma.reservation.findUnique({ where: { id } })
    
    if (!reserva) throw new Error("Reserva não encontrada.")
    if (reserva.userId !== userId) throw new Error("Acesso negado. A reserva pertence a outro usuário.")

    return prisma.reservation.delete({ where: { id } })
  },

  async alterar(id: string, userId: string, novaDataHoraStr: string) {
    const reserva = await prisma.reservation.findUnique({ where: { id } })
    
    if (!reserva) throw new Error("Reserva não encontrada.")
    if (reserva.userId !== userId) throw new Error("Acesso negado.")

    const novaDataHora = new Date(novaDataHoraStr)
    
    const conflito = await prisma.reservation.findFirst({
      where: { roomId: reserva.roomId, dataHora: novaDataHora }
    })

    if (conflito) throw new Error("A sala já possui outra reserva neste novo horário.")

    return prisma.reservation.update({
      where: { id },
      data: { dataHora: novaDataHora }
    })
  }
}