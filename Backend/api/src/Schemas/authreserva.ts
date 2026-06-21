import { z } from 'zod'

export const reservaSchema = z.object({
  roomId: z.string().uuid(),
  date: z.coerce.date()
})