import fastify from 'fastify'
import {roomsController} from '../routes/roomsController.ts';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(roomsController)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running on port 3333!')
}).catch((err) => {
    console.error('Server failed to start:', err)
    process.exit(1)
})
