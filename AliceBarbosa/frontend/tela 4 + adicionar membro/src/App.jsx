import { useState } from 'react'
import logo from './assets/logo.png'

const Header = () => (
  <header className="w-full h-23.25 bg-serra-orange flex items-center px-6 md:px-12 shadow-md">
    <img src={logo} alt="Logo Serra Jr" className="h-12 w-auto mr-4" />
    <h1 className="text-white text-2xl font-bold">Equipe Serra Jr</h1>
  </header>
);

const Footer = () => (
  <footer className="w-full h-20.75 bg-serra-orange flex justify-center items-center mt-auto">
    <p className="text-white text-sm font-semibold tracking-wide text-center px-4">
      COPYRIGHT © 2025 - SERRA JUNIOR ENGENHARIA
    </p>
  </footer>
);

const MemberCard = ({ index, nome, idade, curso }) => (
  <div className="relative bg-serra-blue w-full max-w-84 h-77.25 rounded-3xl flex flex-col justify-center items-center text-white shadow-xl mt-8 mx-auto hover:scale-105 transition-transform duration-300">
    <div className="absolute -top-6 bg-serra-orange px-8 py-2 rounded-2xl text-lg font-bold shadow-md">
      Membro {index + 1}
    </div>
    <div className="flex flex-col gap-4 text-center mt-4">
      <p className="text-lg font-semibold">{nome}</p>
      <p className="text-lg font-semibold">{idade}</p>
      <p className="text-lg font-semibold">{curso}</p>
    </div>
  </div>
);

export default function App() {
  const [membros, setMembros] = useState([
    { nome: 'Nome', idade: 'Idade', curso: 'Curso' },
    { nome: 'Nome', idade: 'Idade', curso: 'Curso' },
    { nome: 'Nome', idade: 'Idade', curso: 'Curso' },
  ]);

  const [novoMembro, setNovoMembro] = useState({ nome: '', idade: '', curso: '' });
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novoMembro.nome || !novoMembro.idade || !novoMembro.curso) return;
    
    setMembros([...membros, novoMembro]);
    setNovoMembro({ nome: '', idade: '', curso: '' }); 
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Header />

      <main className="flex-1 w-full max-w-341.5 mx-auto px-6 py-16 flex flex-col items-center">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 w-full justify-items-center">
          {membros.map((membro, index) => (
            <MemberCard 
              key={index} 
              index={index} 
              nome={membro.nome} 
              idade={membro.idade} 
              curso={membro.curso} 
            />
          ))}
        </div>

        {!mostrarFormulario ? (
          <button 
            onClick={() => setMostrarFormulario(true)}
            className="mt-16 text-serra-orange font-semibold hover:underline cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          >
            + Adicionar novo membro
          </button>
        ) : (
          <section className="mt-16 w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-serra-blue">Novo Membro</h2>
              <button 
                onClick={() => setMostrarFormulario(false)} 
                className="text-gray-400 hover:text-serra-orange font-bold cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input 
                  type="text" placeholder="Nome" 
                  className="p-3 border border-gray-300 rounded-lg outline-none focus:border-serra-orange"
                  value={novoMembro.nome} 
                  onChange={(e) => setNovoMembro({...novoMembro, nome: e.target.value})}
                />
                <input 
                  type="text" placeholder="Idade" 
                  className="p-3 border border-gray-300 rounded-lg outline-none focus:border-serra-orange"
                  value={novoMembro.idade} 
                  onChange={(e) => setNovoMembro({...novoMembro, idade: e.target.value})}
                />
                <input 
                  type="text" placeholder="Curso" 
                  className="p-3 border border-gray-300 rounded-lg outline-none focus:border-serra-orange"
                  value={novoMembro.curso} 
                  onChange={(e) => setNovoMembro({...novoMembro, curso: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-serra-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer mt-2">
                Adicionar à Equipe
              </button>
            </form>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}