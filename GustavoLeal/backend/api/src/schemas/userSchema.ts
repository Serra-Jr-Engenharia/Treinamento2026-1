import { z } from 'zod'

export const createUserSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6)
})

export const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6)
})