'use client';
/* eslint-disable no-unused-vars */

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface PortfolioLicenseProps {
    id: number;
    index: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;
}

const PortfolioLicense = ({ id, index, isOnlyOneSection, onDelete }: PortfolioLicenseProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `licenseSections[${index}]`;

    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="자격 이름"
                        {...register(`${fieldNamePrefix}.licenseName`)}
                    />
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="등록번호"
                        {...register(`${fieldNamePrefix}.registrationNumber`)}
                    />
                    <input
                        type="date"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="취득일"
                        {...register(`${fieldNamePrefix}.acquisitionDate`)}
                    />
                </div>
            </div>
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

export default PortfolioLicense;
