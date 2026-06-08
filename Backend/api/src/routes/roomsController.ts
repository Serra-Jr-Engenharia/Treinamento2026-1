import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma.js';
import z from "zod";
import { error } from 'node:console';


export const roomsController:FastifyPluginAsyncZod = async app => {

  app.post('/room', {
      schema: {
        body:  z.object({
            nome: z.string().min(5).max(20),
            capacidade: z.number().int().positive(),
            local: z.string(),
            descricao: z.string()
        }),
        response: {
          201: z.object({
            id: z.number(),
            nome: z.string(),
            capacidade: z.number().int().positive(),
            local: z.string(),
            descricao: z.string()
          }),
          400: z.object({
            error: z.string()
          }),
          500: z.object({
            error: z.string()
          })

        }
      
      }
  },async (request, reply) => {

    const { nome, capacidade, local, descricao } = request.body

    try {

      const novaSala = await prisma.room.create({
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      })

      return reply.status(201).send(novaSala)
    } catch (error) {
      return reply.status(500).send({
        error: 'Erro ao adicionar sala.'
      })
    }
  })

  app.get('/room',{
    schema: {
      response: {
        200: z.array(
              z.object({
                id: z.number(),
                nome: z.string().min(5).max(20),
                capacidade: z.number().int().positive(),
                local: z.string(),
                descricao: z.string()
              })
        ),
        500: z.object({
          error: z.string(),
        })
      }
    }
   
  },async (_, reply) => {
    
    try {
      const rooms = await prisma.room.findMany()
      reply.send(rooms)
    }catch (error) {
       reply.status(500).send({error: 'Erro ao buscar sala.'})
    }
})

  app.put('/room/:id',{
    schema:{
      params: z.object({
        id: z.string()
      }),
      body: 
        z.object({
          nome: z.string().min(5).max(20),
          capacidade: z.number().int().positive(),
          local: z.string(),
          descricao: z.string()
      }),
      response: {
        200: z.object({
                id: z.number(),
                nome: z.string().min(5).max(20),
                capacidade: z.number().int().positive(),
                local: z.string(),
                descricao: z.string()
        }),
        500: z.object({
          error: z.string(),
        })
      }
    
    }
  } ,async (request, reply) => {
    const { id } = request.params


    const { nome, capacidade, local, descricao } = request.body

    
    const roomId = parseInt(id)

   

    try {
      const salaAtt = await prisma.room.update({
        where: { id: roomId },
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      })

      return reply.status(200).send(salaAtt)
    } catch (error) {
      return reply.status(500).send({error: 'Erro ao Atualizar sala.'})
    }
  })

  app.delete('/room/:id', {
    schema: {
      params: z.object ({
        id: z.string()
      }),
      response: {
        200: z.object({
          message: z.string()
        }), 
        500: z.object({
          error: z.string()
        })
      }
    }
  } ,async (request, reply) => {
    const { id } = request.params
    const roomId = parseInt(id)

    try {
      await prisma.room.delete({
        where: {id: roomId}
      })
      return reply.status(200).send({message: 'Sala removida com sucesso!'})
      
    } catch (error) {
      return reply.status(500).send({error: 'Erro ao remover sala.'})
    }
  })

}