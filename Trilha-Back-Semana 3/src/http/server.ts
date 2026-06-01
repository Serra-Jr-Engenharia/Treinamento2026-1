import fastify from 'fastify'
import controlador_de_salas from './controladordesalas.js'

const app = fastify()

app.register(controlador_de_salas)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 servidor rodando')
})