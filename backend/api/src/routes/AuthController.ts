import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'

import { prisma } from '../lib/prisma.js'
import {
  createUserSchema,
  loginSchema
} from '../schemas/userSchema.js'

export default async function authController(
  app: FastifyInstance
) {

  app.post('/register', async (request, reply) => {
    const { nome, email, senha } =
      createUserSchema.parse(request.body)

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      return reply.status(400).send({
        error: 'Usuário já existe'
      })
    }

    const hash = await bcrypt.hash(senha, 10)

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hash
      }
    })

    return reply.status(201).send({
      id: user.id,
      nome: user.nome,
      email: user.email
    })
  }) // <-- fecha o /register

  app.post('/login', async (request, reply) => {
    const { email, senha } =
      loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return reply.status(401).send({
        error: 'Credenciais inválidas'
      })
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      user.senha
    )

    if (!senhaCorreta) {
      return reply.status(401).send({
        error: 'Credenciais inválidas'
      })
    }

    const token = app.jwt.sign({
      id: user.id,
      email: user.email
    })

    return {
      token
    }
  })
} 