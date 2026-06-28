import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { UserService } from "../services/user.service.js"
import bcrypt from "bcryptjs"

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

export async function userRoutes(app: FastifyInstance) {
  const appTyped = app.withTypeProvider<ZodTypeProvider>()

  appTyped.post('/users', { schema: { body: userBodySchema } }, async (request, reply) => {
    try {
      const user = await UserService.criar(request.body)
      return reply.status(201).send({ message: 'Usuário criado!', id: user.id })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message })
      }
      return reply.status(500).send({ error: 'Erro interno no servidor.' })
    }
  })

  appTyped.post('/login', { schema: { body: loginBodySchema } }, async (request, reply) => {
    const { email, password } = request.body
    const user = await UserService.buscarPorEmail(email)
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(400).send({ error: 'Credenciais inválidas.' })
    }

    const token = app.jwt.sign({ nome: user.nome, email: user.email }, { sub: user.id, expiresIn: '7d' })
    return reply.status(200).send({ token })
  })

  appTyped.register(async (authScope) => {
    const authTyped = authScope.withTypeProvider<ZodTypeProvider>()

    authTyped.addHook('onRequest', async (request, reply) => {
      try { await request.jwtVerify() } catch { return reply.status(401).send({ message: 'Não autorizado.' }) }
    })

    authTyped.patch('/users/password', { schema: { body: updatePasswordBodySchema } }, async (request, reply) => {
      try {
        const userId = (request.user as { sub: string }).sub
        await UserService.atualizarSenha(userId, request.body.senhaAntiga, request.body.senhaNova)
        return reply.status(200).send({ message: 'Senha atualizada com sucesso!' })
      } catch (error: unknown) {
        if (error instanceof Error) {
          return reply.status(400).send({ error: error.message })
        }
        return reply.status(500).send({ error: 'Erro interno no servidor.' })
      }
    })
  })
}