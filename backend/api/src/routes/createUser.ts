import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashPassword } from "../utils/hash.ts";

export function createUser(app: FastifyInstance) {
  const createUserSchemaBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const createUserSchemaResponse = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  });

  app.post(
    "/user",
    {
      schema: {
        body: createUserSchemaBody,
        response: {
          201: createUserSchemaResponse,
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = createUserSchemaBody.parse(
        request.body,
      );

      const existeUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existeUser) {
        return reply.status(500).send({ error: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      try {
        const newUser = await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });
        reply.status(201).send(newUser);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao adicionar usuário" });
      }
    },
  );
}
