import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import '@fastify/jwt'


declare module 'fastify' {
  interface FastifyInstance {
    verifyJwt: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { sub: string };
  }
}

const createReservationSchema = z.object({
  roomId: z.string().uuid("ID da sala inválido"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
});

const updateReservationSchema = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
});

const reservationParamSchema = z.object({
  id: z.string().uuid("ID de reserva inválido")
});

export async function reservationRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  // Criar Reserva
  server.post('/reservations', {
    onRequest: [server.verifyJwt], 
    schema: { body: createReservationSchema }
  }, async (request, reply) => {
    const { roomId, startTime, endTime } = request.body;
    const userId = request.user.sub;

    if (startTime >= endTime) {
      return reply.status(400).send({ message: "A data de início deve ser anterior à data de término." });
    }

    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        roomId,
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } }
        ]
      }
    });

    if (conflictingReservation) {
      return reply.status(400).send({ message: "A sala já está reservada para este horário." });
    }

    const newReservation = await prisma.reservation.create({
      data: { roomId, userId, startTime, endTime }
    });

    return reply.status(201).send(newReservation);
  });

  // Buscar reservas do usuário
  server.get('/reservations/my', {
    onRequest: [server.verifyJwt]
  }, async (request, reply) => {
    const userId = request.user.sub;
    const userReservations = await prisma.reservation.findMany({
      where: { userId },
      include: { room: true }
    });
    return reply.send(userReservations);
  });

  //  Atualizar Reserva
  server.put('/reservations/:id', {
    onRequest: [server.verifyJwt],
    schema: { params: reservationParamSchema, body: updateReservationSchema }
  }, async (request, reply) => {
    const { id } = request.params;
    const { startTime, endTime } = request.body;
    const userId = request.user.sub;

    const currentReservation = await prisma.reservation.findUnique({ where: { id } });
    if (!currentReservation || currentReservation.userId !== userId) {
      return reply.status(404).send({ message: "Reserva não encontrada ou acesso negado." });
    }

    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        roomId: currentReservation.roomId,
        id: { not: id },
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } }
        ]
      }
    });

    if (conflictingReservation) {
      return reply.status(400).send({ message: "Conflito! A sala já está ocupada neste período." });
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { startTime, endTime }
    });
    return reply.send(updatedReservation);
  });

  //  Cancelar Reserva
  server.delete('/reservations/:id', {
    onRequest: [server.verifyJwt],
    schema: { params: reservationParamSchema }
  }, async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.sub;

    const currentReservation = await prisma.reservation.findUnique({ where: { id } });
    if (!currentReservation || currentReservation.userId !== userId) {
      return reply.status(404).send({ message: "Reserva não encontrada ou acesso negado." });
    }

    await prisma.reservation.delete({ where: { id } });
    return reply.status(204).send();
  });
}