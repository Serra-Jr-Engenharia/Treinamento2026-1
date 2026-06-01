import fastify, { type FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma.js'



interface room {
    id: string,
    nome: string,
    capacidade: number
    local: string
    descricao: string
}


export default async function controlador_de_salas(app: FastifyInstance) {



    app.post('/room', async (request, reply) => {
        const { nome, capacidade, local, descricao } = request.body as room

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
            reply.status(201).send({ newroom })
        } catch (error) {
            reply.status(500).send({ error: 'Não foi possível adiconar a sala!' })
        }
    })





    app.get('/room', async (_, reply) => {
        try {
            const sala = await prisma.salas.findMany()

            reply.send(sala)
        } catch (error) {
            reply.status(500).send({ error: 'Não foi possível encontrar a sala' })
        }
    })


    app.put('/room/:id', async (request, reply) => {
        const { id } = request.params as { id: string }

        const { nome, capacidade, local, descricao } = request.body as room

        const roomid = parseInt(id)

        try {
            const atualizarSala = await prisma.salas.update({
                where: { id: roomid },
                data: {
                    nome,
                    capacidade,
                    local,
                    descricao,
                }
            })
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao atualizar a sala!' })
        }

    })


    app.delete('/room/:id', async (request, reply) => {

        const { id } = request.params as room

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

