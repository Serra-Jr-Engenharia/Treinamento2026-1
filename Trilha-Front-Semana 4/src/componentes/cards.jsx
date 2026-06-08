function Card({ membro }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 w-[187px] h-[64px] rounded-[22px] bg-[#FF6600] flex items-center justify-center -mb-7">
        <p className="text-[24px] font-bold">{membro}</p>
      </div>

      <div className="w-[336px] h-[277px] rounded-[22px] bg-[#001830] flex items-center justify-center">
        <ul className="flex flex-col items-center text-[24px] font-bold gap-4">
          <li>Nome</li>
          <li>Idade</li>
          <li>Curso</li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
