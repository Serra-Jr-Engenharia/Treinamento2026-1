import type { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma.js"

interface Rooms {
    id: string
    name: string
    capacidade: number
    local: string
    descricao: string
}

// POST /room
// GET /room
// GET /room/logs
// GET /room/logs/:roomId
// GET /room/:id
// PUT /room/:id
// PATCH /room/:id
// DELETE /room/:id

export default async function RoomController(app: FastifyInstance) {

    app.post('/room', async (request, reply) => {
        const { name, capacidade, local, descricao } = request.body as Rooms

        if (!name || !capacidade || !local || !descricao) {
            return reply.status(400).send({ error: 'Todos os campos são obrigatórios' })
        }
        try {
            const newRoom = await prisma.room.create({
                data: { name, capacidade, local, descricao }
            })
            
            await prisma.roomLog.create({
                data: {
                    roomId: newRoom.id,
                    action: 'CREATE',
                    changes: { name, capacidade, local, descricao }
                }
            })
            return reply.status(201).send(newRoom)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao criar sala' })
        }
    })

    app.get('/room', async (_, reply) => {
        try {
            const rooms = await prisma.room.findMany()
            return reply.status(200).send(rooms)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar salas' })
        }
    })

    app.get('/room/logs', async (_, reply) => {
        try {
            const logs = await prisma.roomLog.findMany()
            return reply.status(200).send(logs)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar logs' })
        }
    })

    app.get('/room/logs/:roomId', async (request, reply) => {
        const { roomId } = request.params as { roomId: string }
        try {
            const logs = await prisma.roomLog.findMany({
                where: { roomId }
            })
            return reply.status(200).send(logs)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar logs da sala' })
        }
    })

    app.get('/room/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        try {
            const room = await prisma.room.findUnique({ where: { id } })
            if (!room) {
                return reply.status(404).send({ error: 'Sala não encontrada' })
            }
            return reply.status(200).send(room)
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar sala' })
        }
    })

    app.put('/room/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, capacidade, local, descricao } = request.body as Rooms

        if (!name || !capacidade || !local || !descricao) {
            return reply.status(400).send({ error: 'Todos os campos são obrigatórios para atualização total' })
        }

        try {
            const updatedRoom = await prisma.room.update({
                where: { id },
                data: { name, capacidade, local, descricao }
            })

            await prisma.roomLog.create({
                data: {
                    roomId: id,
                    action: 'UPDATE',
                    changes: { name, capacidade, local, descricao }
                }
            })
            return reply.status(200).send(updatedRoom)
        } catch (error) {
            return reply.status(404).send({ error: 'Sala não encontrada ou erro ao atualizar' })
        }
    })

    app.patch('/room/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const { name, capacidade, local, descricao } = request.body as Partial<Rooms>
        
        const updateData = Object.fromEntries(
            Object.entries({ name, capacidade, local, descricao }).filter(([, v]) => v !== undefined)
        ) as Partial<Rooms>

        try {
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
            return reply.status(404).send({ error: 'Sala não encontrada ou erro ao atualizar' })
        }
    })

    app.delete('/room/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        try {
            const roomToDelete = await prisma.room.findUnique({ where: { id } })
            await prisma.room.delete({ where: { id } })

            await prisma.roomLog.create({
                data: {
                    roomId: id,
                    action: 'DELETE',
                    changes: roomToDelete ? { name: roomToDelete.name } : { message: "Dados indisponíveis" }
                }
            })
            return reply.status(200).send({ message: "Sala deletada com sucesso" })
        } catch (error) {
            return reply.status(404).send({ error: 'Sala não encontrada ou erro ao excluir' })
        }
    })
}