import fastify, { type FastifyRequest, type FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import fastifyJwt from '@fastify/jwt';
import bcrypt from 'bcrypt';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
const server = fastify().withTypeProvider<ZodTypeProvider>();
const prisma = new PrismaClient();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyJwt, {
  secret: 'chave_secreta_e_segura_da_serrajr_2026'
});
async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: 'Acesso negado. Token inválido ou não fornecido.' });
  }
}


const userSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

const roomBodySchema = z.object({
  nome: z.string().min(5, "O nome deve ter pelo menos 5 caracteres").max(80),
  capacidade: z.number().int().positive("A capacidade deve ser maior que zero"),
  local: z.string().min(2, "O local deve ser preenchido"),
  descricao: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres")
});

const roomIdParamSchema = z.object({
  id: z.string().uuid("Formato de ID inválido. Deve ser um UUID válido.")
});


server.post('/register', {
  schema: { body: userSchema }
}, async (request, reply) => {
  const { email, password } = request.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return reply.status(400).send({ message: 'Este e-mail já está cadastrado.' });
  }

  // Criptografia da senha usando hash com salt de 10 rodadas
  const password_hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password_hash }
  });

  return reply.status(201).send({ message: 'Usuário cadastrado com sucesso.' });
});

server.post('/login', {
  schema: { body: userSchema }
}, async (request, reply) => {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return reply.status(401).send({ message: 'Credenciais inválidas.' });
  }

  // Comparação segura da senha digitada com o hash salvo no banco
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return reply.status(401).send({ message: 'Credenciais inválidas.' });
  }

  // Criação do token JWT injetando o ID do usuário no payload ("sub")
  const token = server.jwt.sign({ sub: user.id }, { expiresIn: '1d' });

  return reply.send({ token });
});


server.post('/rooms', {
  onRequest: [verifyJwt],
  schema: { body: roomBodySchema }
}, async (request, reply) => {
  const data = request.body;
  const newRoom = await prisma.room.create({ data });
  return reply.status(201).send(newRoom);
});

server.get('/rooms', {
  onRequest: [verifyJwt]
}, async (request, reply) => {
  const rooms = await prisma.room.findMany();
  return reply.send(rooms);
});


server.put('/rooms/:id', {
  onRequest: [verifyJwt],
  schema: { params: roomIdParamSchema, body: roomBodySchema }
}, async (request, reply) => {
  const { id } = request.params;
  const data = request.body;

  try {
    const updatedRoom = await prisma.room.update({ where: { id }, data });
    return reply.send(updatedRoom);
  } catch {
    return reply.status(404).send({ message: 'Sala não encontrada.' });
  }
});


server.delete('/rooms/:id', {
  onRequest: [verifyJwt],
  schema: { params: roomIdParamSchema }
}, async (request, reply) => {
  const { id } = request.params;

  try {
    await prisma.room.delete({ where: { id } });
    return reply.status(204).send();
  } catch {
    return reply.status(404).send({ message: 'Sala não encontrada.' });
  }
});


server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando perfeitamente e protegido com JWT em ${address}`);
});