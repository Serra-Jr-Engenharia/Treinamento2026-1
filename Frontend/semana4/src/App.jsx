import Header from './components/Header'
import Footer from './components/Footer'
import MemberCard from './components/MemberCard'

function App() {
  const membros = [
    {
      id: 1,
      nome: 'Nome',
      idade: 'Idade',
      curso: 'Curso',
    },
    {
      id: 2,
      nome: 'Nome',
      idade: 'Idade',
      curso: 'Curso',
    },
    {
      id: 3,
      nome: 'Nome',
      idade: 'Idade',
      curso: 'Curso',
    },
  ]

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col">

      <Header />

      <main className="flex-1 flex justify-center items-center gap-12">
        {membros.map((membro) => (
          <MemberCard
            key={membro.id}
            membro={`Membro ${membro.id}`}
            nome={membro.nome}
            idade={membro.idade}
            curso={membro.curso}
          />
        ))}
      </main>

      <Footer />

    </div>
  )
}

export default App