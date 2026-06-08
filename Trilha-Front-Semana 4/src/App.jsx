import Header from "./componentes/barraTop";
import Card from "./componentes/cards";
import Footer from "./componentes/barracopright";

function App() {
  return (
    <div className="min-h-screen flex flex-col text-white font-['Poppins']">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="flex gap-20">
          <Card membro="Membro 1" />
          <Card membro="Membro 2" />
          <Card membro="Membro 3" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
