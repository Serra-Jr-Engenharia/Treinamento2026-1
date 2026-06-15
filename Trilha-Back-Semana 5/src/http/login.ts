import type { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma.js";
import {z} from "zod";
import { verifyPassword } from "./utilitarios/hash.js";

export function login(app: FastifyInstance) {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  app.post("/login", async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });


    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado" });
    }

    const isPassword = await verifyPassword(password, user.password);

    if (!isPassword) {
      return res.status(400).send({ message: "Senha incorreta" });
    }

const token = app.jwt.sign({
  id: user.id,
  user: user.email,
});

return res.status(200).send({ token });

  });
}
