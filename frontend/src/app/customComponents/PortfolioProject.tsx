'use client';
import { useFormContext } from 'react-hook-form';

/* eslint-disable no-unused-vars */
interface PortfolioProjectProps {
    index: number;
    id: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;
}

const PortfolioProject = ({ id, onDelete, isOnlyOneSection, index }: PortfolioProjectProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `projectDescriptions[${index}]`;
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <textarea
                id=""
                className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                {...register(`${fieldNamePrefix}.description`)}
            />

            {!isOnlyOneSection && (
                <button
                    onClick={() => onDelete(id)}
                    className="absolute right-[-15px] top-[-30px] cursor-pointer"
                >
                    삭제
                </button>
            )}
        </div>
    );
};

export default PortfolioProject;
