import "dotenv/config" 
import fastify, { FastifyError } from "fastify" 
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { z } from "zod"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from "fastify-type-provider-zod"
import fastifyJwt from "@fastify/jwt"
import bcrypt from "bcryptjs"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'chave-secreta' 
})

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

const roomBodySchema = z.object({
  nome: z.string().min(5, 'O nome deve ter no mínimo 5 caracteres').max(20, 'O nome deve ter no máximo 20 caracteres'),
  capacidade: z.number().int().min(2, 'A capacidade mínima é de 2 pessoas').max(100, 'A capacidade máxima é de 100 pessoas'),
  local: z.string().min(1, 'O local não pode ser vazio'),
  descricao: z.string().min(1, 'A descrição não pode ser vazia')
})

const roomIdParamSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID válido.')
})

const userBodySchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

const loginBodySchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string()
})

 const updatePasswordBodySchema = z.object({
  senhaAntiga: z.string().min(1, 'A senha antiga é obrigatória'),
  senhaNova: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres')
})

app.setErrorHandler((error: FastifyError, request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      message: 'Erro de validação nos dados enviados.',
      issues: error.validation.map((issue: any) => ({
        campo: issue.instancePath,
        mensagem: issue.message
      }))
    })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})

app.post('/users', {
  schema: { body: userBodySchema }
}, async (request, reply) => {
  const { nome, email, password } = request.body

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) {
    return reply.status(400).send({ error: 'Usuário já cadastrado com este e-mail.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      nome,
      email,
      password: hashedPassword
    }
  })

  return reply.status(201).send({ message: 'Usuário criado com sucesso!', id: user.id })
})

app.post('/login', {
  schema: { body: loginBodySchema }
}, async (request, reply) => {
  const { email, password } = request.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return reply.status(400).send({ error: 'Credenciais inválidas.' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return reply.status(400).send({ error: 'Credenciais inválidas.' })
  }

  const token = app.jwt.sign({
    nome: user.nome,
    email: user.email
  }, {
    sub: user.id, 
    expiresIn: '7d' 
  })

  return reply.status(200).send({ token })
})

app.register(async (appFastify) => {
  const appAuth = appFastify.withTypeProvider<ZodTypeProvider>()

  appAuth.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send({ message: 'Não autorizado. Token inválido ou ausente.' })
    }
  })

  appAuth.patch('/users/password', {
    schema: { body: updatePasswordBodySchema }
  }, async (request, reply) => {
    const { senhaAntiga, senhaNova } = request.body

    const userId = (request.user as { sub: string }).sub

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado.' })
    }

    const isPasswordValid = await bcrypt.compare(senhaAntiga, user.password)

    if (!isPasswordValid) {
      return reply.status(400).send({ error: 'A senha antiga está incorreta.' })
    }

    const hashedNewPassword = await bcrypt.hash(senhaNova, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })

    return reply.status(200).send({ message: 'Senha atualizada com sucesso!' })
  })

  // 1. POST /room
  appAuth.post('/room', { 
    schema: { body: roomBodySchema } 
  }, async (request, reply) => {
    const { nome, capacidade, local, descricao } = request.body 

    const novaRoom = await prisma.room.create({
      data: { nome, capacidade, local, descricao }
    })

    return reply.status(201).send({ message: 'Sala criada com sucesso!', room: novaRoom })
  })

  // 2. GET /room
  appAuth.get('/room', async (request, reply) => {
    const allRooms = await prisma.room.findMany()
    return reply.send(allRooms)
  })

  // 3. PUT /room/:id
  appAuth.put('/room/:id', {
    schema: {
      params: roomIdParamSchema,
      body: roomBodySchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { nome, capacidade, local, descricao } = request.body 

    try {
      const salaAtualizada = await prisma.room.update({
        where: { id },
        data: { nome, capacidade, local, descricao }
      })
      return reply.send(salaAtualizada)
    } catch (error) {
      return reply.status(404).send({ error: 'Sala não encontrada.' })
    }
  })

  // 4. DELETE /room/:id
  appAuth.delete('/room/:id', {
    schema: { params: roomIdParamSchema }
  }, async (request, reply) => {
    const { id } = request.params

    try {
      await prisma.room.delete({ where: { id } })
      return reply.status(200).send({ message: 'Sala removida com sucesso! '})
    } catch (error) {
      return reply.status(404).send({ error: 'Sala não encontrada.' })
    }
  })

  // EXTRA (GET /room/:id)
  appAuth.get('/room/:id', {
    schema: { params: roomIdParamSchema }
  }, async (request, reply) => {
    const { id } = request.params

    const room = await prisma.room.findUnique({ where: { id } })

    if (!room) {
      return reply.status(404).send({ error: 'Sala não encontrada.' })
    }

    return reply.send(room)
  })
})

