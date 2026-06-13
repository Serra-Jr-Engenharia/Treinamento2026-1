function CardMembro({ titulo }) {
  return (
    <div className="card">
      <div className="tag">{titulo}</div>

      <p>Nome</p>
      <p>Idade</p>
      <p>Curso</p>
    </div>
  );
}

export default CardMembro;