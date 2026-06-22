import { prisma } from "../lib/prisma.js"
import bcrypt from "bcryptjs"

export const UserService = {
  async criar(data: any) {
    const userExists = await prisma.user.findUnique({ where: { email: data.email } })
    if (userExists) throw new Error("Usuário já cadastrado com este e-mail.")

    const hashedPassword = await bcrypt.hash(data.password, 10)
    return prisma.user.create({
      data: { nome: data.nome, email: data.email, password: hashedPassword }
    })
  },

  async buscarPorEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async atualizarSenha(userId: string, antiga: string, nova: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error("Usuário não encontrado.")

    const isPasswordValid = await bcrypt.compare(antiga, user.password)
    if (!isPasswordValid) throw new Error("A senha antiga está incorreta.")

    const hashedNewPassword = await bcrypt.hash(nova, 10)
    return prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })
  }
}