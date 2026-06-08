export default function MemberCard({
  membro,
  nome,
  idade,
  curso,
}) {
  return (
    <div
      className="
        relative
        pt-6
        hover:-translate-y-2
        transition-transform
      "
    >
    
      <div
        className="
         absolute
         top-0
         left-1/2
         -translate-x-1/2
          w-[187px]
          h-[64px]
          bg-[#FF6600]
          rounded-[22px]
          flex
          items-center
          justify-center
          text-white
          font-bold
          text-[28px]
          z-10
       "
      >
        {membro}
      </div>

      <div
        className="
          w-[336px]
          h-[309px]
          bg-slate-950
          rounded-[22px]
          flex
          flex-col
          justify-center
          items-center
          text-white
          gap-4
        "
      >
        <p className="font-bold text-[24px]">{nome}</p>
        <p className="font-bold text-[24px]">{idade}</p>
        <p className="font-bold text-[24px]">{curso}</p>
      </div>
    </div>
  );
}