import 'dotenv/config'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

import roomsController from '../routes/RoomsController.js'
import authController from '../routes/AuthController.js'

const app = fastify()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!
})

app.register(authController)
app.register(roomsController)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro de validação',
      errors: error.flatten().fieldErrors
    })
  }

  console.error(error)

  return reply.status(500).send({
    message: 'Erro interno do servidor'
  })
})

app.listen({
  port: 3333,
  host: '0.0.0.0'
}).then(() => {
  console.log('🚀 API rodando na porta 3333')
})