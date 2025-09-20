'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
/* eslint-disable no-unused-vars */
interface PortfolioCreerProps {
    index: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;

    id: number;
}

const PortfolioCreer = ({ index, onDelete, isOnlyOneSection, id }: PortfolioCreerProps) => {
    const { register } = useFormContext();

    const fieldNamePrefix = `creerSections[${index}]`;

    return (
        <div className="relative flex flex-col gap-[12px] border p-4 rounded-lg mb-[30px]">
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <div className="flex-grow">
                        <input
                            type="text"
                            className="border w-full rounded-[8px] p-[16px]"
                            placeholder="회사명"
                            {...register(`${fieldNamePrefix}.companyName`)}
                        />
                    </div>

                    <div className="flex-grow">
                        <input
                            type="text"
                            className="border w-full rounded-[8px] p-[16px]"
                            placeholder="직책"
                            {...register(`${fieldNamePrefix}.position`)}
                        />
                    </div>

                    <div className="flex-grow">
                        <input
                            type="text"
                            className="border w-full rounded-[8px] p-[16px]"
                            placeholder="직무"
                            {...register(`${fieldNamePrefix}.jobTitle`)}
                        />
                    </div>

                    <div className="flex-grow">
                        <input
                            type="text"
                            className="border w-full rounded-[8px] p-[16px]"
                            placeholder="기간"
                            {...register(`${fieldNamePrefix}.period`)}
                        />
                    </div>
                </div>

                <textarea
                    className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                    placeholder="담당 업무"
                    {...register(`${fieldNamePrefix}.description`)}
                />
            </div>

            {!isOnlyOneSection && (
                <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="absolute right-[-15px] top-[-30px] cursor-pointer "
                >
                    삭제
                </button>
            )}
        </div>
    );
};

export default PortfolioCreer;
