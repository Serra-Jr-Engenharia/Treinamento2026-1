import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const app = fastify()
const prisma = new PrismaClient()

interface SalaRequestBody {
    nome: string
    capacidade: number
    recursos: string
}

const salaSchema = z.object({
    nome: z
        .string()
        .min(5, 'O nome deve ter pelo menos 5 caracteres')
        .max(20, 'O nome deve ter no máximo 20 caracteres'),

    capacidade: z
        .number()
        .int()
        .positive('A capacidade deve ser maior que zero'),

    recursos: z
        .string()
        .min(3, 'Informe pelo menos um recurso')
})

app.post('/salas', async (request, reply) => {
    try {
        const dados = salaSchema.parse(request.body)

        const novaSala = await prisma.room.create({
            data: dados
        })

        return reply.status(201).send({
            success: true,
            message: 'Sala criada com sucesso',
            sala: novaSala
        })

    } catch (error) {

        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                success: false,
                message: 'Dados inválidos',
                errors: error.issues
            })
        }

        return reply.status(500).send({
            success: false,
            message: 'Erro ao criar a sala no banco de dados'
        })
    }
})

app.get('/salas', async (request, reply) => {
    try {
        const salas = await prisma.room.findMany()

        return reply.status(200).send({
            success: true,
            data: salas
        })

    } catch (error) {
        return reply.status(500).send({
            success: false,
            message: 'Erro ao buscar as salas'
        })
    }
})

app.get<{ Params: { id: string } }>('/salas/:id', async (request, reply) => {
    const { id } = request.params

    try {

        const sala = await prisma.room.findUnique({
            where: { id }
        })

        if (!sala) {
            return reply.status(404).send({
                success: false,
                message: 'Sala não encontrada'
            })
        }

        return reply.status(200).send({
            success: true,
            data: sala
        })

    } catch (error) {

        return reply.status(500).send({
            success: false,
            message: 'Erro ao buscar a sala'
        })
    }
})

app.put<{ Params: { id: string } }>('/salas/:id', async (request, reply) => {
    try {

        const { id } = request.params

        const dados = salaSchema.parse(request.body)

        const salaExiste = await prisma.room.findUnique({
            where: { id }
        })

        if (!salaExiste) {
            return reply.status(404).send({
                success: false,
                message: 'Sala não encontrada'
            })
        }

        const salaAtualizada = await prisma.room.update({
            where: { id },
            data: dados
        })

        return reply.status(200).send({
            success: true,
            message: 'Sala atualizada com sucesso',
            sala: salaAtualizada
        })

    } catch (error) {

        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                success: false,
                message: 'Dados inválidos',
                errors: error.issues
            })
        }

        return reply.status(500).send({
            success: false,
            message: 'Erro ao atualizar a sala'
        })
    }
})

app.delete<{ Params: { id: string } }>('/salas/:id', async (request, reply) => {
    const { id } = request.params

    try {

        const salaExiste = await prisma.room.findUnique({
            where: { id }
        })

        if (!salaExiste) {
            return reply.status(404).send({
                success: false,
                message: 'Sala não encontrada'
            })
        }

        await prisma.room.delete({
            where: { id }
        })

        return reply.status(200).send({
            success: true,
            message: 'Sala deletada com sucesso'
        })

    } catch (error) {

        return reply.status(500).send({
            success: false,
            message: 'Erro ao deletar a sala'
        })
    }
})

app.get('/', async () => {
    return {
        success: true,
        message: 'Hello, Serra Jr!'
    }
})

app.listen(
    {
        port: 3000,
        host: '0.0.0.0'
    },
    (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log(`Server is running on ${address}`)
    }
)