import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";

export async function reservationRoutes(app:FastifyInstance) {
    app.addHook("onRequest",async (req, res)=>{
        try{
            await req.jwtVerify();
        } catch (error) {
            return res.status(401).send({error: "Token errado ou ausente!"});
        }
    });

    app.post("/reservation",async (req,res)=>{
        const reservationSchema = z.object({
            roomId: z.number().int().positive(),
            date: z.string(),
            startTime: z.string(),
            endTime: z.string(),
        });

        const { roomId, date, startTime, endTime } = reservationSchema.parse(req.body);
        const user = req.user as { id: number };
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);

        const conflito = await prisma.reservation.findFirst({
            where: {
                roomId,
                AND: [
                    { startTime: { lt: end } },
                    { endTime: { gt: start } },
                ],
            },
        });
        
        if (conflito) {
            return res.status(409).send({ error: "Já existe uma reserva nesse horário!" });
        }

        const reservation = await prisma.reservation.create({
            data: {
            userId: user.id,
            roomId,
            date: new Date(date),
            startTime: start,
            endTime: end,
            },
        });

        return res.status(201).send(reservation);
    });

    app.get("/reservation", async (req, res) => {
        const user = req.user as { id: number };

        const reservations = await prisma.reservation.findMany({
            where: { userId: user.id },
            include: { room: true },
        });

        if (reservations.length === 0) {
        return res.status(404).send({ error: "Nenhuma reserva encontrada!" });
        }

        return res.status(200).send(reservations);
    });

    app.put("/reservation/:id", async (req, res) => {
        const { id } = req.params as { id: string };
        const idNum = Number(id);

        const reservationSchema = z.object({
            date: z.string(),
            startTime: z.string(),
            endTime: z.string(),
        });

        const { date, startTime, endTime } = reservationSchema.parse(req.body);
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);

        const reservation = await prisma.reservation.findUnique({ where: { id: idNum } });
        if (!reservation) {
            return res.status(404).send({ error: "Reserva não encontrada!" });
        }

        const conflito = await prisma.reservation.findFirst({
            where: {
                roomId: reservation.roomId,
                id: { not: idNum },
                AND: [
                    { startTime: { lt: end } },
                    { endTime: { gt: start } },
                ],
            },
        });

        if (conflito) {
            return res.status(409).send({ error: "Já existe uma reserva nesse horário!" });
        }

        const updated = await prisma.reservation.update({
            where: { id: idNum },
            data: {
            date: new Date(date),
            startTime: start,
            endTime: end,
            },
        });

        return res.status(200).send(updated);
    });

    app.delete("/reservation/:id", async (req, res) => {
        const { id } = req.params as { id: string };
        const idNum = Number(id);
    
        const reservation = await prisma.reservation.findUnique({ where: { id: idNum } });
        if (!reservation) {
            return res.status(404).send({ error: "Reserva não encontrada!" });
        }
        
        await prisma.reservation.delete({ where: { id: idNum } });
        return res.status(200).send({ message: "Reserva cancelada com sucesso!" });
    });
}