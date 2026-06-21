import { Link } from "react-router-dom"

function Home() {
    const semanas = [
        {
            id: 1,
            rota: "/semana4",
            titulo: "Semana 4",
            conteudo: "Introdução ao React + TailwindCSS",
            desc: "Introdução ao framework React usando Vite para construção de interfaces dinâmicas e estilização por meio do TailwindCSS."
        },
        {
            id: 2,
            rota: "/semana5",
            titulo: "Semana 5",
            conteudo: "Evoluindo no React + Consumo de APIs",
            desc: "Criar aplicações React dinâmicas que se comunicam com serviços externos, exibem dados em tempo real e mantêm uma experiência de usuário fluida mesmo durante operações assíncronas."
        }
    ]

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans">

            <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                {semanas.map((sem) => (
                    <div
                        key={sem.id}
                        className="bg-w-800/50 border border-slate-700/60 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/80 hover:bg-slate-800 transition-all duration-300 shadow-xl group"
                    >
                        <div>
                            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                {sem.titulo}
                            </span>
                            <h3 className="text-2xl font-bold mt-4 mb-2 group-hover:text-orange-400 transition-colors">
                                {sem.conteudo}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                {sem.desc}
                            </p>
                        </div>

                        <Link
                            to={sem.rota}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-600/20 cursor-pointer"
                        >Acessar Projeto
                        </Link>
                    </div>
                ))}
                <div className="col-span-1 md:col-span-2 bg-red-800/50 border border-slate-700/60 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/80 hover:bg-slate-800 transition-all duration-300 shadow-xl group ">
                        <div>
                            <span className="text-xs font-bold text-orange-400 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                404
                            </span>
                            <h3 className="text-2xl font-bold mt-4 mb-2 group-hover:text-orange-400 transition-colors">
                                Not Found 404
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Teste da rota 404 (Not Found)
                            </p>
                        </div>

                        <Link
                            to="/404"
                            className="w-full bg-red-500 hover:bg-red-600 text-white text-center font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-600/20 cursor-pointer"
                        >Acessar Tela
                        </Link>
                    </div>
            </main>
        </div>
    )
}

export default Home