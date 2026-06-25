import '../styles/equipe.css'

import CardMembro from '../components/CardMembro'

export default function Equipe() {

return (

<div className="equipe">

<header>

<div className="logoContainer">

<img
src="/logo-serra.png"
alt="Logo Serra Jr"
className="logo"
/>

<h1>Equipe Serra Jr</h1>

</div>

</header>

<main className="container">

<CardMembro titulo="Membro 1" />

<CardMembro titulo="Membro 2" />

<CardMembro titulo="Membro 3" />

</main>

<footer>

COPYRIGHT © 2026 - SERRA JUNIOR ENGENHARIA

</footer>

</div>

)

}