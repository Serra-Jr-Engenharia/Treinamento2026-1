import { z } from 'zod'

export const salaSchema = z.object({
  nome: z
    .string()
    .min(5)
    .max(20),

  capacidade: z
    .number()
    .int()
    .positive(),

  local: z
    .string()
    .min(2)
    .max(50),

  descricao: z
    .string()
    .min(2)
    .max(200)
})