import { type FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma.js'

interface Room {
  id: string
  nome: string
  capacidade: number
  local: string
  descricao: string
}

export default async function roomsController(app: FastifyInstance) {

  app.post('/room', async (request, reply) => {
    const { nome, capacidade, local, descricao } = request.body as Room

    if (!nome || !capacidade || !local || !descricao) {
      return reply.status(400).send({
        error: 'Todos os campos são obrigatorios.'
      })
    }

    try {
      const novaSala = await prisma.room.create({
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      })

      return reply.status(201).send(novaSala)
    } catch (error) {
      return reply.status(500).send({
        error: 'Erro ao adicionar sala.'
      })
    }
  })

  app.get('/room', async (_, reply) => {
    
    try {
      const rooms = await prisma.room.findMany()
      reply.send(rooms)
    }catch (error) {
       reply.status(500).send({error: 'Erro ao buscar sala.'})
    }
})

  app.put('/room/:id', async (request, reply) => {
    const { id } = request.params as Room


    const { nome, capacidade, local, descricao } = request.body as Room

    
    const roomId = parseInt(id)

    if (!nome || !capacidade || !local || !descricao) {
      return reply.status(400).send({
        error: 'Todos os campos são obrigatorios.'
      })
    }

    try {
      const salaAtt = await prisma.room.update({
        where: { id: roomId },
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      })

      return reply.status(200).send(salaAtt)
    } catch (error) {
      return reply.status(500).send({error: 'Erro ao Atualizar sala.'})
    }
  })

  app.delete('/room/:id', async (request, reply) => {
    const { id } = request.params as Room
    const roomId = parseInt(id)

    try {
      await prisma.room.delete({
        where: {id: roomId}
      })

      return reply.status(200).send({message: 'Sala removida com sucesso!'})
    } catch (error) {
      return reply.status(500).send({error: 'Erro ao remover livro.'})
    }
  })

}