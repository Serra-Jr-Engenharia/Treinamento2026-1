import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { verifyJWT } from "../hooks/verifyJWT.js";
import * as ReservationsSchema from "../schemas/reservationSchemas.js"
import { prisma } from "../lib/prisma.js";
import { errorResponseSchema, messageResponseSchema } from "../schemas/globalSchemas.js";
import z from "zod";

async function checkCollision(
    roomId: string,
    startTime: Date,
    endTime: Date,
    excludeReservationId: string | null = null) {
    const collision = await prisma.reservation.findFirst({
        where: {
            roomId,
            ...(excludeReservationId ? { id: { not: excludeReservationId } } : {}),
            AND: [
                { startTime: { lt: endTime } },
                { endTime: { gt: startTime } }
            ]
        }
    })
    return !!collision
}

export const reservationController: FastifyPluginAsyncZod = async app => {

    app.addHook("onRequest", verifyJWT)

    app.post("/rooms/reservation", {
        onRequest: [verifyJWT],
        schema: {
            tags: ["Reservation"],
            summary: "Cria uma Nova Reserva",
            description: "",

            body: ReservationsSchema.reservationBodySchema,
            response: {
                201: ReservationsSchema.reservationResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { roomId, startTime, endTime } = request.body

        const start = new Date(startTime)
        const end = new Date(endTime)

        const user = request.user as {
            id: string
        }
        const userID = user.id

        try {
            const hasCollision = await checkCollision(roomId, start, end)

            if (hasCollision) return reply.status(400).send({ error: "A sala já está reservada nesse horário" })

            const reservation = await prisma.reservation.create({
                data: {
                    roomId,
                    userId: userID,
                    startTime: start,
                    endTime: end
                }
            })
            return reply.status(201).send(reservation)
        } catch (error) {
            console.log(error)
            return reply.status(500).send({ error: "Erro ao criar sala" })
        }
    })

    app.get("/users/reservation/:userId", {
        schema: {
            tags: ["Reservation"],
            summary: "Retorna por Usuário",
            description: "Retorna Todas as Reservas de um Usuário",

            params: ReservationsSchema.userReservationsParamsSchema,
            response: {
                200: ReservationsSchema.userReservationResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema,
            }
        }
    }, async (request, reply) => {
        const { userId } = request.params as { userId: string }

        try {
            const userExists = await prisma.user.findUnique({
                where: { id: userId }
            })

            if (!userExists) return reply.status(404).send({ error: "Usuário não encontrado" })

            const reservations = await prisma.reservation.findMany({
                where: { userId },
                orderBy: { startTime: "asc" }
            })
            return reply.status(200).send(reservations)
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao listar reservas do usuário" })
        }
    })

    app.patch("/rooms/reservation/:id", {
        schema: {
            tags: ["Reservation"],
            summary: "Atualiza uma Reserva",
            description: "Atualiza uma Reserva pelo ID da Reserva",

            params: ReservationsSchema.idReservationsParamsSchema,
            body: ReservationsSchema.patchReservationBodySchema,
            response: {
                200: ReservationsSchema.patchReservationResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const { startTime, endTime } = request.body

        try {
            const currentReservation = await prisma.reservation.findUnique({
                where: { id }
            })

            if (!currentReservation) return reply.status(404).send({ error: "Reserva não encontrada" })

            const start = startTime ? new Date(startTime) : currentReservation.startTime
            const end = endTime ? new Date(endTime) : currentReservation.endTime

            if (start >= end) {
                return reply.status(400).send({ error: "O horário de início deve ser anterior ao horário de término" })
            }

            const hasCollision = await checkCollision(currentReservation.roomId, start, end, id)

            if (hasCollision) return reply.status(400).send({ error: "O novo período escolhido conflita com outra reserva ativa" })

            const updatedReservation = await prisma.reservation.update({
                where: { id },
                data: {
                    startTime: start,
                    endTime: end
                }
            })

            return reply.status(200).send(updatedReservation)
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar reserva" })
        }
    })

    app.delete("/rooms/reservation/:id", {
        schema: {
            tags: ["Reservation"],
            summary: "Deleta uma Reserva",
            description: "",

            params: ReservationsSchema.idReservationsParamsSchema,
            response: {
                200: messageResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema,
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const reservationExists = await prisma.reservation.findUnique({
                where: { id }
            })

            if (!reservationExists) return reply.status(404).send({ error: "Reserva não encontrada" })

            await prisma.reservation.delete({
                where: { id }
            })
            return reply.status(200).send({ message: "Reserva deletada com sucesso" })
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao excluir reserva" })
        }
    })

    app.get("/rooms/reservation", {
        schema: {
            tags: ["Reservation"],
            summary: "Retorna Todas as Reservas",
            description: "",

            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        roomId: z.string(),
                        userId: z.string(),
                        startTime: z.date(),
                        endTime: z.date(),
                        createdAt: z.date(),
                    }))
            }
        }
    }, async (_, reply) => {
        const reservations = await prisma.reservation.findMany()
        return reply.status(200).send(reservations)
    })

    app.get("/rooms/reservation/:roomId", {
        schema: {
            tags: ["Reservation"],
            summary: "Retorna por Sala",
            description: "Retorna Todas as Reservas de uma Sala",

            params: ReservationsSchema.roomReservationsParamsSchema,
            response: {
                200: ReservationsSchema.roomReservationResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema,
            }
        }
    }, async (request, reply) => {
        const { roomId } = request.params as { roomId: string }

        try {
            const userExists = await prisma.room.findUnique({
                where: { id: roomId }
            })

            if (!userExists) return reply.status(404).send({ error: "Sala não encontrada" })

            const reservations = await prisma.reservation.findMany({
                where: { roomId },
                orderBy: { startTime: "asc" }
            })
            return reply.status(200).send(reservations)
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao listar reservas da sala" })
        }
    })
}