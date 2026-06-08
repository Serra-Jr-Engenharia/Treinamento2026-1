import { prisma } from '../lib/prisma.js'
import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';


export const roomsController: FastifyPluginAsyncZod = async app => {
    
    app.post('/room', {
        schema: {
            body: 
                z.object({
                    nome: z.string().min(5).max(50),
                    capacidade: z.number().int().positive(),
                    local: z.string().min(5).max(50),
                    descricao: z.string().min(5).max(50)}),
            response: {
                201: z.object({
                    id: z.number(),
                    nome: z.string(),
                    capacidade: z.number(),
                    local: z.string(),
                    descricao: z.string(),
                    createdAt: z.date(),
                    updatedAt: z.date()
                }),
                500: z.object({
                    error: z.string()
                    })
                }
            }
    } ,async (request, reply) => {
        const { nome, capacidade, local, descricao } = request.body

        try {
            const newRoom = await prisma.room.create({
                data: { nome, capacidade, local, descricao }
            })
            reply.status(201).send(newRoom)
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao adicionar sala' })
        }
    })

    app.get('/room', {
        schema: {
            response: {
                200: z.array(
                    z.object({id: z.number(),
                    nome: z.string(),
                    capacidade: z.number(),
                    local: z.string(),
                    descricao: z.string(),
                    createdAt: z.date(),
                    updatedAt: z.date()
                })
                ),
                500: z.object({
                    error: z.string(),
                })
            }
        }},async (_, reply) => {
        try {
            const salas = await prisma.room.findMany()
            reply.send(salas)
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar salas' })
        }
    })

    app.put('/room/:id', {
        schema: {
            params: z.object({ id: z.string() }),
            body: z.object({
                nome: z.string().min(5).max(50),
                capacidade: z.number().int().positive(),
                local: z.string().min(5).max(50),
                descricao: z.string().min(5).max(50)
            }),
            response: {
                200: z.object({
                    nome: z.string(),
                    capacidade: z.number(),
                    local: z.string(),
                    descricao: z.string(),
                    createdAt: z.date(),
                    updatedAt: z.date()
                }),
                500: z.object({
                    error: z.string(),
                })
            }

        }
    }, async (request, reply) => {
        const { id } = request.params
        const { nome, capacidade, local, descricao } = request.body
        const roomId = parseInt(id)

        try {
            const updatedSala = await prisma.room.update({
                where: { id: roomId },
                data: { nome, capacidade, local, descricao }
            })
            reply.status(200).send(updatedSala)
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao atualizar sala' })
        }
    })

    app.delete('/room/:id', {
        schema: {
            params: z.object({ id: z.string() }),
            response: {
                200: z.object({
                    message: z.string()
                }),
                500: z.object({
                    error: z.string(),
                })
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        const roomId = parseInt(id)

        try {
            await prisma.room.delete({
                where: { id: roomId }
            })
            reply.send({ message: 'Sala removida com sucesso' })
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao remover sala.' })
        }
    })
    
}

