import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'

import { prisma } from '../lib/prisma.ts'
import {
  registerSchema,
  loginSchema
} from '../Schemas/authschema.ts'

export default async function authRoutes(
  app: FastifyInstance
) {

  app.post('/register', async (request, reply) => {
    const { nome, email, password } = registerSchema.parse(request.body)

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return reply.status(400).send({
        success: false,
        message: 'Email já cadastrado'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...userSemSenha } = user

    return reply.status(201).send({
      success: true,
      user: userSemSenha
    })
  })

  app.post('/login', async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return reply.status(401).send({
        success: false,
        message: 'Credenciais inválidas'
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return reply.status(401).send({
        success: false,
        message: 'Credenciais inválidas'
      })
    }

   
    const token = app.jwt.sign(
      { email: user.email },
      { sub: user.id }
    )

    return reply.send({
      success: true,
      token
    })
  })
}