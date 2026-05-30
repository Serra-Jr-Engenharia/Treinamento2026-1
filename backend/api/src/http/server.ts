import fastify from 'fastify'
import { randomUUID } from 'node:crypto'

const app = fastify()

interface Room {
  id: string
  nome: string
  capacidade: number
  local: string
  descricao: string
}

const rooms: Room[] = []



app.get('/rooms', () => {
    return rooms
})


app.post('/rooms', (request, reply) => {

    const { nome, capacidade, local, descricao } = request.body as Room

    if(!nome || !capacidade || !local || !descricao){
        reply.status(400).send({
            error: 'Todos os campos sao obrigatórios!'   
        })
        return
        
    }

    const room: Room = {
        id: randomUUID(),
        nome,
        capacidade,
        local,
        descricao
    }

    rooms.push(room)

    return reply.status(201).send({
        message: 'Sala criada com sucesso',
        room
    })
})


app.put('/rooms/:id', (request, reply) => {

    const { id } = request.params as { id: string }

    const { nome, capacidade, local, descricao } = request.body as Room

    const roomIndex = rooms.findIndex((room) => room.id === id)

    if(roomIndex < 0){
        reply.status(404).send({
            error: 'Sala não encontrada'
        })

        return
    }

    rooms[roomIndex] = {
        id,
        nome,
        capacidade,
        local,
        descricao
    }

    return reply.status(200).send({
        message: 'Sala atualizada com sucesso',
        room: rooms[roomIndex]
    })
})

app.delete('/rooms/:id', (request, reply) => {

    const { id } = request.params as { id: string }

    const roomIndex = rooms.findIndex((room) => room.id === id)

    if(roomIndex < 0){
        reply.status(404).send({
            error: 'Sala não encontrada'
        })

        return
    }

    rooms.splice(roomIndex, 1)

    return reply.status(200).send({
        message: 'Sala removida com sucesso'
    })
})

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP server running!')
})