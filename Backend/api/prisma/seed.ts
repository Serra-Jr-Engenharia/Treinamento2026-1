import { prisma } from '../src/lib/prisma.js'

async function main() {

    await prisma.roomLog.deleteMany()
    await prisma.room.deleteMany()

    const seed = [
        {
            name: 'Sala de Reunião 1',
            capacidade: 10,
            local: '1º andar',
            descricao: 'Sala equipada com projetor e quadro branco'
        },
        {
            name: 'Sala de Reunião 2',
            capacidade: 20,
            local: '2º andar',
            descricao: 'Sala ampla com videoconferência'
        },
        {
            name: 'Sala de Reunião 3',
            capacidade: 5,
            local: '3º andar',
            descricao: 'Sala pequena para reuniões rápidas'
        }
    ]

    for (const roomData of seed) {
        const Room = await prisma.room.create({
            data: roomData
        })

        await prisma.roomLog.create({
            data: {
                roomId: Room.id,
                action: 'SEED',
                changes: roomData
            }
        })
    }

    console.log('Seed concluída com sucesso!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })