import fastify from "fastify"
import { roomController } from "./routes/RoomController.js"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider, hasZodFastifySchemaValidationErrors, jsonSchemaTransform} from "fastify-type-provider-zod"
import { userController } from "./routes/UserController.js"
import fastifyJwt from "@fastify/jwt"
import { reservationController } from "./routes/ReservationController.js"
import { fastifySwagger } from "@fastify/swagger"
import ScalarApiReference from "@scalar/fastify-api-reference"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'API Trainee',
			description: 'API for SerraJr Trainee',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
	routePrefix: '/docs',
})

app.register(roomController)
app.register(userController)
app.register(reservationController)

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
    console.log('Servidor rodando em http://localhost:3000')
    console.log('Documentação em http://localhost:3000/docs')
})