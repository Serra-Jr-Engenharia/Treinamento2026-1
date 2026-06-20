import MemberCard from '../components/MemberCard'

export default function EquipePage() {
  const membros = [
    { membro: 'Membro 1', nome: 'Arthur', idade: 21, curso: 'Engenharia de computação' },
    { membro: 'Membro 2', nome: 'João Victor Esteves', idade: 21, curso: 'Engenharia de computação' },
    { membro: 'Membro 3', nome: 'Coreia', idade: 25, curso: 'Engenharia de computação' },
  ]

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-8 bg-white">
      <div className="flex flex-wrap justify-center gap-12">
        {membros.map((membro, index) => (
          <MemberCard
            key={index}
            membro={membro.membro}
            nome={membro.nome}
            idade={membro.idade}
            curso={membro.curso}
          />
        ))}
      </div>
    </div>
  )
}
