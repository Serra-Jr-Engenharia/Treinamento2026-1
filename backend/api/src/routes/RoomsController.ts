import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma.js'

export default async function roomsController(app: FastifyInstance) {

  app.get('/rooms', async () => {
    const rooms = await prisma.room.findMany()
    return rooms
  
  })

  app.post('/rooms', async (request, reply) => {
    const { nome, capacidade, local, descricao } = request.body as {
      nome: string
      capacidade: number
      local: string
      descricao: string
    }

    if (!nome || !capacidade || !local || !descricao) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios'})
    }

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
    const { id } = request.params as { id: string }

    const roomExists = await prisma.room.findUnique({ where: { id: Number(id) }})

    if (!roomExists) {
      return reply.status(404).send({ error: 'Sala não encontrada'})
    }

    const { nome, capacidade, local, descricao } = request.body as {
      nome: string
      capacidade: number
      local: string
      descricao: string
    }

    const room = await prisma.room.update({ where: { id: Number(id) },
      data: {
        nome,
        capacidade,
        local,
        descricao
      }
    })

    return reply.send(room)
  })

  app.delete('/rooms/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const roomExists = await prisma.room.findUnique({ where: { id: Number(id) }})

    if (!roomExists) {
      return reply.status(404).send({ error: 'Sala não encontrada'})
    }

    await prisma.room.delete({ where: { id: Number(id) }})

    return reply.send({ message: 'Sala removida com sucesso'})
  })
}