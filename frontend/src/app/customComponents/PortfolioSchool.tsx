/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import UploadDropDown from './UploadDropDown';

interface PortfolioSchoolProps {
    index: number;
    onDelete: (id: number) => void;
    id: number;
    isOnlyOneSection: boolean;
}

const PortfolioSchool = ({ id, isOnlyOneSection, onDelete, index }: PortfolioSchoolProps) => {
    const { register } = useFormContext();
    const fieldNamePrefix = `educations[${index}]`;
    const schoolArr = ['졸업 ', '재학', '휴학', '중퇴', '졸업예정'];
    return (
        <div className="relative flex flex-col gap-[12px] mb-[30px]">
            <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[12px] h-[56px] flex-grow-1 ">
                    <input
                        type="text"
                        className="border w-[70%] rounded-[8px] p-[16px]"
                        placeholder="학교/학과"
                        {...register(`${fieldNamePrefix}.school`, {
                            // validate: (value, formValues) => {
                            //     const school = formValues.educations[index].school;
                            //     if (value && !school) return '학교상태을 입력해 주세요';
                            //     if (!value && school) return '학교명를 입력해 주세요';
                            //     return true
                            // },
                        })}
                    />

                    <UploadDropDown
                        name={`${fieldNamePrefix}.schoolStatus`}
                        width="w-[245px]"
                        height="h-[56px]"
                        labelFont="font-bold"
                        labelText="text-[24px]"
                        gap=""
                        arr={schoolArr}
                        dropDownLabel=""
                        dropDownPlaceholoder="상태"
                    />
                </div>
                <p className="text-red-500 text-sm mt-1"></p>
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
