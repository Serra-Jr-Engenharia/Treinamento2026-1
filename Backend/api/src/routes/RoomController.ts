import { prisma } from "../lib/prisma.js"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { verifyJWT } from "../hooks/verifyJWT.js"
import * as RoomSchemas from "../schemas/roomSchemas.js"
import { errorResponseSchema } from "../schemas/globalSchemas.js"


async function nameValid(nameExists: string): Promise<boolean> {
    const room = await prisma.room.findUnique({
        where: { name: nameExists }
    })
    return !!room
}

export const roomController: FastifyPluginAsyncZod = async app => {

    app.addHook("onRequest", verifyJWT)

    app.post('/rooms', {
        schema: {
            tags: ["Rooms"],
            summary: "Cria uma Nova Sala",
            description: "",

            body: RoomSchemas.createRoomBodySchema,
            response: {
                201: RoomSchemas.roomResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { name, capacidade, local, descricao } = request.body

        try {

            const nameExists = await nameValid(name)

            if (nameExists) return reply.status(400).send({ error: "Esse nome de sala já existe" })

            const newRoom = await prisma.room.create({
                data: {
                    name,
                    capacidade,
                    local,
                    descricao: descricao ?? null
                }
            })

            await prisma.roomLog.create({
                data: {
                    roomId: newRoom.id,
                    action: 'CREATE',
                    changes: {
                        name,
                        capacidade,
                        local,
                        descricao: descricao ?? null
                    }
                }
            })
            return reply.status(201).send(newRoom)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao criar sala' })
        }
    })

    app.get('/rooms', {
        schema: {
            tags: ["Rooms"],
            summary: "Retorna Todas as Salas",
            description: "",

            response: {
                200: RoomSchemas.getAllRoomsResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (_, reply) => {
        try {
            const rooms = await prisma.room.findMany()
            return reply.status(200).send(rooms)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar salas' })
        }
    })

    app.get('/rooms/logs', {
        schema: {
            tags: ["Rooms Logs"],
            summary: "Retorna Todas as Logs",
            description: "",

            response: {
                200: RoomSchemas.getRoomsLogResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (_, reply) => {
        try {
            const logs = await prisma.roomLog.findMany()
            return reply.status(200).send(logs)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar logs' })
        }
    })

    app.get('/rooms/logs/:roomId', {
        schema: {
            tags: ["Rooms Logs"],
            summary: "Retorna Todas as Logs por Sala",
            description: "",

            params: z.object({
                roomId: z.string()
            }),
            response: {
                200: RoomSchemas.getRoomsLogResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { roomId } = request.params
        try {
            const roomExists = await prisma.room.findUnique({
                where: { id: roomId }
            })

            if (!roomExists) {
                return reply.status(404).send({ error: "Sala não encontrada" })
            }

            const logs = await prisma.roomLog.findMany({
                where: { roomId }
            })
            return reply.status(200).send(logs)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar logs da sala' })
        }
    })

    app.get('/rooms/:id', {
        schema: {
            tags: ["Rooms"],
            summary: "Retorna a Sala pelo ID",
            description: "",

            params: z.object({
                id: z.string()
            }),
            response: {
                200: RoomSchemas.roomResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        try {
            const room = await prisma.room.findUnique({
                where: { id }
            })

            if (!room) {
                return reply.status(404).send({ error: "Sala não encontrada" })
            }

            return reply.status(200).send(room)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar sala' })
        }
    })

    app.put('/rooms/:id', {
        schema: {
            tags: ["Rooms"],
            summary: "Atualização Total da Sala",
            description: "",

            params: z.object({
                id: z.string()
            }),
            body: RoomSchemas.createRoomBodySchema,
            response: {
                200: RoomSchemas.roomResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, capacidade, local, descricao } = request.body
        try {

            const nameExists = await nameValid(name)

            if (nameExists) return reply.status(400).send({ error: "Esse nome de sala já existe" })

            const roomExists = await prisma.room.findUnique({
                where: { id }
            })

            if (!roomExists) {
                return reply.status(404).send({ error: "Sala não encontrada" })
            }
            const updatedRoom = await prisma.room.update({
                where: { id },
                data: { name, capacidade, local, descricao: descricao ?? null }
            })

            await prisma.roomLog.create({
                data: {
                    roomId: id,
                    action: 'UPDATE',
                    changes: { name, capacidade, local, descricao: descricao ?? null }
                }
            })
            return reply.status(200).send(updatedRoom)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao atualizar sala' })
        }
    })

    app.patch('/rooms/:id', {
        schema: {
            tags: ["Rooms"],
            summary: "Atualização Parcial da Sala",
            description: "",

            params: z.object({
                id: z.string()
            }),
            body: RoomSchemas.updateRoomsBodySchema,
            response: {
                200: RoomSchemas.roomResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, capacidade, local, descricao } = request.body

        const updateData = Object.fromEntries(
            Object.entries({ name, capacidade, local, descricao }).filter(([, v]) => v !== undefined)
        )

        try {

            const roomExists = await prisma.room.findUnique({
                where: { id }
            })

            if (!roomExists) {
                return reply.status(404).send({ error: "Sala não encontrada" })
            }

            if (name) {
                const nameConflict = await prisma.room.findFirst({
                    where: {
                        name,
                        id: {not: id}
                    }
                })
                if(nameConflict) return reply.status(400).send({error: "Já existe uma sala com esse nome"})
            }

            const updatedRoom = await prisma.room.update({
                where: { id },
                data: updateData
            })

            await prisma.roomLog.create({
                data: {
                    roomId: id,
                    action: 'PATCH_UPDATE',
                    changes: updateData
                }
            })
            return reply.status(200).send(updatedRoom)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao atualizar sala' })
        }
    })

    app.delete('/rooms/:id', {
        schema: {
            tags: ["Rooms"],
            summary: "Deleta uma Sala pelo ID",
            description: "",

            params: z.object({
                id: z.string()
            }),
            response: {
                200: RoomSchemas.deleteResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }
        try {
            const roomToDelete = await prisma.room.findUnique({ where: { id } })

            if (!roomToDelete) {
                return reply.status(404).send({ error: "Sala não encontrada" })
            }
            await prisma.room.delete({
                where: { id }
            })

            await prisma.roomLog.create({
                data: {
                    roomId: id,
                    action: 'DELETE',
                    changes: {}
                }
            })
            return reply.status(200).send({ message: "Sala deletada com sucesso" })
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao excluir sala' })
        }
    })
}