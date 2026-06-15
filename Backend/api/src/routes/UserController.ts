import { prisma } from "../lib/prisma.js"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { createResponseSchema, createBodySchema, loginBodySchema, loginResponseSchema, updatePasswordBodySchema, userResponseSchema, updatePasswordResponseSchema } from "../schemas/userSchemas.js";
import { errorResponseSchema } from "../schemas/globalSchemas.js";
import { verifyJWT } from "../hooks/verifyJWT.js";

// 1. POST /register
// 2. POST /login
// 3. GET /user
// 4. PATCH /user/password

export const userController: FastifyPluginAsyncZod = async app => {

    app.post("/register", {
        schema: {
            body: createBodySchema,
            response: {
                201: createResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { name, email, password } = request.body

        try {
            const existsUser = await prisma.user.findUnique({
                where: { email }
            })

            if (existsUser) return reply.status(400).send({ error: "Esse e-mail já esta vinculado a uma conta" })

            const hashedPassword = await hashPassword(password)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })
            return reply.status(201).send(user)
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao criar usuário" })
        }
    })

    app.post("/login", {
        schema: {
            body: loginBodySchema,
            response: {
                201: loginResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {

        const { email, password } = request.body

        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) return reply.status(400).send({ error: "Esse usuário não existe" })

            const isPassword = await verifyPassword(password, user.password)

            if (!isPassword) return reply.status(400).send({ error: "Senha inválida" })

            const token = app.jwt.sign({
                id: user.id,
                email: user.email
            })
            return reply.status(201).send({ token })
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao efetuar login" })
        }
    })

    app.get("/user", {
        onRequest: [verifyJWT],
        schema: {
            response: {
                200: userResponseSchema,
                400: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const user = request.user as {
            id: string,
            email: string,
            iat: number
        }
        return reply.status(200).send(user)
    })

    app.patch("/user/password", {
        onRequest: [verifyJWT],
        schema: {
            body: updatePasswordBodySchema,
            response: {
                200: updatePasswordResponseSchema,
                400: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, async (request, reply) => {
        const { currentPassword, newPassword, confirmPassword } = request.body
        const user = request.user as {
            id: string,
            email: string,
            iat: number
        }
        const userID = user.id

        try {
            const user = await prisma.user.findUnique({
                where: {id: userID}
            })
            if(!user) return reply.status(404).send({error: "Usuário não encontrado"})

            const passwordMatches = await verifyPassword(currentPassword, user.password)
            if(!passwordMatches) return reply.status(400).send({error: "A senha atual está incorreta"})

            const newPasswordHashed = await hashPassword(newPassword) 

            const updatedUser = await prisma.user.update({
                where: {id: userID},
                data: {password: newPasswordHashed}
            })
            return reply.status(200).send(updatedUser)
        } catch (error) {
            return reply.status(500).send({error: "Erro ao atualizar senha"})
        }
    })
}
