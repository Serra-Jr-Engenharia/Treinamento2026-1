import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = fastify();
const prisma = new PrismaClient();

server.post('/rooms', async (request, reply) => {
    const { nome, capacidade } = request.body as { nome: string; capacidade: number };

    const newRoom = await prisma.room.create({
        data: { nome, capacidade }
    });

    return reply.status(201).send(newRoom);
});

server.get('/rooms', async (request, reply) => {
    const rooms = await prisma.room.findMany();
    return reply.send(rooms);
});

server.put('/room/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome, capacidade } = request.body as { nome: string; capacidade: number };

    try {
        const updatedRoom = await prisma.room.update({
            where: { id },
            data: { nome, capacidade }
        });
        return reply.send(updatedRoom);
    } catch (error) {
        return reply.status(404).send({ error: 'Sala não encontrada no banco de dados' });
    }
});

server.delete('/room/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
        await prisma.room.delete({
            where: { id }
        });
        return reply.status(204).send();
    } catch (error) {
        return reply.status(404).send({ error: 'Sala não encontrada no banco de dados' });
    }
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});