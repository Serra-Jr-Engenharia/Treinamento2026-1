import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Bem-vindo(a) aos projetos Trainee de João Esteves!</h1>
            <p className="text-lg mb-4">Explore os projetos de semanas antigas.</p>
            <div className="flex gap-4">
                <Link to="/semana4" className="bg-orange-500 hover:bg-[#001830] text-white font-bold py-2 px-4 rounded">
                    Semana 4
                </Link>
                <Link to="/semana5" className="bg-orange-500 hover:bg-[#001830] text-white font-bold py-2 px-4 rounded">
                    Semana 5
                </Link>
            </div>
        </div>
    );
}