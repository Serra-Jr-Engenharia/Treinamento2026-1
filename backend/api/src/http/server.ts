import fastify from "fastify";
import { roomsController } from "../routes/roomsController.ts";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createUser } from "../routes/createUser.ts";
import fastifyJwt from "@fastify/jwt";
import { login } from "../routes/login.ts";
import { profile } from "../routes/profile.ts";
import { roomReservation } from "../routes/roomReservation.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyJwt, { secret: "MOTB4Kaaei0Ha59T" });
app.register(createUser);
app.register(login);
app.register(profile);
app.register(roomsController);
app.register(roomReservation);

app
  .listen({ port: 3333 })
  .then(() => {
    console.log("HTTP server running on port 3333!");
  })
  .catch((err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
