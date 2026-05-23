import fastify from 'fastify'
import { randomUUID } from 'node:crypto';
import { compressDeflateSync } from 'node:zlib/iter';

const app = fastify();


interface sala{
    id: string;
    nome: string;
    capacidade: number;
    recursos: string;
}

const salas: sala[] = []

app.post('/salas', (request, reply) => {
    const {nome, capacidade, recursos } = request.body as sala;
    if (!nome || !capacidade || !recursos) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    const sala: sala = {
        id: randomUUID(),
        nome,
        capacidade,
        recursos
    };
    salas.push(sala)

    return reply.status(201).send({message:'Sala criada com sucesso', sala});
});

app.get('/salas', (request, reply) => {
    return salas;
});


app.put('/salas/:id', (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome, capacidade, recursos } = request.body as sala;
    const salaIndex = salas.findIndex(s => s.id === id);

    if (salaIndex === -1) {
        return reply.status(404).send({ error: 'Sala não encontrada' });
    }

    if (!nome || !capacidade || !recursos) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

salas[salaIndex] = { id, nome, capacidade, recursos };
    return reply.status(200).send({ message: 'Sala atualizada com sucesso', sala: salas[salaIndex] });
}
);

app.delete('/salas/:id', (request, reply) => {
    const { id } = request.params as { id: string };
    const salaIndex = salas.findIndex(s => s.id === id);

    if (salaIndex === -1) {
        return reply.status(404).send({ error: 'Sala não encontrada' });
    }

salas.splice(salaIndex, 1);
    return reply.status(200).send({ message: 'Sala deletada com sucesso' });
});

app.get('/', () => {
    return { message: 'Hello, Serra Jr.!' }
});

app.listen({ port: 3000 }, () => { console.log('Server is running on port 3000'); }); 