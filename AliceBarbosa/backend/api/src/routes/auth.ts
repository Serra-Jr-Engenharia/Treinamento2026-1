import type { FastifyInstance } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';


declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign: (payload: { sub: string }, options?: { expiresIn?: string }) => string;
    };
  }
}


const authBodySchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

export async function authRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post('/register', {
    schema: { body: authBodySchema }
  }, async (request, reply) => {
    const { email, password } = request.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return reply.status(400).send({ message: 'Este e-mail já está cadastrado.' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password_hash }
    });

    return reply.status(201).send({ message: 'Usuário cadastrado com sucesso.' });
  });

  
  server.post('/login', {
    schema: { body: authBodySchema }
  }, async (request, reply) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
    
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

  
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

    
    const token = server.jwt.sign({ sub: user.id }, { expiresIn: '1d' });

    return reply.send({ token });
  });
}