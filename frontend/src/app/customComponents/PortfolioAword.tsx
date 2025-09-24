'use client';

import { useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

/* eslint-disable no-unused-vars */
interface PortfolioAwordProps {
    id: number;
    index: number;
    onDelete: (id: number) => void;
    isOnlyOneSection: boolean;
}

const PortfolioAword = ({ id, onDelete, isOnlyOneSection, index }: PortfolioAwordProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `awards[${index}]`;
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <textarea
                id=""
                className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                {...register(`${fieldNamePrefix}.awardDescription`)}
            />
            {!isOnlyOneSection && (
                <button
                    onClick={() => onDelete(id)}
                    className="absolute right-0 top-[-30px] cursor-pointer"
                >
                    <AiOutlineClose />
                </button>
            )}
        </div>
    );
};

export default PortfolioAword;
