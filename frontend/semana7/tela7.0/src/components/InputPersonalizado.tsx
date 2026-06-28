// Adicionamos 'id', 'value' e 'onChange' para controlar os dados e a animação
interface InputProps {
  label: string; 
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipo?: string;
}

export function InputPersonalizado({ label, id, value, onChange, tipo = "text" }: InputProps) {
  return (
    <div className="relative w-full mt-5">
      <input
        id={id}
        type={tipo}
        value={value}
        onChange={onChange}
        placeholder=" " 
        className="peer w-full h-12 rounded-[22px] border-2 border-[#ff6600] px-6 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ff6600] bg-transparent"/>
      
      <label
        htmlFor={id}
        className="absolute left-6 -top-6 text-sm text-[#ff6600] font-medium transition-all duration-300
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                   peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#ff6600]"
      >
        {label}
      </label>
    </div>
  );
}