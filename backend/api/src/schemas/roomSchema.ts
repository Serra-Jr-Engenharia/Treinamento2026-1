import { z } from 'zod'

export const roomSchema = z.object({
  nome: z
    .string()
    .min(5, 'O nome deve ter no minimo 5 caracteres')
    .max(20, 'O nome deve ter no maximo 20 caracteres'),

  capacidade: z
    .number()
    .min(1, 'A capacidade deve ser maior que 0'),

  local: z
    .string()
    .min(3, 'O local deve ter no minimo 3 caracteres'),

  descricao: z
    .string()
    .min(10, 'A descrição deve ter no minimo 10 caracteres')
})

export const roomParamsSchema = z.object({
  id: z.coerce.number().int().positive()
})