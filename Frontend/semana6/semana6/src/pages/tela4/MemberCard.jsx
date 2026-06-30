function MemberCard({ membro, nome, idade, curso }) {
  return (
    <div className="relative w-[208px] h-[168px] bg-[#001830] rounded-2xl flex flex-col justify-center items-center">

      <div className="absolute -top-5 bg-[#ff6600] px-6 py-2 rounded-2xl">
        <span className="text-white font-bold text-xl">
          {membro}
        </span>
      </div>

      <div className="text-center text-white font-bold text-[18px] space-y-2">
        <p>{nome}</p>
        <p>{idade}</p>
        <p>{curso}</p>
      </div>

    </div>
  )
}

export default MemberCard