import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

interface SalaRequestBody {
    nome: string;
    capacidade: number;
    recursos: string;
}

app.post('/salas', async (request, reply) => {
    const { nome, capacidade, recursos } = request.body as SalaRequestBody;
    
    
    if (!nome || !capacidade || !recursos) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const novaSala = await prisma.room.create({
            data: {
                nome,
                capacidade: Number(capacidade), // Garante que será salvo como número inteiro
                recursos
            }
        });

        return reply.status(201).send({ message: 'Sala criada com sucesso', sala: novaSala });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao criar a sala no banco de dados' });
    }
});

app.get('/salas', async (request, reply) => {
    try {
        const rooms = await prisma.room.findMany();
        return rooms;
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao buscar as salas no banco de dados' });
    }
});

app.put<{ Params: { id: string } }>('/salas/:id', async (request, reply) => {
    const { id } = request.params;
    const { nome, capacidade, recursos } = request.body as SalaRequestBody;

    if (!nome || !capacidade || !recursos) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Verifica se a sala realmente existe no MySQL antes de atualizar
        const salaExiste = await prisma.room.findUnique({ where: { id } });
        if (!salaExiste) {
            return reply.status(404).send({ error: 'Sala não encontrada' });
        }

        const salaAtualizada = await prisma.room.update({
            where: { id },
            data: {
                nome,
                capacidade: Number(capacidade),
                recursos
            }
        });

        return reply.status(200).send({ message: 'Sala atualizada com sucesso', sala: salaAtualizada });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao atualizar a sala' });
    }
});

app.delete<{ Params: { id: string } }>('/salas/:id', async (request, reply) => {
    const { id } = request.params;

    try {
        // Verifica se a sala existe no MySQL antes de tentar deletar
        const salaExiste = await prisma.room.findUnique({ where: { id } });
        if (!salaExiste) {
            return reply.status(404).send({ error: 'Sala não encontrada' });
        }

        await prisma.room.delete({
            where: { id }
        });

        return reply.status(200).send({ message: 'Sala deletada com sucesso' });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao deletar a sala' });
    }
});


app.get('/', () => {
    return { message: 'Hello, Serra Jr.!' };
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => { 
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`); 
});