import fastify from  'fastify'
import { randomUUID } from 'node:crypto'
const app =fastify()


interface room {
    id: string,
    nome: string,
    capacidade: number
    local: string
    descricao: string
}


const room: room[] = []

app.post('/room', (request, reply) => {
    const { nome, capacidade, local, descricao} = request.body as room

if(!nome || !capacidade || !local || !descricao){
    return reply.status(400).send({message: 'Todos os campos são obrigatórios'})
}

const newroom: room = {
    id: randomUUID(),
    nome,
    capacidade,
    local,
    descricao
}
room.push(newroom)

return reply.status(201).send({message: 'Sala criada com sucesso!', room})
})


app.get('/room', () => {
    return room
})

app.put('/room/:id', (request, reply) => {
    const { id } = request.params as { id: string }
    const { nome, capacidade, local, descricao} = request.body as room

    const roomIndex = room.findIndex(r => r.id === id)
    
    if  (roomIndex === -1) {
        return reply.status(404).send({message: 'Sala não encontrada'})
    }
    if(!nome || !capacidade || !local || !descricao){
        return reply.status(400).send({message: 'Todos os campos são obrigatórios'})
    }

    room[roomIndex] = {
        id,
        nome,
        capacidade,
        local,
        descricao}
    return reply.status(200).send({message: 'Sala atualizada com sucesso!', room: room[roomIndex]})
}

)

app.delete('/room/:id', (request, reply) => {
    const { id } = request.params as room

    const Index = room.findIndex(r => r.id === id)
    if (Index === -1) {
        return reply.status(404).send({message: 'Sala não encontrada'})
    }

    room.splice(Index, 1)
    return reply.status(200).send({message: 'Sala deletada com sucesso!'})


})


app.listen({port: 3333}).then(() =>{console.log('http server running!')})