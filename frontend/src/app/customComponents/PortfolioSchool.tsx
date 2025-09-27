/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

interface PortfolioSchoolProps {
    index: number;
    onDelete: (id: number) => void;
    id: number;
    isOnlyOneSection: boolean;
}

const PortfolioSchool = ({ id, isOnlyOneSection, onDelete, index }: PortfolioSchoolProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `educations[${index}]`;
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[70%] rounded-[8px] p-[16px]"
                        placeholder="학교/학과"
                        {...register(`${fieldNamePrefix}.school`, {
                            required: '학교/학과명은 필수입니다.',
                        })}
                    />
                    <select
                        id=""
                        className="border w-[30%] rounded-[8px] p-[16px]"
                        {...register(`${fieldNamePrefix}.schoolStatus`, {
                            required: '상태를 선택해 주세요',
                        })}
                    >
                        <option value="재학">재학</option>
                        <option value="졸업">졸업</option>
                        <option value="졸업예정">졸업예정</option>
                    </select>
                </div>
            </div>
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

export default PortfolioSchool;
