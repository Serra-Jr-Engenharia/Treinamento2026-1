import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

interface Room {
  id: string;
  nome: string;
  capacidade: number;
  local: string;
  descricao: string;
}

let rooms: Room[] = [];

fastify.get('/room', async (request, reply) => {
  return rooms;
})

interface CreateRoomBody {
  nome: string;
  capacidade: number;
  local: string;
  descricao: string;
}

fastify.post<{ Body: CreateRoomBody }>('/room', async (request, reply) => {
  const { nome, capacidade, local, descricao } = request.body;
  
  if (!nome || !capacidade || !local || !descricao) {
    return reply.status(400).send({ error: 'Missing required fields' });
  }

  const id = Date.now().toString();
  const newRoom: Room = { id, nome, capacidade, local, descricao };
  
  rooms.push(newRoom);
  return reply.status(201).send(newRoom);
})

interface UpdateRoomBody {
  nome?: string;
  capacidade?: number;
  local?: string;
  descricao?: string;
}

interface RoomParams {
  id: string;
}

fastify.put<{ Params: RoomParams, Body: UpdateRoomBody }>('/room/:id', async (request, reply) => {
  const { id } = request.params;
  const index = rooms.findIndex(r => r.id === id);
  
  if (index === -1) {
    return reply.status(404).send({ error: 'Room not found' });
  }
  
  const { nome, capacidade, local, descricao } = request.body;
  
  rooms[index] = {
    ...rooms[index],
    ...(nome && { nome }),
    ...(capacidade && { capacidade }),
    ...(local && { local }),
    ...(descricao && { descricao })
  };
  
  return rooms[index];
})

fastify.delete<{ Params: RoomParams }>('/room/:id', async (request, reply) => {
  const { id } = request.params;
  const index = rooms.findIndex(r => r.id === id);
  
  if (index === -1) {
    return reply.status(404).send({ error: 'Room not found' });
  }
  
  rooms.splice(index, 1);
  return reply.status(204).send();
})

const start = async () => {
  try {
    await fastify.listen({ port: 3333 })
    console.log('Servidor rodando em http://localhost:3333')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
