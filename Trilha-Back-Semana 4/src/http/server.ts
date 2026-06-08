import fastify from 'fastify'
import {controlador_de_salas} from './controladordesalas.js'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(controlador_de_salas)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 servidor rodando')
})