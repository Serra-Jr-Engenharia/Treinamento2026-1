import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const roomReservation: FastifyPluginAsyncZod = async (app) => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
  });

  const reservationResponse = z.object({
    id: z.number(),
    dataHora: z.date(),
    userID: z.number(),
    roomId: z.number(),
  });

  app.post(
    "/reservation",
    {
      schema: {
        body: z.object({
          dataHora: z.iso.datetime(),
          roomId: z.number().int().positive(),
        }),
        response: {
          201: reservationResponse,
          409: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { dataHora, roomId } = request.body;
      const userId = (request.user as { id: number }).id;
      const dataHoraDate = new Date(dataHora);

      const conflito = await prisma.room_reservation.findFirst({
        where: { roomId, dataHora: dataHoraDate },
      });

      if (conflito) {
        return reply
          .status(409)
          .send({ error: "Já existe uma reserva para essa sala nesse dia e horário" });
      }

      try {
        const reserva = await prisma.room_reservation.create({
          data: { dataHora: dataHoraDate, userID: userId, roomId },
        });
        reply.status(201).send(reserva);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao criar reserva" });
      }
    },
  );

  app.delete(
    "/reservation/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        response: {
          200: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const reservaId = parseInt(request.params.id);

      try {
        await prisma.room_reservation.delete({ where: { id: reservaId } });
        reply.send({ message: "Reserva cancelada com sucesso" });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao cancelar reserva" });
      }
    },
  );

  app.put(
    "/reservation/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        body: z.object({
          dataHora: z.iso.datetime(),
        }),
        response: {
          200: reservationResponse,
          404: z.object({ error: z.string() }),
          409: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const reservaId = parseInt(request.params.id);
      const dataHoraDate = new Date(request.body.dataHora);

      const reservaAtual = await prisma.room_reservation.findUnique({
        where: { id: reservaId },
      });

      if (!reservaAtual) {
        return reply.status(404).send({ error: "Reserva não encontrada" });
      }

      const conflito = await prisma.room_reservation.findFirst({
        where: {
          roomId: reservaAtual.roomId,
          dataHora: dataHoraDate,
          NOT: { id: reservaId },
        },
      });

      if (conflito) {
        return reply
          .status(409)
          .send({ error: "Já existe uma reserva para essa sala nesse dia e horário" });
      }

      try {
        const reservaAtualizada = await prisma.room_reservation.update({
          where: { id: reservaId },
          data: { dataHora: dataHoraDate },
        });
        reply.send(reservaAtualizada);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao atualizar reserva" });
      }
    },
  );

  app.get(
    "/reservation/user",
    {
      schema: {
        response: {
          200: z.array(reservationResponse),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const userId = (request.user as { id: number }).id;

      try {
        const reservas = await prisma.room_reservation.findMany({
          where: { userID: userId },
        });
        reply.send(reservas);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao buscar reservas" });
      }
    },
  );
};
