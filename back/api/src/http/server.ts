import fastify from "fastify";
import { roomRoutes } from "../routes/room";

const app = fastify();

app.register(roomRoutes);

app.get("/", () => "Hello NLW");

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
