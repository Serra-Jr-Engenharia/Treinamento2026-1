import z from "zod"

export const createRoomBodySchema = z.object({
    name: z.string("O nome da sala é obrigatório"),
    capacidade: z.number("A capacidade da sala deve ser um número obrigatoriamente")
        .int("A capacidade deve ser um número inteiro")
        .positive("A capacidade deve ser um número positivo")
        .min(1, "A capacidade mínima é 1")
        .max(50, "A capacidade máxima é 50"),
    local: z.string("O local da sala é obrigatório"),
    descricao: z.string().nullable().optional()
})

export const roomResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    capacidade: z.number(),
    local: z.string(),
    descricao: z.string().nullable()
})

export const getAllRoomsResponseSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        capacidade: z.number(),
        local: z.string(),
        descricao: z.string().nullable()
    })
)

export const getRoomsLogResponseSchema = z.array(
    z.object({
        id: z.string(),
        roomId: z.string(),
        action: z.string(),
        changes: z.unknown(),
        timestamp: z.date()
    })
)

export const updateRoomsBodySchema = z.object({
    name: z.string().optional(),
    capacidade: z.number("A capacidade deve ser um número obrigatoriamente")
        .int("A capacidade deve ser um número inteiro")
        .positive("A capacidade deve ser um número positivo")
        .min(1, "A capacidade mínima é 1")
        .max(50, "A capacidade máxima é 50")
        .optional(),
    local: z.string().optional(),
    descricao: z.string().nullable().optional()
})

export const deleteResponseSchema = z.object({
    message: z.string()
})