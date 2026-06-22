import fastify, { type FastifyRequest, type FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { reservationRoutes } from './routes/reservations.js';
import { authRoutes } from './routes/auth.js';
import { roomRoutes } from './routes/rooms.js';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'fallback_xs'
});

server.decorate('verifyJwt', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: 'Acesso negado. Token inválido ou não fornecido.' });
  }
});

server.register(authRoutes);
server.register(reservationRoutes);
server.register(roomRoutes);

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor modular rodando perfeitamente em ${address}`);
});