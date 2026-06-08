import { useState } from 'react';

function Card(props){ 
    const [titulo, setTitulo] = useState(props.titulo);
    const [isEditing, setIsEditing] = useState(false);

    const conteudos = [ 
        { id: "Nome", texto: "Nome do membro" }, 
        { id: "Idade", texto: "Idade do membro" }, 
        { id: "Curso", texto: "Curso do membro" }, 
    ] 

    return ( 
        <div className="relative bg-[#001830] w-full max-w-[336px] min-h-[277px] py-10 rounded-[22px] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"> 

            <div className="absolute bg-[#ff6600] -top-8 w-full max-w-[187px] h-[64px] rounded-[22px] font-bold text-[22px] text-white flex items-center justify-center gap-2"> 
                
                {isEditing ? (
                    <>
                        <input 
                            type="text" 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                            className="w-[100px] text-white text-center text-[16px] rounded px-1 outline-none"
                        />
                        <button onClick={() => setIsEditing(false)} className="text-white text-xl hover:scale-110 cursor-pointer">
                            ✔
                        </button>
                    </>
                ) : (
                    <>
                        <span>{titulo}</span>
                        <button onClick={() => setIsEditing(true)} className="text-white text-xl hover:scale-110 mb-1 cursor-pointer">
                            ✎
                        </button>
                    </>
                )}

            </div> 

            <ul className="text-white font-bold text-[22px] flex flex-col items-center gap-4 mt-5 w-full px-6 text-center"> 
                
                {conteudos.map((item, index) => ( 
                    <li key={index} className="w-full"> 
                        <details className="w-full group"> 
                            
                            <summary className="list-none hover:text-[#ff6600] transition-colors outline-none w-fit mx-auto cursor-pointer"> 
                                {item.id} 
                            </summary> 
                        
                            <p className="text-lg font-medium text-gray-300 mt-2"> 
                                {item.texto} 
                            </p> 
                        </details> 
                    </li> 
                ))} 

            </ul> 
        </div> 
    ) 
} 

export default Card