import { type FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma.js";
import {z} from "zod";
import { hashPassword } from "./utilitarios/hash.js";

export function createUser(app: FastifyInstance) {

    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(), 
        password: z.string().min(8,"A senha deve possuir, ao menos, 8 caracteres...")
    })


    app.post("/user", async (req, res) => {
        const { name, email, password } = createUserSchema.parse(req.body);

        const existeUser = await prisma.user.findUnique({
            where: {email},
        });

        if(existeUser){
            return res.status(400).send({message:"O usuário já existe"})
        }

        const hashedPassword = await hashPassword(password)



        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).send(user);
    });
}