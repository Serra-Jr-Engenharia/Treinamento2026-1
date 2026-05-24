import fastify from "fastify"
import { randomUUID } from "node:crypto"

export const app = fastify()

interface room {
  id: string
  nome: string
  capacidade: number
  local: string
  descricao: string
}

const rooms: room[] = []

// 1. POST /room
app.post('/room', async (request, reply) => {
  
  const { nome, capacidade, local, descricao } = request.body as Omit<room, 'id'>

  if (!nome || !capacidade || !local || !descricao) {
    reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
    return
  }
  
  const novaRoom: room = {
    id: randomUUID(),
    nome,
    capacidade,
    local,
    descricao,
  }

  rooms.push(novaRoom)
  return reply.status(201).send({ message: 'Sala criada com sucesso!', room: novaRoom })
})

//2. GET /room
app.get('/room', async (request, reply) => {
  return reply.send(rooms)
});

// 3. PUT /room/:id
app.put('/room/:id', async (request, reply) => {

  const { id } = request.params as { id: string }

  const { nome, capacidade, local, descricao } = request.body as Omit<room, 'id'>

  const roomIndex = rooms.findIndex((room) => room.id === id)

  if (roomIndex === -1) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }

  if (!nome || !capacidade || !local || !descricao) {
    reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
    return
  }

  rooms[roomIndex] = { id, nome, capacidade, local, descricao }
  return reply.send(rooms[roomIndex])
});

// 4. DELETE /room/:id
app.delete('/room/:id', async (request, reply) => {
  const { id } = request.params as { id: string }

  const roomIndex = rooms.findIndex((room) => room.id === id)

  if (roomIndex === -1) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }

  rooms.splice(roomIndex, 1) 
  return reply.status(200).send({ message: 'Sala removida com sucesso! '})
})

//EXTRA (GET /room/:id)
app.get('/room/:id', async (request, reply) => {

  const { id } = request.params as { id: string }

  const room = rooms.find((room) => room.id === id)

  if (!room) {
    return reply.status(404).send({ error: 'Sala não encontrada.' })
  }

  return reply.send(room)
});

