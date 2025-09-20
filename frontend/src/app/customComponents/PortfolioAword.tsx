import { useFormContext } from 'react-hook-form';

/* eslint-disable no-unused-vars */
interface PortfolioAwordProps {
    id: number;
    index: number;
    onDelete: (id: number) => void;
    isOnlyOneSection: boolean;
}

const PortfolioAword = ({ id, onDelete, isOnlyOneSection, index }: PortfolioAwordProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `awordSections[${index}]`;
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <textarea
                id=""
                className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                {...register(`${fieldNamePrefix}.awordName`)}
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

export default PortfolioAword;
