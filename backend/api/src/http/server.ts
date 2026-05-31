import fastify from 'fastify'
import { prisma } from '../lib/prisma.js'

const app = fastify()

interface SalaBody {
    nome: string
    capacidade: number
    local: string
    descricao: string
}

interface SalaParams {
    id: string
}


app.post('/room', async (request, reply) => {
    const { nome, capacidade, local, descricao } = request.body as SalaBody

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({ error: 'Todos os campos são obrigatórios' })
        return
    }

    try {
        const newRoom = await prisma.room.create({
            data: { nome, capacidade, local, descricao }
        })
        reply.status(201).send(newRoom)
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao adicionar sala' })
    }
})

app.get('/room', async (_, reply) => {
    try {
        const salas = await prisma.room.findMany()
        reply.send(salas)
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar salas' })
    }
})

app.put('/room/:id', async (request, reply) => {
    const { id } = request.params as SalaParams
    const { nome, capacidade, local, descricao } = request.body as SalaBody
    const roomId = parseInt(id)

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({ error: 'Todos os campos são obrigatórios' })
        return
    }

    try {
        const updatedSala = await prisma.room.update({
            where: { id: roomId },
            data: { nome, capacidade, local, descricao }
        })
        reply.status(200).send(updatedSala)
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao atualizar sala' })
    }
})

app.delete('/room/:id', async (request, reply) => {
    const { id } = request.params as SalaParams
    const roomId = parseInt(id)

    try {
        await prisma.room.delete({
            where: { id: roomId }
        })
        reply.send({ message: 'Sala removida com sucesso' })
    } catch (error) {
        reply.status(500).send({ error: 'Erro ao remover sala.' })
    }
})

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running on port 3333!')
}).catch((err) => {
    console.error('Server failed to start:', err)
    process.exit(1)
})
