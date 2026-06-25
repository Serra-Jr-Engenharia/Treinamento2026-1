import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma.js'
import { roomSchema, roomParamsSchema } from '../schemas/roomSchema.js'
import {
  createReservationSchema,
  reservationParamsSchema,
  updateReservationSchema
} from '../schemas/reservationSchema.js'
import { verifyJwt } from '../hooks/auth.js'

export default async function roomsController(
  app: FastifyInstance
) {
  app.addHook('onRequest', verifyJwt)


  app.get('/rooms', async () => {
    const rooms = await prisma.room.findMany()

    return rooms
  })

  app.post('/rooms', async (request, reply) => {
    const { nome, capacidade, local, descricao } =
      roomSchema.parse(request.body)

    const room = await prisma.room.create({
      data: {
        nome,
        capacidade,
        local,
        descricao
      }
    })

    return reply.status(201).send(room)
  })

  app.put('/rooms/:id', async (request, reply) => {
    const { id } = roomParamsSchema.parse(request.params)

    const roomExists = await prisma.room.findUnique({
      where: { id }
    })

    if (!roomExists) {
      return reply.status(404).send({
        error: 'Sala não encontrada'
      })
    }

    const { nome, capacidade, local, descricao } =
      roomSchema.parse(request.body)

    const room = await prisma.room.update({
      where: { id },
      data: {
        nome,
        capacidade,
        local,
        descricao
      }
    })

    return room
  })

  app.delete('/rooms/:id', async (request, reply) => {
    const { id } = roomParamsSchema.parse(request.params)

    const roomExists = await prisma.room.findUnique({
      where: { id }
    })

    if (!roomExists) {
      return reply.status(404).send({
        error: 'Sala não encontrada'
      })
    }

    await prisma.room.delete({
      where: { id }
    })

    return {
      message: 'Sala removida com sucesso'
    }
  })

  app.post('/reservations', async (request, reply) => {
    const payload = request.user as {
      id: number
      email: string
    }

    const { roomId, data } =
      createReservationSchema.parse(request.body)

    const roomExists = await prisma.room.findUnique({
      where: { id: roomId }
    })

    if (!roomExists) {
      return reply.status(404).send({
        error: 'Sala não encontrada'
      })
    }

    const conflict =
      await prisma.reservation.findFirst({
        where: {
          roomId,
          data: new Date(data)
        }
      })

    if (conflict) {
      return reply.status(400).send({
        error: 'Já existe reserva nesse horário'
      })
    }

    const reservation =
      await prisma.reservation.create({
        data: {
          roomId,
          userId: payload.id,
          data: new Date(data)
        }
      })

    return reply.status(201).send(reservation)
  })

  app.get('/reservations', async (request) => {
    const payload = request.user as {
      id: number
      email: string
    }

    const reservations =
      await prisma.reservation.findMany({
        where: {
          userId: payload.id
        },
        include: {
          room: true
        }
      })

    return reservations
  })

  app.put('/reservations/:id', async (request, reply) => {
    const { id } =
      reservationParamsSchema.parse(request.params)

    const { data } =
      updateReservationSchema.parse(request.body)

    const reservation =
      await prisma.reservation.findUnique({
        where: { id }
      })

    if (!reservation) {
      return reply.status(404).send({
        error: 'Reserva não encontrada'
      })
    }

    const conflict =
      await prisma.reservation.findFirst({
        where: {
          roomId: reservation.roomId,
          data: new Date(data),
          NOT: {
            id
          }
        }
      })

    if (conflict) {
      return reply.status(400).send({
        error: 'Já existe reserva nesse horário'
      })
    }

    const updated =
      await prisma.reservation.update({
        where: { id },
        data: {
          data: new Date(data)
        }
      })

    return updated
  })

  app.delete(
    '/reservations/:id',
    async (request, reply) => {
      const { id } =
        reservationParamsSchema.parse(
          request.params
        )

      const reservation =
        await prisma.reservation.findUnique({
          where: { id }
        })

      if (!reservation) {
        return reply.status(404).send({
          error: 'Reserva não encontrada'
        })
      }

      await prisma.reservation.delete({
        where: { id }
      })

      return {
        message: 'Reserva cancelada com sucesso'
      }
    }
  )
}