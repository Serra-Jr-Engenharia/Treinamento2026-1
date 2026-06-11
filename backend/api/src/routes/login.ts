import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { verifyPassword } from "../utils/hash.ts";

export function login(app: FastifyInstance) {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  app.post("/login", async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    const isPassword = await verifyPassword(password, user.password);

    if (!isPassword) {
      return reply.status(401).send({ error: "Email ou senha incorretos" });
    }

    const token = app.jwt.sign({ id: user.id, email: user.email });

    return reply.status(200).send({ token });
  });
}
