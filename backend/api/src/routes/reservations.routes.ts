import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { ReservationService } from "../services/reservation.service.js"

const reservationBodySchema = z.object({
  roomId: z.string().uuid('ID da sala inválido.'),
  inicio: z.string().datetime('A data e hora de início devem estar no formato ISO (ex: 2026-07-20T14:00:00Z).'),
  fim: z.string().datetime('A data e hora de fim devem estar no formato ISO (ex: 2026-07-20T15:00:00Z).')
})

const reservationUpdateSchema = z.object({
  inicio: z.string().datetime('A data e hora de início devem estar no formato ISO.'),
  fim: z.string().datetime('A data e hora de fim devem estar no formato ISO.')
})

const reservationParamSchema = z.object({
  id: z.string().uuid('ID da reserva inválido.')
})

export async function reservationRoutes(app: FastifyInstance) {
  const appAuth = app.withTypeProvider<ZodTypeProvider>()

  // Protege as rotas de reserva
  appAuth.addHook('onRequest', async (request, reply) => {
    try { await request.jwtVerify() } catch { return reply.status(401).send({ message: 'Não autorizado.' }) }
  })

  appAuth.post('/reservations', { schema: { body: reservationBodySchema } }, async (request, reply) => {
    try {
      const userId = (request.user as { sub: string }).sub
      const novaReserva = await ReservationService.criar(userId, request.body.roomId, request.body.inicio, request.body.fim)
      return reply.status(201).send({ message: 'Reserva criada com sucesso!', reserva: novaReserva })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message }) // Captura o erro se o horário já estiver ocupado
      }
      return reply.status(500).send({ error: 'Erro interno no servidor.' })
    }
  })

  appAuth.get('/reservations', async (request, reply) => {
    const userId = (request.user as { sub: string }).sub
    const reservas = await ReservationService.buscarPorUsuario(userId)
    return reply.send(reservas)
  })

  appAuth.delete('/reservations/:id', { schema: { params: reservationParamSchema } }, async (request, reply) => {
    try {
      const userId = (request.user as { sub: string }).sub
      await ReservationService.cancelar(request.params.id, userId)
      return reply.status(200).send({ message: 'Reserva cancelada com sucesso!' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message })
      }
      return reply.status(500).send({ error: 'Erro interno no servidor.' })
    }
  })

  appAuth.patch('/reservations/:id', { schema: { params: reservationParamSchema, body: reservationUpdateSchema } }, async (request, reply) => {
    try {
      const userId = (request.user as { sub: string }).sub
      const reservaAtualizada = await ReservationService.alterar(request.params.id, userId, request.body.inicio, request.body.fim)
      return reply.send({ message: 'Horário alterado!', reserva: reservaAtualizada })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message })
      }
      return reply.status(500).send({ error: 'Erro interno no servidor.' })
    }
  })
}