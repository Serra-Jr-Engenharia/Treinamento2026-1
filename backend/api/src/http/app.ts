import "dotenv/config"
import fastify, { FastifyError } from "fastify"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import fastifyJwt from "@fastify/jwt"

import { userRoutes } from "../routes/user.routes.js"
import { roomRoutes } from "../routes/room.routes.js"
import { reservationRoutes } from "../routes/reservations.routes.js" 
export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

if (!process.env.JWT_SECRET) {
  throw new Error("ERRO CRÍTICO: JWT_SECRET não está definido no arquivo .env!")
}

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
})

app.setErrorHandler((error: FastifyError, request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      message: 'Erro de validação nos dados.',
      issues: error.validation.map((issue: any) => ({ campo: issue.instancePath, mensagem: issue.message }))
    })
  }
  console.error(error)
  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})

app.register(userRoutes)
app.register(roomRoutes)
app.register(reservationRoutes)