import { motion } from 'framer-motion'

function Card({id,nome,idade,curso}){
    return (
        <motion.div
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-primary text-[24px] px-[28px] py-[10px] rounded-[22px] z-10 mb-[-28px] font-bold">
                <h2>Membro {id}</h2>
            </div>
            <div className="bg-secondary rounded-[22px] w-[336px] h-[277px] flex flex-col justify-center items-center gap-[16px] text-[24px]">
                <ul className="flex flex-col gap-[28px] list-none text-center">
                    <li>{nome}</li>
                    <li>{idade}</li>
                    <li>{curso}</li>
                </ul>
            </div>
        </motion.div>
    );
}

export default Card;