import type { FastifyInstance } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const roomBodySchema = z.object({
  nome: z.string().min(5, "O nome deve ter pelo menos 5 caracteres").max(80),
  capacidade: z.number().int().positive("A capacidade deve ser maior que zero"),
  local: z.string().min(2, "O local deve ser preenchido"),
  descricao: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres")
});

const roomIdParamSchema = z.object({
  id: z.string().uuid("Formato de ID inválido. Deve ser um UUID válido.")
});

export async function roomRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  //  Criar Sala
  server.post('/rooms', {
    onRequest: [server.verifyJwt],
    schema: { body: roomBodySchema }
  }, async (request, reply) => {
    const data = request.body;
    const newRoom = await prisma.room.create({ data });
    return reply.status(201).send(newRoom);
  });

  // Listar Salas
  server.get('/rooms', {
    onRequest: [server.verifyJwt]
  }, async (request, reply) => {
    const rooms = await prisma.room.findMany();
    return reply.send(rooms);
  });

  //  Atualizar Sala
  server.put('/rooms/:id', {
    onRequest: [server.verifyJwt],
    schema: { params: roomIdParamSchema, body: roomBodySchema }
  }, async (request, reply) => {
    const { id } = request.params;
    const data = request.body;

    try {
      const updatedRoom = await prisma.room.update({ where: { id }, data });
      return reply.send(updatedRoom);
    } catch {
      return reply.status(404).send({ message: 'Sala não encontrada.' });
    }
  });

  //  Deletar Sala
  server.delete('/rooms/:id', {
    onRequest: [server.verifyJwt],
    schema: { params: roomIdParamSchema }
  }, async (request, reply) => {
    const { id } = request.params;

    try {
      await prisma.room.delete({ where: { id } });
      return reply.status(204).send();
    } catch {
      return reply.status(404).send({ message: 'Sala não encontrada.' });
    }
  });
}