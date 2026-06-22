import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { RoomService } from "../services/room.service.js"

const roomBodySchema = z.object({
  nome: z.string().min(5, 'O nome deve ter no mínimo 5 caracteres').max(20, 'O nome deve ter no máximo 20 caracteres'),
  capacidade: z.number().int().min(2, 'A capacidade mínima é de 2 pessoas').max(100, 'A capacidade máxima é de 100 pessoas'),
  local: z.string().min(1, 'O local não pode ser vazio'),
  descricao: z.string().min(1, 'A descrição não pode ser vazia')
})

const roomIdParamSchema = z.object({
  id: z.string().uuid('ID inválido. Deve ser um UUID válido.')
})

export async function roomRoutes(app: FastifyInstance) {
  const appAuth = app.withTypeProvider<ZodTypeProvider>()

  // Protege todas as rotas de sala para exigir o token JWT
  appAuth.addHook('onRequest', async (request, reply) => {
    try { await request.jwtVerify() } catch { return reply.status(401).send({ message: 'Não autorizado.' }) }
  })

  appAuth.post('/room', { schema: { body: roomBodySchema } }, async (request, reply) => {
    const novaRoom = await RoomService.criar(request.body)
    return reply.status(201).send({ message: 'Sala criada com sucesso!', room: novaRoom })
  })

  appAuth.get('/room', async (request, reply) => {
    return reply.send(await RoomService.listarTodas())
  })

  appAuth.get('/room/:id', { schema: { params: roomIdParamSchema } }, async (request, reply) => {
    const room = await RoomService.buscarPorId(request.params.id)
    if (!room) return reply.status(404).send({ error: 'Sala não encontrada.' })
    return reply.send(room)
  })

  appAuth.put('/room/:id', { schema: { params: roomIdParamSchema, body: roomBodySchema } }, async (request, reply) => {
    try {
      const salaAtualizada = await RoomService.atualizar(request.params.id, request.body)
      return reply.send(salaAtualizada)
    } catch {
      return reply.status(404).send({ error: 'Sala não encontrada.' })
    }
  })

  appAuth.delete('/room/:id', { schema: { params: roomIdParamSchema } }, async (request, reply) => {
    try {
      await RoomService.deletar(request.params.id)
      return reply.status(200).send({ message: 'Sala removida com sucesso!' })
    } catch {
      return reply.status(404).send({ error: 'Sala não encontrada.' })
    }
  })
}