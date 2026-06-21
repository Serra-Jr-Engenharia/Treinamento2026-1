import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma.ts'
import { reservaSchema } from '../Schemas/authreserva.ts'
import { authenticate } from '../middleware/authenticate.ts'

export default async function reservaRoutes(
  app: FastifyInstance
) {

  app.post(
    '/reservas',
    { preHandler: [authenticate] },
    async (request, reply) => {

      const userId = request.user.sub

      const dados = reservaSchema.parse(request.body)

      const sala = await prisma.room.findUnique({
        where: {
          id: dados.roomId
        }
      })

      if (!sala) {
        return reply.status(404).send({
          success: false,
          message: 'Sala não encontrada'
        })
      }

      const conflito = await prisma.reserva.findFirst({
        where: {
          roomId: dados.roomId,
          data: dados.date
        }
      })

      if (conflito) {
        return reply.status(400).send({
          success: false,
          message: 'Sala já reservada nesse horário'
        })
      }

      const reserva = await prisma.reserva.create({
        data: {
          roomId: dados.roomId,
          data: dados.date,
          userId
        }
      })

      return reply.status(201).send({
        success: true,
        reserva
      })
    }
  )

  app.get(
    '/reservas',
    { preHandler: [authenticate] },
    async (request, reply) => {

      const userId = request.user.sub

      const reservas = await prisma.reserva.findMany({
        where: {
          userId
        },
        include: {
          room: true
        }
      })

      return reply.send({
        success: true,
        data: reservas
      })
    }
  )

  app.put<{ Params: { id: string } }>(
    '/reservas/:id',
    { preHandler: [authenticate] },
    async (request, reply) => {

      const { id } = request.params

      const userId = request.user.sub

      const dados = reservaSchema.parse(request.body)

      const reserva = await prisma.reserva.findFirst({
        where: {
          id,
          userId
        }
      })

      if (!reserva) {
        return reply.status(404).send({
          success: false,
          message: 'Reserva não encontrada'
        })
      }

      const sala = await prisma.room.findUnique({
        where: {
          id: dados.roomId
        }
      })

      if (!sala) {
        return reply.status(404).send({
          success: false,
          message: 'Sala não encontrada'
        })
      }

      const conflito = await prisma.reserva.findFirst({
        where: {
          roomId: dados.roomId,
          data: dados.date,
          NOT: {
            id
          }
        }
      })

      if (conflito) {
        return reply.status(400).send({
          success: false,
          message: 'Sala já reservada nesse horário'
        })
      }

      const reservaAtualizada = await prisma.reserva.update({
        where: {
          id
        },
        data: {
          roomId: dados.roomId,
          data: dados.date
        }
      })

      return reply.send({
        success: true,
        reserva: reservaAtualizada
      })
    }
  )

  app.delete<{ Params: { id: string } }>(
    '/reservas/:id',
    { preHandler: [authenticate] },
    async (request, reply) => {

      const { id } = request.params

      const userId = request.user.sub

      const reserva = await prisma.reserva.findFirst({
        where: {
          id,
          userId
        }
      })

      if (!reserva) {
        return reply.status(404).send({
          success: false,
          message: 'Reserva não encontrada'
        })
      }

      await prisma.reserva.delete({
        where: {
          id
        }
      })

      return reply.send({
        success: true,
        message: 'Reserva cancelada com sucesso'
      })
    }
  )
}