import Card from './components/Card'
import logo from './assets/logo.png'


function App(){
  return (
    <div className="font-sans text-white min-h-screen flex flex-col">

      <header className="bg-primary flex items-center h-[97px] gap-[25px]">
        <img src={logo} alt="Logo" className="w-[58px] h-[57px] ml-[23px]"></img>
        <h1 className="text-[36px] font-bold">Equipe Serra Jr</h1>
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

export default App;