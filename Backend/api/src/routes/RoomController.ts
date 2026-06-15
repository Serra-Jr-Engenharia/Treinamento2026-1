import { prisma } from "../lib/prisma.js"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { verifyJWT } from "../hooks/verifyJWT.js"
import * as RoomSchemas from "../schemas/roomSchemas.js"
import { errorResponseSchema } from "../schemas/globalSchemas.js"


// 1. POST /rooms
// 2. GET /rooms
// 3. GET /rooms/logs
// 4. GET /rooms/logs/:roomId
// 5. GET /rooms/:id
// 6. PUT /rooms/:id
// 7. PATCH /rooms/:id
// 8. DELETE /rooms/:id

export const roomController: FastifyPluginAsyncZod = async app => {

    app.addHook("onRequest", verifyJWT)

    app.post('/rooms', {
        schema: {
            body: RoomSchemas.createRoomBodySchema,
            response: {
                201: RoomSchemas.roomResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { name, capacidade, local, descricao } = request.body

        try {
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
            params: z.object({
                id: z.string()
            }),
            body: RoomSchemas.createRoomBodySchema,
            response: {
                200: RoomSchemas.roomResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, capacidade, local, descricao } = request.body
        try {
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
            params: z.object({
                id: z.string()
            }),
            body: RoomSchemas.updateRoomsBodySchema,
            response: {
                200: RoomSchemas.roomResponseSchema,
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