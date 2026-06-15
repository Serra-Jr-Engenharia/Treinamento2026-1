import fastify from "fastify"
import { roomController } from "./routes/RoomController.js"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider, hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod"
import { userController } from "./routes/UserController.js"
import fastifyJwt from "@fastify/jwt"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(roomController)
app.register(userController)

app.setErrorHandler((error, _, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
        const firstError = error.validation[0]

        return reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: firstError.message
        })
    }
    return reply.send(error)
})

const jwtToken = process.env.JWT_TOKEN

if (!jwtToken) throw new Error("JWT_TOKEN não definido")

app.register(fastifyJwt, {
    secret: jwtToken
})

app.listen({ port: 3000 }).then(() => {
    console.log('Servidor rodando na porta 3000')
})