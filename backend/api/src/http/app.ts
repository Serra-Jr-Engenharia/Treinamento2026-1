import "dotenv/config" 
import fastify, { FastifyError } from "fastify" 
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { z } from "zod"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from "fastify-type-provider-zod"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

const roomBodySchema = z.object({
  nome: z.string().min(5, 'O nome deve ter no mínimo 5 caracteres').max(20, 'O nome deve ter no máximo 20 caracteres'),
  capacidade: z.number().int().min(2, 'A capacidade mínima é de 2 pessoas').max(100, 'A capacidade máxima é de 100 pessoas'),
  local: z.string().min(1, 'O local não pode ser vazio'),
  descricao: z.string().min(1, 'A descrição não pode ser vazia')
})

const roomIdParamSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID válido.')
})

export type Room = z.infer<typeof roomBodySchema>

app.setErrorHandler((error: FastifyError, request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      message: 'Erro de validação nos dados enviados.',
      issues: error.validation.map((issue: any) => ({
        campo: issue.instancePath,
        mensagem: issue.message
      }))
    })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})

// 1. POST /room
app.post('/room', { 
  schema: { body: roomBodySchema } 
}, async (request, reply) => {
  const { nome, capacidade, local, descricao } = request.body 

  const novaRoom = await prisma.room.create({
    data: { nome, capacidade, local, descricao }
  })

  return reply.status(201).send({ message: 'Sala criada com sucesso!', room: novaRoom })
})

// 2. GET /room
app.get('/room', async (request, reply) => {
  const allRooms = await prisma.room.findMany()
  return reply.send(allRooms)
})

// 3. PUT /room/:id
app.put('/room/:id', {
  schema: {
    params: roomIdParamSchema,
    body: roomBodySchema
  }
}, async (request, reply) => {
  const { id } = request.params
  const { nome, capacidade, local, descricao } = request.body 

  try {
    const salaAtualizada = await prisma.room.update({
      where: { id },
      data: { nome, capacidade, local, descricao }
    })
    return reply.send(salaAtualizada)
  } catch (error) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }
})

// 4. DELETE /room/:id
app.delete('/room/:id', {
  schema: { params: roomIdParamSchema }
}, async (request, reply) => {
  const { id } = request.params

  try {
    await prisma.room.delete({ where: { id } })
    return reply.status(200).send({ message: 'Sala removida com sucesso! '})
  } catch (error) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }
})

// EXTRA (GET /room/:id)
app.get('/room/:id', {
  schema: { params: roomIdParamSchema }
}, async (request, reply) => {
  const { id } = request.params

  const room = await prisma.room.findUnique({ where: { id } })

  if (!room) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }

  return reply.send(room)
})