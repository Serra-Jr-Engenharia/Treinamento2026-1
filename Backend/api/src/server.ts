import fastify from 'fastify'
import roomsController from './routes/roomsController.js'

const app = fastify()

app.get('/', () => {
  return {message: 'Hello, world'}
})

app.register(roomsController)

app.listen({ port: 3333}, ()=>{
    console.log('O servidor ta rodando')
})