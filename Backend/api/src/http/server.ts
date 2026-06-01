import fastify from "fastify";
import RoomController from "../routes/RoomController.js";

const app = fastify();

app.register(RoomController)

app.listen({port: 3000}).then(() => {
    console.log('Servidor rodando na porta 3000')
})