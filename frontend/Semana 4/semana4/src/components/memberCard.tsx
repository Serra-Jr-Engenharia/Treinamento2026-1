interface MemberCardProps {
  membro: string;
  nome: string;
  idade: number;
  curso: string;
}

function MemberCard({ membro, nome, idade, curso }: MemberCardProps) {
  return (
    <div className="relative flex flex-col items-center" style={{ paddingTop: '28px' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white font-bold px-10 py-3 rounded-lg text-base shadow-lg whitespace-nowrap">
        {membro}
      </div>
      <div
        className="bg-[#001830] text-white flex flex-col items-center justify-center gap-5"
        style={{ width: '336px', height: '309px', borderRadius: '22px' }}
      >
        <p className="font-bold text-xl">{nome}</p>
        <p className="font-bold text-xl">{idade} anos</p>
        <p className="font-bold text-xl">{curso}</p>
      </div>
    </div>
  );
}

export default MemberCard;
