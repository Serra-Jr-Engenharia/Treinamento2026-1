export default function MemberCard({
  membro,
  nome,
  idade,
  curso,
}) {
  return (
    <div className="relative
    hover:-translate-y-2
          transition">

      <div
        className="
          absolute
          -top-5
          left-1/2
          -translate-x-1/2
          bg-orange-500
          text-white
          px-5
          py-2
          rounded-xl
          font-bold
         
        "
      >
        {membro}
      </div>

      <div
        className="
          w-74
          h-36
          bg-slate-950
          rounded-2xl
          flex
          flex-col
          justify-center
          items-center
          text-white
          gap-2
          shadow-lg
          
        "
      >
        <p className="font-bold">{nome}</p>
        <p className="font-bold">{idade}</p>
        <p className="font-bold">{curso}</p>
      </div>
    </div>
  );
}