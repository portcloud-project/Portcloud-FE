/* eslint-disable no-unused-vars */
import React from 'react';

interface PortfolioSchoolPARAMS {
    title: string;
    id: number;
    school: string;
    department: string;

    onDelete: (id: number) => void;
    onValueChange: (id: number, field: 'school' | 'department', newValue: string) => void;
}

const PortfolioSchool = ({
    title,
    id,
    school,
    department,
    onDelete,
    onValueChange,
}: PortfolioSchoolPARAMS) => {
    const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(id, 'school', e.target.value);
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(id, 'department', e.target.value);
    };

    return (
        <div className="relative flex flex-col gap-[12px]">
            <label className="text-[24px] font-semibold">{title}</label>
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[70%] rounded-[8px] p-[16px]"
                        placeholder="학교/학과"
                        value={school}
                        onChange={handleSchoolChange}
                    />
                    <input
                        type="text"
                        className="border w-[30%] rounded-[8px] p-[16px]"
                        value={department}
                        onChange={handleDepartmentChange}
                    />
                </div>
            </div>
            <button onClick={() => onDelete(id)} className="absolute right-0 top-0 cursor-pointer">
                삭제
            </button>
        </div>
    );
};

export default PortfolioSchool;
