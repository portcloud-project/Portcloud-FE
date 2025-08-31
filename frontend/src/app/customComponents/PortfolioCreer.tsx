/* eslint-disable no-unused-vars */

import React from 'react';

interface PARAMS {
    title: string; // 섹션 제목 (예: "경력")
    id: number;

    companyName: string;
    position: string;
    jobTitle: string;
    period: string;
    description: string;
    onDelete: (id: number) => void;

    onValueChange: (
        id: number,
        field: 'companyName' | 'position' | 'jobTitle' | 'period' | 'description',
        newValue: string,
    ) => void;
}

const PortfolioCreer = ({
    title,
    id,
    companyName,
    position,
    jobTitle,
    period,
    description,
    onDelete,
    onValueChange,
}: PARAMS) => {
    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange(id, 'companyName', e.target.value);
    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange(id, 'position', e.target.value);
    const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange(id, 'jobTitle', e.target.value);
    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onValueChange(id, 'period', e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onValueChange(id, 'description', e.target.value);

    return (
        <div className="relative flex flex-col gap-[12px]">
            <label className="text-[24px] font-semibold">{title}</label>
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[23%] rounded-[8px] p-[16px]"
                        placeholder="회사명"
                        value={companyName} // ⭐️ value 바인딩
                        onChange={handleCompanyNameChange} // ⭐️ onChange 바인딩
                    />
                    <input
                        type="text"
                        className="border w-[23%] rounded-[8px] p-[16px]"
                        placeholder="직무"
                        value={position} // ⭐️ value 바인딩
                        onChange={handlePositionChange} // ⭐️ onChange 바인딩
                    />
                    <input
                        type="text"
                        className="border w-[23%] rounded-[8px] p-[16px]"
                        placeholder="직책"
                        value={jobTitle} // ⭐️ value 바인딩
                        onChange={handleJobTitleChange} // ⭐️ onChange 바인딩
                    />
                    <input
                        type="text"
                        className="border w-[30%] rounded-[8px] p-[16px]"
                        placeholder="기간"
                        value={period} // ⭐️ value 바인딩
                        onChange={handlePeriodChange} // ⭐️ onChange 바인딩
                    />
                </div>
                <textarea
                    name=""
                    id=""
                    value={description} // ⭐️ value 바인딩 (이전 initialValue 역할)
                    onChange={handleDescriptionChange} // ⭐️ onChange 바인딩
                    className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                    placeholder="담당 업무"
                />
            </div>
            {/* initialValue 출력 제거 */}
            <button onClick={() => onDelete(id)} className="absolute right-0 top-0 cursor-pointer">
                삭제
            </button>
        </div>
    );
};

export default PortfolioCreer;
