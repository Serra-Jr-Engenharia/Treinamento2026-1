import fastify from 'fastify'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.ts'
import salaRoutes from './routes/salas.ts'
import reservaRoutes from './routes/reserva.ts' 

dotenv.config()

const app = fastify()

if (!process.env.JWT_SECRET) {
  console.error("Erro crítico: JWT_SECRET não foi definido no arquivo .env")
  process.exit(1)
}

app.register(jwt, {
  secret: process.env.JWT_SECRET
})


app.register(authRoutes)
app.register(salaRoutes)
app.register(reservaRoutes)

app.get('/', async () => {
  return {
    success: true,
    message: 'Hello, Serra Jr!'
  }
})

app.listen(
  {
    port: 3000,
    host: '0.0.0.0'
  },
  (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server is running on ${address}`)
  }
)