/* eslint-disable no-unused-vars */

import React from 'react';

// PARAMS 인터페이스 재정의:
interface PARAMS {
    title: string;
    id: number;

    certificationName: string;
    acquisitionDate: string;
    registrationNumber: string;

    onDelete: (id: number) => void;
    onValueChange: (
        id: number,
        field: 'certificationName' | 'acquisitionDate' | 'registrationNumber',
        newValue: string,
    ) => void;
}

const PortfolioLicense = ({
    title,
    id,
    certificationName,
    acquisitionDate,
    registrationNumber,
    onDelete,
    onValueChange,
}: PARAMS) => {
    // ⭐️ 각 input 필드별 handleChange 함수 또는 통합 핸들러 구현 ⭐️
    // 여기서는 명확성을 위해 개별 핸들러를 사용합니다.

    const handleCertificationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(id, 'certificationName', e.target.value);
    };

    const handleAcquisitionDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(id, 'acquisitionDate', e.target.value);
    };

    const handleRegistrationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(id, 'registrationNumber', e.target.value);
    };

    return (
        <div className="relative flex flex-col gap-[12px]">
            <label className="text-[24px] font-semibold">{title}</label>
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="자격 이름"
                        value={certificationName} // ⭐️ prop 바인딩
                        onChange={handleCertificationNameChange} // ⭐️ 핸들러 바인딩
                    />
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="취득일"
                        value={acquisitionDate} // ⭐️ prop 바인딩
                        onChange={handleAcquisitionDateChange} // ⭐️ 핸들러 바인딩
                    />
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="등록 번호"
                        value={registrationNumber} // ⭐️ prop 바인딩
                        onChange={handleRegistrationNumberChange} // ⭐️ 핸들러 바인딩
                    />
                </div>
            </div>
            <button onClick={() => onDelete(id)} className="absolute right-0 top-0 cursor-pointer">
                삭제
            </button>
        </div>
    );
};

export default PortfolioLicense;
