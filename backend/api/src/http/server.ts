import 'dotenv/config'
import fastify from 'fastify'
import roomsController from '../routes/RoomsController.js'

const app = fastify()

app.register(roomsController)

app.listen({ port: 3333 })