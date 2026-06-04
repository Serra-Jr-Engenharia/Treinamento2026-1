import Header from "./components/Header";
import MemberCard from "./components/MemberCard";
import Footer from "./components/Footer";

function App() {
  const membros = [
    {
      membro: "Membro 1",
      nome: "João Vitor",
      idade: 21,
      curso: "Engenharia"
    },
    {
      membro: "Membro 2",
      nome: "Ana Clara",
      idade: 22,
      curso: "Computação"
    },
    {
      membro: "Membro 3",
      nome: "Arthur",
      idade: 20,
      curso: "Produção"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Header />

      <main className="flex-1 flex justify-center items-center">
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
      </main>

      <Footer />

    </div>
  );
}

export default App;