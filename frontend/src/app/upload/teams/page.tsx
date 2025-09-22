'use client';

import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import SearchSkill from '@/app/customComponents/SearchSkill';
import UploadDropDown from '@/app/customComponents/UploadDropDown';

interface UploadTeamsFormValuesType {
    title: string;
    content: string;
    position: string;
    people: number;
    skills: string;
    endDate: Date;
    contact: string;
}

const UploadTeams = () => {
    const positionArr = ['Back-end', 'Front-end', 'Full-stack', 'PM', 'Designer'];
    const peopleArr = [...Array.from({ length: 5 }, (_, i) => `${i + 1}명`)];

    const {
        // getValues,
        register,
        // handleSubmit,
        // watch,
        // setValue,
        formState: { errors },
    } = useForm<UploadTeamsFormValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    return (
        <>
            <h3 className="font-bold text-[28px] text-black">
                팀원 구하기{' '}
                <span className="font-normal text-[16px] text-[var(--color-gray-600)]">
                    * 프로젝트를 소개하고 팀원을 구해 보세요
                </span>
            </h3>
            <form
                autoComplete="off"
                // onSubmit={handleSubmit(onUploadProjectsSubmit)}
                className="w-full flex flex-col justify-start items-start gap-[48px]"
            >
                {/* 제목 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px] relative">
                    <label
                        htmlFor="title"
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        제목 *
                    </label>
                    <div className="w-full flex flex-col justify-between items-center gap-[6px]">
                        <input
                            type="text"
                            id="title"
                            placeholder="제목을 입력해주세요"
                            className={`w-[768px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out ${
                                errors.title
                                    ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                    : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                            }`}
                            {...register('title', {
                                required: '제목을 입력해주세요',
                                minLength: {
                                    value: 3,
                                    message: '제목은 1자 이상 입력해주세요',
                                },
                            })}
                        />
                        {/* 제목 error section */}
                        {errors.title && (
                            <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[120px]">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 내용 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px] relative">
                    <label
                        htmlFor="content"
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        내용 *
                    </label>
                    <textarea
                        placeholder="내용을 입력해 주세요"
                        className={`w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border border-[var(--color-gray-400)] resize-none overflow-y-auto h-[312px] focus:outline-none transition duration-300 ease-in-out flex flex-col justify-start items-start ${
                            errors.content
                                ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                        }`}
                        {...register('content', {
                            required: '내용을 입력해주세요',
                        })}
                    />
                    {/* 내용 error section */}
                    {errors.content && (
                        <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[370px]">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* 모집 포지션, 인원, 스킬 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                    {/* 모집 포지션 section */}
                    <UploadDropDown
                        arr={positionArr}
                        dropDownLabel={'모집 포지션 *'}
                        dropDownPlaceholoder={''}
                        width="w-[216px]"
                        height="h-[64px]"
                        gap="gap-[12px]"
                        labelFont="font-bold"
                        labelText="text-[24px]"
                    />
                    {/* 모집 인원 section */}
                    <UploadDropDown
                        arr={peopleArr}
                        dropDownLabel={'모집 인원 *'}
                        dropDownPlaceholoder={''}
                        width="w-[136px]"
                        height="h-[64px]"
                        gap="gap-[12px]"
                        labelFont="font-bold"
                        labelText="text-[24px]"
                    />
                    {/* 스킬 section */}
                    {/* <SearchSkill width="w-[384px]" /> */}
                </div>
            </form>
        </>
    );
};

export default UploadTeams;
