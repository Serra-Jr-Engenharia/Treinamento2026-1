import { prisma } from '../src/lib/prisma.js'

async function main() {

    // Deseja deletar ou atualizar todos as linhas dos bancos de dados? 0 = False (Atualizar), 1 = True (Deletar)
    let DELETE_ALL_DB = 1;

    if (DELETE_ALL_DB == 1) {
        await prisma.roomLog.deleteMany()
        await prisma.room.deleteMany()
        await prisma.user.deleteMany()
    }

    const roomsSeed = [
        {
            id: 'd0219457-f2fa-4a27-83bf-25fd15044cbb',
            name: 'Sala de Reunião 1',
            capacidade: 10,
            local: '1º andar',
            descricao: 'Sala equipada com projetor e quadro branco'
        },
        {
            id: '5b6f2272-1411-4972-9bb3-16c16760b0aa',
            name: 'Sala de Reunião 2',
            capacidade: 20,
            local: '2º andar',
            descricao: 'Sala ampla com videoconferência'
        },
        {
            id: 'f5466108-82ed-49b0-aafb-8f1d0d9b2816',
            name: 'Sala de Reunião 3',
            capacidade: 5,
            local: '3º andar',
            descricao: 'Sala pequena para reuniões rápidas'
        }
    ]

    const userSeed = [
        {
            name: "Usuario 1",
            email: "usuario1@teste.com",
            password: "usuario1"
        },
        {
            name: "Usuario 2",
            email: "usuario2@teste.com",
            password: "usuario2"
        },
        {
            name: "Usuario 3",
            email: "usuario3@teste.com",
            password: "usuario3"
        },
    ]

    for (const roomData of roomsSeed) {
        const Room = await prisma.room.upsert({
            where: { id: roomData.id },
            update: {},
            create: roomData
        })

        await prisma.roomLog.create({
            data: {
                roomId: Room.id,
                action: 'SEED',
                changes: roomData
            }
        })
    }

    for (const userData of userSeed) {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: userData
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