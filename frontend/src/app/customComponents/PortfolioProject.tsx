/* eslint-disable no-unused-vars */
interface PARAMS {
    title: string;
    id: number;
    initialValue: string;
    onDelete: (id: number) => void;
    onValueChange: (id: number, newValue: string) => void;
}

const PortfolioProject = ({ title, id, initialValue, onDelete, onValueChange }: PARAMS) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onValueChange(id, e.target.value);
    };
    return (
        <div className="relative flex flex-col gap-[12px]">
            <label className="text-[24px] font-semibold">{title}</label>
            <textarea
                name=""
                id=""
                value={initialValue}
                onChange={handleChange}
                className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
            />
            {initialValue}
            <button onClick={() => onDelete(id)} className="absolute right-0 top-0 cursor-pointer">
                삭제
            </button>
        </div>
    );
};

export default PortfolioProject;
