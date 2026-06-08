import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const salaSchema = z.object({
  nome: z.string().min(5, "Nome deve ter no mínimo 5 caracteres").max(20, "Nome deve ter no máximo 20 caracteres"),
  capacidade: z.number().int("Capacidade deve ser um número inteiro").positive("Capacidade deve ser maior que zero"),
  local: z.string().min(1, "Local é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
});

export async function roomRoutes(app: FastifyInstance) {
  app.post("/room", async (request, reply) => {
    const result = salaSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({ errors: result.error.flatten().fieldErrors });
    }

    await prisma.room.create({ data: result.data });
    return reply.status(201).send({ message: "Sala criada com sucesso!" });
  });

  app.get("/room", async (request, reply) => {
    const salas = await prisma.room.findMany();
    if (salas.length === 0) {
      return reply.status(404).send({ error: "Nenhuma sala encontrada!" });
    }
    return reply.status(200).send(salas);
  });

  app.put("/room/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return reply.status(400).send({ error: "ID inválido!" });
    }

    const result = salaSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({ errors: result.error.flatten().fieldErrors });
    }

    const sala = await prisma.room.findUnique({ where: { id: idNum } });
    if (!sala) return reply.status(404).send({ error: "A sala não foi encontrada!" });

    await prisma.room.update({ where: { id: idNum }, data: result.data });
    return reply.status(200).send({ message: "Sala atualizada com sucesso!" });
  });

  app.delete("/room/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return reply.status(400).send({ error: "ID inválido!" });
    }

    const sala = await prisma.room.findUnique({ where: { id: idNum } });
    if (!sala) return reply.status(404).send({ error: "A sala não foi encontrada!" });

    await prisma.room.delete({ where: { id: idNum } });
    return reply.status(200).send({ message: "Sala removida com sucesso!" });
  });
}