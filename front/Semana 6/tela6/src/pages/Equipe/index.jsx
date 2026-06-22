import Card from '../../components/Card';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import { motion } from "framer-motion"; 

const MotionLink = motion(Link);

function Equipe(){
  return (
    <div className="font-sans text-white min-h-screen flex flex-col">

      <header className="bg-primary flex items-center h-[97px] gap-[25px]">
        <img src={logo} alt="Logo" className="w-[58px] h-[57px] ml-[23px]"></img>
        <h1 className="text-[36px] font-bold">Equipe Serra Jr</h1>

        <MotionLink
          to="/" 
          className="ml-auto mr-[23px] bg-secondary w-[187px] h-[64px] rounded-[22px] flex items-center justify-center font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Lista de Filmes
        </MotionLink>
      </header>

      <main className="flex-1 flex justify-center items-center gap-[57px] bg-white">
        <Card id="1" nome="Nome" idade="Idade" curso="Curso"/>
        <Card id="2" nome="Nome" idade="Idade" curso="Curso"/>
        <Card id="3" nome="Nome" idade="Idade" curso="Curso"/>
      </main>
      
      <footer className="bg-primary flex justify-center items-center text-[16px] h-[83px] font-medium">
        <p>COPYRIGHT Ⓒ 2025 - SERRA JUNIOR ENGENHARIA</p>
      </footer>
    </div>

    
  );
}

export default Equipe;