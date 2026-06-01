import "dotenv/config" 
import fastify from "fastify";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const app = fastify()

const url = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1)
});

const prisma = new PrismaClient({
  adapter
});


interface SalaBody {
    nome: string;
    capacidade: number;
    local: string;
    descricao: string;
}

interface SalaParams {
    id: string;
}

app.post('/room', async (request, reply) => {
    const { nome, capacidade, local, descricao } = request.body as SalaBody

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({ error: 'Todos os campos são obrigatórios!' })
        return
    }

    await prisma.room.create({
        data: { nome, capacidade, local, descricao }
    })

    return reply.status(201).send({ message: 'Sala criada com sucesso!' })
})

app.get('/room', async () => {
    const salas = await prisma.room.findMany()
    return salas
})

app.put('/room/:id', async (request, reply) => {
    const { id } = request.params as SalaParams
    const { nome, capacidade, local, descricao } = request.body as SalaBody

    const sala = await prisma.room.findUnique({
        where: { id: Number(id) }
    })

    if (!sala) {
        reply.status(404).send({ error: 'A sala não foi encontrada!' })
        return
    }

    if (!nome || !capacidade || !local || !descricao) {
        reply.status(400).send({ error: 'Todos os campos são obrigatórios!' })
        return
    }

    await prisma.room.update({
        where: { id: Number(id) },
        data: { nome, capacidade, local, descricao }
    })

    return reply.status(200).send({ message: 'Sala atualizada com sucesso!' })
})

app.delete('/room/:id', async (request, reply) => {
    const { id } = request.params as SalaParams

    const sala = await prisma.room.findUnique({
        where: { id: Number(id) }
    })

    if (!sala) {
        reply.status(404).send({ error: 'A sala não foi encontrada!' })
        return
    }

    await prisma.room.delete({
        where: { id: Number(id) }
    })

    return reply.status(200).send({ message: 'Sala removida com sucesso!' })
})

app.get('/', () => {
    return 'Hello NLW'
})

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})
