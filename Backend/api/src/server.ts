import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { roomsController } from './routes/roomsController.js'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { reservationsController } from './routes/reservationsController.js'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyJwt, {
  secret: 'minha-chave-super-secreta'
})

app.get('/', () => {
  return { message: 'Hello, world' }
})

app.register(roomsController)
app.register(reservationsController)

app.listen({
  port: 3333,
  host: "0.0.0.0"
}, () => {
  console.log("O servidor ta rodando")
})