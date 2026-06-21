import { Link } from 'react-router-dom';
import Header from './Header'; // Importa o novo Header
import Footer from './Footer'; // Importa o novo Footer

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Desafios Trainee
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link 
            to="/tela4" 
            className="bg-[#ff6600] hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 text-center"
          >
            Tela - Semana 4
          </Link>

          <Link 
            to="/tela5" 
            className="bg-[#ff6600] hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 text-center"
          >
            Tela - Semana 5
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}