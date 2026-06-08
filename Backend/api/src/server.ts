import fastify from 'fastify'
import { roomsController } from './routes/roomsController.js'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/', () => {
  return {message: 'Hello, world'}
})

app.register(roomsController)

app.listen({ port: 3333}, ()=>{
    console.log('O servidor ta rodando')
})