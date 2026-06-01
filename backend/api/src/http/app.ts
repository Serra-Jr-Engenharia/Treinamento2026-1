import "dotenv/config" 
import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

export const app = fastify()

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

// 1. POST /room
app.post('/room', async (request, reply) => {
  const { nome, capacidade, local, descricao } = request.body as any

  if (!nome || !capacidade || !local || !descricao) {
    reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
    return
  }
  
  
  const novaRoom = await prisma.room.create({
    data: {
      nome,
      capacidade,
      local,
      descricao
    }
  })

  return reply.status(201).send({ message: 'Sala criada com sucesso!', room: novaRoom })
})

// 2. GET /room
app.get('/room', async (request, reply) => {
 
  const allRooms = await prisma.room.findMany()
  
  return reply.send(allRooms)
})

// 3. PUT /room/:id
app.put('/room/:id', async (request, reply) => {
  const { id } = request.params as { id: string }
  const { nome, capacidade, local, descricao } = request.body as any

  if (!nome || !capacidade || !local || !descricao) {
    reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
    return
  }

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
app.delete('/room/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  try {
    
    await prisma.room.delete({
      where: { id }
    })
    return reply.status(200).send({ message: 'Sala removida com sucesso! '})
  } catch (error) {
    
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }
})

// EXTRA (GET /room/:id)
app.get('/room/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  
  const room = await prisma.room.findUnique({
    where: { id }
  })

  if (!room) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }

  return reply.send(room)
})


