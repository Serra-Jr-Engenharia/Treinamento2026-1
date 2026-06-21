import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma.ts'
import { salaSchema } from '../Schemas/authsalas.ts'
import { authenticate } from '../middleware/authenticate.ts'

export default async function salaRoutes(
  app: FastifyInstance
) {

  app.post(
    '/salas',
    {
      preHandler: [authenticate]
    },
    async (request, reply) => {

      const dados =
        salaSchema.parse(request.body)

      const sala =
        await prisma.room.create({
          data: dados
        })

      return reply.status(201).send({
        success: true,
        sala
      })
    }
  )

  app.get(
    '/salas',{preHandler:[authenticate]}, async (request, reply) => {

      const salas =
        await prisma.room.findMany()

      return reply.send({
        success: true,
        data: salas
      })
    }
  )

  app.put<{ Params: { id: string } }>('/salas/:id', {preHandler: [authenticate]}, async (request, reply) => {
    try {

        const { id } = request.params

        const dados = salaSchema.parse(request.body)

        const salaExiste = await prisma.room.findUnique({
            where: { id }
        })

        if (!salaExiste) {
            return reply.status(404).send({
                success: false,
                message: 'Sala não encontrada'
            })
        }

        const salaAtualizada = await prisma.room.update({
            where: { id },
            data: dados
        })

        return reply.status(200).send({
            success: true,
            message: 'Sala atualizada com sucesso',
            sala: salaAtualizada
        })

    } catch (error) {

        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                success: false,
                message: 'Dados inválidos',
                errors: error.issues
            })
        }

        return reply.status(500).send({
            success: false,
            message: 'Erro ao atualizar a sala'
        })
    }
})

app.delete<{ Params: { id: string } }>('/salas/:id',{preHandler: [authenticate]}, async (request, reply) => {
    const { id } = request.params

    try {

        const salaExiste = await prisma.room.findUnique({
            where: { id }
        })

        if (!salaExiste) {
            return reply.status(404).send({
                success: false,
                message: 'Sala não encontrada'
            })
        }

        await prisma.room.delete({
            where: { id }
        })

        return reply.status(200).send({
            success: true,
            message: 'Sala deletada com sucesso'
        })

    } catch (error) {

        return reply.status(500).send({
            success: false,
            message: 'Erro ao deletar a sala'
        })
    }
})

}