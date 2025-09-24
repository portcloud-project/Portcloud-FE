'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineClose } from 'react-icons/ai';
/* eslint-disable no-unused-vars */
interface PortfolioCreerProps {
    index: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;

    id: number;
}

const PortfolioCreer = ({ index, onDelete, isOnlyOneSection, id }: PortfolioCreerProps) => {
    const { register, control } = useFormContext();

    const fieldNamePrefix = `careers[${index}]`;

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
                            {...register(`${fieldNamePrefix}.companyPosition`)}
                        />
                    </div>

                    <div className="flex-grow">
                        <input
                            type="text"
                            className="border w-full rounded-[8px] p-[16px]"
                            placeholder="직무"
                            {...register(`${fieldNamePrefix}.duty`)}
                        />
                    </div>

                    <Controller
                        control={control}
                        name={`${fieldNamePrefix}.startDate`}
                        render={({ field }) => (
                            <DatePicker
                                locale={ko}
                                placeholderText="입사일"
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                className="w-full rounded-[8px] p-[16px] border"
                                dateFormat="yyyy-MM-dd"
                                withPortal
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={`${fieldNamePrefix}.endDate`}
                        render={({ field }) => (
                            <DatePicker
                                locale={ko}
                                placeholderText="퇴사일"
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                className="w-full rounded-[8px] p-[16px] border"
                                dateFormat="yyyy-MM-dd"
                                withPortal
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        )}
                    />
                </div>

                <textarea
                    className="resize-none min-h-[156px] overflow-y-auto w-full rounded-[8px] py-[12px] px-[20px] border"
                    placeholder="담당 업무"
                    {...register(`${fieldNamePrefix}.dutyDescription`)}
                />
            </div>

            {!isOnlyOneSection && (
                <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="absolute right-0 top-[-30px] cursor-pointer "
                >
                    <AiOutlineClose />
                </button>
            )}
        </div>
    );
};

export default PortfolioCreer;
