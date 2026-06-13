import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma.js'
import { roomSchema, roomParamsSchema } from '../schemas/roomSchema.js'

export default async function roomsController(app: FastifyInstance) {

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
}