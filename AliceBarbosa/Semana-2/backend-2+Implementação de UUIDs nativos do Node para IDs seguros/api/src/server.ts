import fastify from 'fastify';
import { randomUUID } from 'node:crypto';

const server = fastify();

interface Room {
    id: string;
    nome: string;
    capacidade: number;
}

let rooms: Room[] = [];

server.post('/rooms', async (request, reply) => {
    const { nome, capacidade } = request.body as { nome: string; capacidade: number };

    const newRoom: Room = {
        id: randomUUID(),
        nome,
        capacidade
    };

    rooms.push(newRoom);
    return reply.status(201).send(newRoom);
});

server.get('/rooms', async (request, reply) => {
    return reply.send(rooms);
});

server.put('/room/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome, capacidade } = request.body as { nome: string; capacidade: number };

    const roomIndex = rooms.findIndex(room => room.id === id);

    if (roomIndex === -1) {
        return reply.status(404).send({ error: 'Sala não encontrada' });
    }

    const room = rooms[roomIndex];
    if (!room) {
        return reply.status(404).send({ error: 'Sala não encontrada' });
    }
    room.nome = nome;
    room.capacidade = capacidade;
    return reply.send(room);
});

server.delete('/room/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const roomIndex = rooms.findIndex(room => room.id === id);

    if (roomIndex === -1) {
        return reply.status(404).send({ error: 'Sala não encontrada' });
    }

    rooms.splice(roomIndex, 1);
    return reply.status(204).send();
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});