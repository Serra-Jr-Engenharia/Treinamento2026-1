import fastify from "fastify";
import { randomUUID } from "node:crypto";

const app = fastify()

interface Salas{
    id: string;
    nome: string;
    capacidade: number;
    local: string;
    descricao: string;
}

const salas: Salas[] = []

app.post('/room',(request,reply) => {
    const {nome,capacidade,local,descricao} = request.body as Salas

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({error: 'Todos os campos são obrigatórios!'})
        return
    }

    const sala: Salas = {
        id: randomUUID(),
        nome,
        capacidade,
        local,
        descricao,
    }
    salas.push(sala)

    return reply.status(201).send({message: 'Sala criada com sucesso!'})
})

app.get('/room', () => {
    return salas
})

app.put('/room/:id', (request,reply) => {
    const {id} = request.params as Salas

    const {nome,capacidade,local,descricao} = request.body as Salas

    const salaIndex = salas.findIndex(s => s.id === id)

    if (salaIndex === -1) {
        reply.status(404).send({error: 'A sala não foi encontrada!'})
        return
    }

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({error: 'Todos os campos são obrigatórios!'})
        return
    }

    salas[salaIndex] = {id,nome,capacidade,local,descricao}
    return reply.status(200).send({message: 'Sala atualizada com sucesso!'})
})

app.delete('/room/:id' , (request,reply) => {
    const { id } = request.params as Salas

    const index = salas.findIndex(s => s.id === id)

    if (index === -1) {
        reply.status(404).send({error: 'A sala não foi encontrada!'})
        return
    }

    salas.splice(index, 1)
    return reply.status(200).send({message: 'Sala removida com sucesso!'})
})

app.get('/', () => {
    return 'Hello NLW'
})

app.listen({port: 3333 }).then(() => {
    console.log('HTTP server running!')
})