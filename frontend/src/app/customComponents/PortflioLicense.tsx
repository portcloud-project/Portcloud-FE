'use client';
/* eslint-disable no-unused-vars */

import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineClose } from 'react-icons/ai';

interface PortfolioLicenseProps {
    id: number;
    index: number;
    isOnlyOneSection: boolean;
    onDelete: (id: number) => void;
}

const PortfolioLicense = ({ id, isOnlyOneSection, onDelete, index }: PortfolioLicenseProps) => {
    const { register, control } = useFormContext();
    const fieldNamePrefix = `certificates[${index}]`;
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="자격 이름"
                        {...register(`${fieldNamePrefix}.certificateName`)}
                    />
                    <input
                        type="text"
                        className="border w-[33%] rounded-[8px] p-[16px]"
                        placeholder="등록번호"
                        {...register(`${fieldNamePrefix}.number`)}
                    />
                    <Controller
                        control={control}
                        name={`${fieldNamePrefix}.certificateDate`}
                        render={({ field }) => (
                            <DatePicker
                                locale={ko}
                                placeholderText="취득일"
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

export default PortfolioLicense;
