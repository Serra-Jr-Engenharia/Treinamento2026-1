import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'

function App(){
  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex justify-center gap-14 flex-grow items-center flex-wrap flex-grow">
        <Card titulo="Membro 1"/>
        <Card titulo="Membro 2"/>
        <Card titulo="Membro 3"/>
      </main>

      <Footer />
    </div>
  )
}

export default App