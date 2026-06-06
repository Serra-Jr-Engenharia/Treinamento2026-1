import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z, ZodError } from 'zod';

const server = fastify();
const prisma = new PrismaClient();

server.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Erro de validação nos dados enviados.',
            detalhes: error.format()
        });
    }

    console.error(error);
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
});


const roomBodySchema = z.object({
    nome: z.string().min(5, "O nome deve ter no mínimo 5 caracteres").max(20, "O nome deve ter no máximo 20 caracteres"),
    capacidade: z.number().int().positive("A capacidade deve ser maior que zero"),
    local: z.string().min(2, "O local é obrigatório"),
    descricao: z.string().min(5, "A descrição deve ter no mínimo 5 caracteres")
});

const roomIdParamSchema = z.object({
    id: z.string().uuid("Formato de ID inválido")
});


server.post('/rooms', async (request, reply) => {
    
    const data = roomBodySchema.parse(request.body);

    const newRoom = await prisma.room.create({
        data: {
            nome: data.nome,
            capacidade: data.capacidade,
            local: data.local,
            descricao: data.descricao
        }
    });

    return reply.status(201).send(newRoom);
});

server.get('/rooms', async (request, reply) => {
    const rooms = await prisma.room.findMany();
    return reply.send(rooms);
});

server.put('/rooms/:id', async (request, reply) => {
    const { id } = roomIdParamSchema.parse(request.params);
    const data = roomBodySchema.parse(request.body);

    try {
        const updatedRoom = await prisma.room.update({
            where: { id },
            data: {
                nome: data.nome,
                capacidade: data.capacidade,
                local: data.local,
                descricao: data.descricao
            }
        });
        return reply.send(updatedRoom);
    } catch (error) {
        return reply.status(404).send({ message: 'Sala não encontrada para atualização.' });
    }
});


server.delete('/rooms/:id', async (request, reply) => {
    const { id } = roomIdParamSchema.parse(request.params);

    try {
        await prisma.room.delete({
            where: { id }
        });
        return reply.status(204).send();
    } catch (error) {
        return reply.status(404).send({ message: 'Sala não encontrada para exclusão.' });
    }
});


server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando e validando dados em ${address}`);
});