import fastify from 'fastify';
import { randomUUID } from 'crypto';

const app = fastify();

interface Rooms {
    id: string
    name: string
    size: number
    owner: string
}

// Rotas:
// GET /room - Retorna todas as salas
// POST /room - Cria uma nova sala
// DELETE /room/:id - Deleta uma sala específica pelo ID
// PUT /room/:id - Atualiza uma sala específica pelo ID (substituição completa)
// PATCH /room/:id - Atualiza uma sala específica pelo ID (atualização parcial)

const rooms: Rooms[] = [];

app.post('/room', (request, reply) => {
    const {name, size, owner} = request.body as Rooms
    
    if (!name || !size || !owner) {
        reply.status(400).send({error: 'Todos os campos são obrigatórios'})
        return
    }

    const room: Rooms = {
        id: randomUUID(),
        name,
        size,
        owner
    }
    rooms.push(room)
    return reply.status(201).send({message: 'Sala criada com sucesso'})

})

app.get('/room', () => {
    return rooms
})

app.delete('/room/:id', (request, reply) => {
    const {id} = request.params as {id: string}
    const roomIndex = rooms.findIndex(r => r.id === id)
    if (roomIndex === -1) {
        reply.status(404).send({error: 'Sala não encontrada'})
        return
    }
    rooms.splice(roomIndex, 1)
    return reply.status(200).send({message: "Sala deletada com sucesso"})
})

app.put('/room/:id', (request, reply) => {
    const {id} = request.params as {id: string}
    const {name, size, owner}   = request.body as Rooms
    const roomIndex = rooms.findIndex(r => r.id === id)
    if (roomIndex === -1) {
        reply.status(404).send({error: 'Sala não encontrada'})
        return
    }
    if (!name || !size || !owner) {
        reply.status(400).send({error: 'Todos os campos são obrigatórios'})
        return
    }
    rooms[roomIndex] = {id, name, size, owner}
    return reply.status(200).send({message: 'Sala atualizada com sucesso'})
})

app.patch('/room/:id', (request, reply) => {
    const {id} = request.params as {id: string}
    const {name, size, owner} = request.body as Partial<Rooms>
    const roomIndex = rooms.findIndex(r => r.id === id)
    if (roomIndex === -1) {
        reply.status(404).send({error: 'Sala não encontrada'})
        return
    }
    const room = rooms[roomIndex]
    rooms[roomIndex] = {
        id,
        name: name ?? room!.name,
        size: size ?? room!.size,
        owner: owner ?? room!.owner
    }
    return reply.status(200).send({message: 'Sala atualizada com sucesso'})
})

app.listen( {port: 3000}).then(() => {
    console.log('Servidor Funcionando na porta 3000')
})

app.get('/', () => {

})