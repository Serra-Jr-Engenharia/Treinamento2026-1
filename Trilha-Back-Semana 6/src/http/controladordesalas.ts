import {z} from "zod";
import { prisma } from './lib/prisma.js'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { id } from "zod/locales";
import { error } from "node:console";






export const controlador_de_salas: FastifyPluginAsyncZod =async app =>{



    app.post('/room', {
        schema:{
            body:z.object({
                nome:z.string(),
                capacidade:z.number(),
                local:z.string(),
                descricao:z.string(),
            }),
            response:{
                201: z.object({
                    id:z.number(),
                    nome:z.string(),
                    capacidade:z.number(),
                    local:z.string(),
                    descricao:z.string(),
                    CriadoEm:z.date(),
                    Atualizado:z.date()
                }),
                400:z.object({
                    message:z.string()
                }),
                500: z.object({
                    error:z.string()
                })
            }
        }
    },async (request, reply) => {
        const { nome, capacidade, local, descricao } = request.body

        if (!nome || !capacidade || !local || !descricao) {
            return reply.status(400).send({ message: 'Todos os campos são obrigatórios' })
        }

        try {
            const newroom = await prisma.salas.create({
                data: {
                    nome,
                    capacidade,
                    local,
                    descricao,
                }

            })
            reply.status(201).send(  newroom )
        } catch (error) {
            reply.status(500).send({ error: 'Não foi possível adicionar a sala!' })
        }
    })





    app.get('/room', {
        schema:{
            response: {
                200:z.array(
                    z.object({
                    id:z.number(),
                    nome:z.string(),
                    capacidade:z.number(),
                    local:z.string(),
                    descricao:z.string(),
                    CriadoEm:z.date(),
                    Atualizado:z.date()
                    })
                ),
                500: z.object({
                    error:z.string()
                })
            }
        }
    },async (_, reply) => {
        try {
            const sala = await prisma.salas.findMany()

            reply.send(sala)
        } catch (error) {   
            reply.status(500).send({ error: 'Não foi possível encontrar a sala' })
        }
    })


    app.put('/room/:id', {
        schema:{
            params: z.object({
                 id:z.string()
            }),
            body: z.object({
                nome:z.string(),
                capacidade:z.number(),
                local:z.string(),
                descricao:z.string(),
            })
            ,response:{
                200: z.object({
                id:z.number(),
                nome:z.string(),
                capacidade:z.number(),
                local:z.string(),
                descricao:z.string(),
                CriadoEm:z.date(),
                Atualizado:z.date()
                }),
                500: z.object({
                    error: z.string(),
                })
            }
                
        }

    },async (request, reply) => {
        const { id } = request.params

        const { nome, capacidade, local, descricao } = request.body 

        const roomid = parseInt(id)


        try {
            const atualizarSala = await prisma.salas.update({
                where: { id:roomid},
                data: {
                    nome,
                    capacidade,
                    local,
                    descricao,
                }
            })
            reply.status(200).send(atualizarSala)
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao atualizar a sala!' })
        }

    })


    app.delete('/room/:id', {
        schema:{
            params:z.object({
                id:z.string()
            }),
            response:{
                200:z.object({
                    message:z.string()
                }),
                500:z.object({
                    error:z.string()
                })
            }
        }
    },async (request, reply) => {

        const { id } = request.params 

        const roomid = parseInt(id)


        try {
            await prisma.salas.delete({
                where: { id: roomid }
            })
            reply.send({ message: 'Sala removido com sucesso' })
        } catch (error) {
            reply.status(500).send({ error: 'Falha ao deletar a sala' })
        }

        


    })

}

