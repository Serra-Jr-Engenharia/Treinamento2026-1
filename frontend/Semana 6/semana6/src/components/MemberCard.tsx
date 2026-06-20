import { useState } from 'react'
import { motion } from 'framer-motion'

interface MemberCardProps {
  membro: string
  nome: string
  idade: number
  curso: string
}

export default function MemberCard({ membro, nome, idade, curso }: MemberCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState({ nome, idade, curso })
  const [draft, setDraft] = useState({ nome, idade: String(idade), curso })

  const openEdit = () => {
    setDraft({ nome: saved.nome, idade: String(saved.idade), curso: saved.curso })
    setIsEditing(true)
  }

  const handleSave = () => {
    setSaved({ nome: draft.nome, idade: Number(draft.idade) || saved.idade, curso: draft.curso })
    setIsEditing(false)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ paddingTop: '28px' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white font-bold px-10 py-3 rounded-lg text-base shadow-lg whitespace-nowrap">
        {membro}
      </div>

      <div
        className="bg-[#001830] text-white flex flex-col items-center justify-center gap-4"
        style={{ width: '336px', height: '309px', borderRadius: '22px' }}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={draft.nome}
              onChange={(e) => setDraft((p) => ({ ...p, nome: e.target.value }))}
              placeholder="Nome"
              className="text-black px-3 py-1 rounded text-sm font-semibold text-center w-52"
            />
            <input
              type="number"
              value={draft.idade}
              onChange={(e) => setDraft((p) => ({ ...p, idade: e.target.value }))}
              placeholder="Idade"
              className="text-black px-3 py-1 rounded text-sm font-semibold text-center w-24"
            />
            <input
              type="text"
              value={draft.curso}
              onChange={(e) => setDraft((p) => ({ ...p, curso: e.target.value }))}
              placeholder="Curso / Ocupação"
              className="text-black px-3 py-1 rounded text-sm font-semibold text-center w-52"
            />
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleSave}
                className="px-5 py-1 bg-orange-500 text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 bg-white/20 text-white rounded text-sm font-semibold hover:bg-white/30 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="font-bold text-xl">{saved.nome}</p>
            <p className="font-bold text-xl">{saved.idade} anos</p>
            <p className="font-bold text-xl">{saved.curso}</p>
            <button
              onClick={openEdit}
              className="mt-1 px-5 py-1 bg-orange-500 text-white rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Editar
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}
