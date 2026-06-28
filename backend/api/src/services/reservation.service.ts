import { prisma } from "../lib/prisma.js"

export const ReservationService = {

  async criar(userId: string, roomId: string, inicioStr: string, fimStr: string) {
    const inicio = new Date(inicioStr)
    const fim = new Date(fimStr)

    const duracao = Math.round((fim.getTime() - inicio.getTime()) / 60000)

    if (duracao <= 0) {
      throw new Error("O horário de fim deve ser posterior ao horário de início.")
    }

    const conflito = await prisma.reservation.findFirst({
      where: { 
        roomId,
        AND: [
          { inicio: { lt: fim } },
          { fim: { gt: inicio } }
        ]
      }
    })

    if (conflito) throw new Error("Esta sala já está reservada para este período.")

    return prisma.reservation.create({
      data: { userId, roomId, inicio, fim, duracao }
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

  async alterar(id: string, userId: string, novoInicioStr: string, novoFimStr: string) {
    const reserva = await prisma.reservation.findUnique({ where: { id } })
    
    if (!reserva) throw new Error("Reserva não encontrada.")
    if (reserva.userId !== userId) throw new Error("Acesso negado.")

    const inicio = new Date(novoInicioStr)
    const fim = new Date(novoFimStr)
    const duracao = Math.round((fim.getTime() - inicio.getTime()) / 60000)

    if (duracao <= 0) {
      throw new Error("O horário de fim deve ser posterior ao horário de início.")
    }

    const conflito = await prisma.reservation.findFirst({
      where: { 
        roomId: reserva.roomId,
        id: { not: id },
        AND: [
          { inicio: { lt: fim } },
          { fim: { gt: inicio } }
        ]
      }
    })

    if (conflito) throw new Error("A sala já possui outra reserva neste novo horário.")

    return prisma.reservation.update({
      where: { id },
      data: { inicio, fim, duracao }
    })
  }
}