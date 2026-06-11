import type { FastifyInstance } from "fastify";

export function profile(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.status(401).send({ error: "Não autorizado" });
    }
  });

  app.get("/profile", async (request) => {
    return request.user;
  });
}
