import 'dotenv/config'
import fastify from 'fastify'
import { ZodError } from 'zod'
import roomsController from '../routes/RoomsController.js'

const app = fastify()

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

app.listen({ port: 3333 })