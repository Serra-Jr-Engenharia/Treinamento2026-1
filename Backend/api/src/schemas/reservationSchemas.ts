import z from "zod";

export const reservationBodySchema = z.object({
    roomId: z.string(),
    userId: z.string(),
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
})

export const reservationResponseSchema = z.object({
    id: z.string(),
    roomId: z.string(),
    userId: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    createdAt: z.date()
})

export const userReservationsParamsSchema = z.object({
    userId: z.string()
})

export const userReservationResponseSchema = z.array(
    z.object({
        id: z.string(),
        roomId: z.string(),
        userId: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        createdAt: z.date()
    })
)

export const idReservationsParamsSchema = z.object({
    id: z.string()
})

export const patchReservationBodySchema = z.object({
    startTime: z.iso.datetime().optional(),
    endTime: z.iso.datetime().optional(),
})

export const patchReservationResponseSchema = z.object({
    id: z.string(),
    roomId: z.string(),
    userId: z.string(),
    startTime: z.date(),
    endTime: z.date()
})

export const roomReservationsParamsSchema = z.object({
    roomId: z.string()
})

export const roomReservationResponseSchema = z.array(
    z.object({
        id: z.string(),
        roomId: z.string(),
        userId: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        createdAt: z.date()
    })
)