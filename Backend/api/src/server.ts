import fastify from "fastify";
import { roomController } from "./routes/RoomController.js";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider, hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(roomController)

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

app.listen({port: 3000}).then(() => {
    console.log('Servidor rodando na porta 3000')
})