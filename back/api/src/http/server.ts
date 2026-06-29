import fastify from "fastify";
import { roomRoutes } from "../routes/room";
import {createUser} from "../routes/createuser";
import {login} from "../routes/login";
import profile from "../routes/profile";
import fastifyJwt from "fastify-jwt";
import { reservationRoutes } from "../routes/reservation";

const app = fastify();

app.register(roomRoutes);
app.register(createUser);
app.register(login);
app.register(profile);
app.register(reservationRoutes);

app.register(fastifyJwt, {
  secret:"secret",
})

app.get("/", async (req, reply) => {
  return reply.send("Hello NLW");
});

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});

