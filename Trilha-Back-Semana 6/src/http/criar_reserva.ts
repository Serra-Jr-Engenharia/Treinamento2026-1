import { z } from "zod";
import { prisma } from "./lib/prisma.js";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const criarReserva: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/reservation",
    {
      schema: {
        body: z.object({
          userId: z.number(),
          roomId: z.number(),
          date: z.string(),
        }),
        response: {
          201: z.object({
            id: z.number(),
            userId: z.number(),
            roomId: z.number(),
            date: z.date(),
            createdAt: z.date(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId, roomId, date } = request.body;

      try {
        const conflito = await prisma.reservation.findFirst({
          where: {
            roomId,
            date: new Date(date),
          },
        });

        if (conflito) {
          return reply.status(400).send({
            message: "A sala já está reservada nesse horário",
          });
        }

        const novaReserva = await prisma.reservation.create({
          data: {
            userId,
            roomId,
            date: new Date(date),
          },
        });

        reply.status(201).send(novaReserva);
      } catch (error) {
        reply.status(500).send({
          error: "Não foi possível criar a reserva",
        });
      }
    },
  );

  app.get(
    "/reservation/user/:userId",
    {
      schema: {
        params: z.object({
          userId: z.string(),
        }),
        response: {
          200: z.array(z.any()),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      try {
        const reservas = await prisma.reservation.findMany({
          where: {
            userId: parseInt(userId),
          },
          include: {
            room: true,
          },
        });

        reply.send(reservas);
      } catch (error) {
        reply.status(500).send({
          error: "Não foi possível buscar as reservas",
        });
      }
    },
  );

  app.put(
    "/reservation/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          date: z.string(),
        }),
        response: {
          200: z.object({
            id: z.number(),
            userId: z.number(),
            roomId: z.number(),
            date: z.date(),
            createdAt: z.date(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { date } = request.body;

      const reservationId = parseInt(id);

      try {
        const reserva = await prisma.reservation.findUnique({
          where: {
            id: reservationId,
          },
        });

        if (!reserva) {
          return reply.status(400).send({
            message: "Reserva não encontrada",
          });
        }

        const conflito = await prisma.reservation.findFirst({
          where: {
            roomId: reserva.roomId,
            date: new Date(date),
            NOT: {
              id: reservationId,
            },
          },
        });

        if (conflito) {
          return reply.status(400).send({
            message: "Horário já ocupado",
          });
        }

        const reservaAtualizada = await prisma.reservation.update({
          where: {
            id: reservationId,
          },
          data: {
            date: new Date(date),
          },
        });

        reply.send(reservaAtualizada);
      } catch (error) {
        reply.status(500).send({
          error: "Erro ao atualizar reserva",
        });
      }
    },
  );

  app.delete(
    "/reservation/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const reservationId = parseInt(id);

      try {
        await prisma.reservation.delete({
          where: {
            id: reservationId,
          },
        });

        reply.send({
          message: "Reserva cancelada com sucesso",
        });
      } catch (error) {
        reply.status(500).send({
          error: "Falha ao cancelar reserva",
        });
      }
    },
  );
};
