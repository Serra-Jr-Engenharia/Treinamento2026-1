import { z } from 'zod'

export const createReservationSchema = z.object({
  roomId: z.number(),
  data: z.string().datetime()
})

export const reservationParamsSchema = z.object({
  id: z.coerce.number().int().positive()
})

export const updateReservationSchema = z.object({
  data: z.string().datetime()
})