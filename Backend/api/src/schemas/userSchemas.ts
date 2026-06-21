import z from "zod"

export const createBodySchema = z.object({
    name: z.string("O nome de usuário é obrigatório"),
    email: z.email("O email é obrigatório"),
    password: z.string().min(8, "A senha deve possuir no mínimo 8 caracteres")
})

export const createResponseSchema = z.object({
    name: z.string(),
    email: z.email()
})

export const loginBodySchema = z.object({
    email: z.email(),
    password: z.string()
})

export const loginResponseSchema = z.object({
    token: z.string()
})

export const userResponseSchema = z.object({
    id: z.string(),
    email: z.email(),
    iat: z.number()
})

export const updatePasswordBodySchema = z.object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória"),
    newPassword: z.string().min(8, "A nova senha deve possuir 8 caracteres"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "A nova senha e a confirmação não coincidem",
  path: ["confirmPassword"]
})

export const updatePasswordResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email()
})