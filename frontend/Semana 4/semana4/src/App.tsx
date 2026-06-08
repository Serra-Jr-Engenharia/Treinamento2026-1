import Header from "./components/Header";
import MemberCard from "./components/MemberCard";
import Footer from "./components/Footer";

function App() {
  const membros = [
    {
      membro: "Membro 1",
      nome: "Arthur",
      idade: 21,
      curso: "Engenharia de computação"
    },
    {
      membro: "Membro 2",
      nome: "João Victor Esteves",
      idade: 21,
      curso: "Engenharia de computação"
    },
    {
      membro: "Membro 3",
      nome: "Coreia",
      idade: 25,
      curso: "Engenharia de computação"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff]">

      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-8">
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
