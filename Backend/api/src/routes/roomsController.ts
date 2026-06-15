import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma.js';
import z from "zod";
import bcrypt from 'bcrypt';

export const roomsController: FastifyPluginAsyncZod = async app => {

const authenticate = async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch {
    return reply.status(401).send({
      error: 'Não autorizado. Token inválido ou ausente.'
    })
  }
}
  app.post('/users', {
    schema: {
      body: z.object({
        nome: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6)
      })
    }
  }, async (request, reply) => {

    const { nome, email, password } = request.body;

    try {

      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return reply.status(400).send({
          error: 'Usuário já cadastrado com este e-mail.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          nome,
          email,
          password: hashedPassword
        }
      });

      return reply.status(201).send({
        message: 'Usuário criado com sucesso!',
        id: user.id
      });

    } catch {
      return reply.status(500).send({
        error: 'Erro ao cadastrar usuário.'
      });
    }
  });

  app.post('/login', {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    }
  }, async (request, reply) => {

    const { email, password } = request.body;

    try {

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return reply.status(400).send({
          error: 'Credenciais inválidas.'
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return reply.status(400).send({
          error: 'Credenciais inválidas.'
        });
      }

      const token = app.jwt.sign({
        id: user.id,
        nome: user.nome,
        email: user.email
      });

      return reply.status(200).send({
        token
      });

    } catch {
      return reply.status(500).send({
        error: 'Erro ao realizar login.'
      });
    }
  });

  app.post('/room', {
    preHandler: [authenticate],
    schema: {
      body: z.object({
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
  }, async (request, reply) => {

    const { nome, capacidade, local, descricao } = request.body;

    try {

      const novaSala = await prisma.room.create({
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      });

      return reply.status(201).send(novaSala);

    } catch {
      return reply.status(500).send({
        error: 'Erro ao adicionar sala.'
      });
    }
  });


  app.get('/room', {
    preHandler: [authenticate],
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
          error: z.string()
        })
      }
    }

  }, async (_, reply) => {

    try {
      const rooms = await prisma.room.findMany();
      reply.send(rooms);
    } catch {
      reply.status(500).send({
        error: 'Erro ao buscar sala.'
      });
    }
  });


  app.put('/room/:id', {
    preHandler: [authenticate],
    schema: {
      params: z.object({
        id: z.string()
      }),
      body: z.object({
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
          error: z.string()
        })
      }
    }

  }, async (request, reply) => {

    const { id } = request.params;
    const { nome, capacidade, local, descricao } = request.body;

    const roomId = parseInt(id);

    try {

      const salaAtt = await prisma.room.update({
        where: { id: roomId },
        data: {
          nome,
          capacidade,
          local,
          descricao
        }
      });

      return reply.status(200).send(salaAtt);

    } catch {
      return reply.status(500).send({
        error: 'Erro ao Atualizar sala.'
      });
    }
  });


  app.delete('/room/:id', {
    preHandler: [authenticate],
    schema: {
      params: z.object({
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

  }, async (request, reply) => {

    const { id } = request.params;
    const roomId = parseInt(id);

    try {

      await prisma.room.delete({
        where: { id: roomId }
      });

      return reply.status(200).send({
        message: 'Sala removida com sucesso!'
      });

    } catch {
      return reply.status(500).send({
        error: 'Erro ao remover sala.'
      });
    }
  });

}