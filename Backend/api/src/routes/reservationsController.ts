import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import z from "zod";

export const reservationsController: FastifyPluginAsyncZod = async (app) => {

  const authenticate = async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({
        error: "Não autorizado."
      });
    }
  };

  // Criar reserva
  app.post("/reservation", {
    preHandler: [authenticate],
    schema: {
      body: z.object({
        roomId: z.number(),
        userId: z.number(),
        date: z.string()
      })
    }
  }, async (request, reply) => {

    const { roomId, userId, date } = request.body;

    try {

      const reservationExists = await prisma.reservation.findFirst({
        where: {
          roomId,
          date: new Date(date)
        }
      });

      if (reservationExists) {
        return reply.status(400).send({
          error: "Esta sala já está reservada neste horário."
        });
      }

      const reservation = await prisma.reservation.create({
        data: {
          roomId,
          userId,
          date: new Date(date)
        }
      });

      return reply.status(201).send(reservation);

    } catch {

      return reply.status(500).send({
        error: "Erro ao criar reserva."
      });

    }

  });

  // Buscar reservas do usuário
  app.get("/reservation/user/:id", {
    preHandler: [authenticate],
    schema: {
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {

    const userId = Number(request.params.id);

    try {

      const reservations = await prisma.reservation.findMany({
        where: {
          userId
        },
        include: {
          room: true
        }
      });

      return reply.send(reservations);

    } catch {

      return reply.status(500).send({
        error: "Erro ao buscar reservas."
      });

    }

  });

  // Atualizar reserva
  app.put("/reservation/:id", {
    preHandler: [authenticate],
    schema: {
      params: z.object({
        id: z.string()
      }),
      body: z.object({
        date: z.string()
      })
    }
  }, async (request, reply) => {

    const reservationId = Number(request.params.id);
    const { date } = request.body;

    try {

      const reservation = await prisma.reservation.findUnique({
        where: {
          id: reservationId
        }
      });

      if (!reservation) {
        return reply.status(404).send({
          error: "Reserva não encontrada."
        });
      }

      const conflict = await prisma.reservation.findFirst({
        where: {
          roomId: reservation.roomId,
          date: new Date(date),
          NOT: {
            id: reservationId
          }
        }
      });

      if (conflict) {
        return reply.status(400).send({
          error: "Já existe outra reserva neste horário."
        });
      }

      const updated = await prisma.reservation.update({
        where: {
          id: reservationId
        },
        data: {
          date: new Date(date)
        }
      });

      return reply.send(updated);

    } catch {

      return reply.status(500).send({
        error: "Erro ao atualizar reserva."
      });

    }

  });

  // Cancelar reserva
  app.delete("/reservation/:id", {
    preHandler: [authenticate],
    schema: {
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {

    const reservationId = Number(request.params.id);

    try {

      await prisma.reservation.delete({
        where: {
          id: reservationId
        }
      });

      return reply.send({
        message: "Reserva cancelada."
      });

    } catch {

      return reply.status(500).send({
        error: "Erro ao cancelar reserva."
      });

    }

  });

};