'use client';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import SearchSkill from '@/app/customComponents/SearchSkill';
import UploadDropDown from '@/app/customComponents/UploadDropDown';

interface UploadProjectsFormValuesType {
    title: string;
    startDate: string;
    endDate: string;
    people: string;
    distribution: string;
    role: string;
    projectURL: string;
    description: string;
    skill: string[];
    thumnailImg: string | null;
    demonstrationVideo: string | null;
}

const UploadProjects = () => {
    const isDeployArr = ['', '배포 중', '배포 완료'];
    const peopleArr = [...Array.from({ length: 9 }, (_, i) => `${i + 1}명`), '10명 이상'];

    const {
        // getValues,
        register,
        handleSubmit,
        // watch,
        // setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UploadProjectsFormValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onUploadProjectsSubmit = async (data: UploadProjectsFormValuesType) => {
        const {
            title,
            startDate,
            endDate,
            distribution,
            role,
            people,
            description,
            projectURL,
            // thumnailImg,
            // demonstrationVideo,
        } = data;
        console.log(data);
        try {
            const res = await axios.post('/api/project', {
                title,
                startDate,
                endDate,
                distribution,
                description,
                role,
                people,
                projectURL,
                thumnailImg: null,
                demonstrationVideo: null,
            });

            console.log(res.status);

            alert('프로젝트가 업로드 되었습니다!');
        } catch (err) {
            if (err instanceof Error) {
                console.log('업로드 에러내용:', err.message);
            } else {
                console.error('알 수 없는 에러:', err);
            }
            alert('프로젝트 업로드 실패');
        }
    };

    return (
        <>
            <h3 className="font-bold text-[28px] text-black">프로젝트 업로드</h3>

            <form
                autoComplete="off"
                onSubmit={handleSubmit(onUploadProjectsSubmit)}
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
                                    value: 1,
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

                {/* 프로젝트 기간, 진행인원 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                    {/* 프로젝트 기간 section */}
                    <div className="w-[236px] flex flex-col justify-center items-start gap-[12px]">
                        <label
                            htmlFor="startDate-endDate"
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            프로젝트 기간 *
                        </label>

                        <div className="w-auto flex flex-row justify-center items-center gap-[16px]">
                            <div className="relative w-auto">
                                <input
                                    type="date"
                                    id="startDate"
                                    placeholder="시작일"
                                    className="w-[245px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                    {...register('startDate', {
                                        required: '시작일을 선택해 주세요',
                                    })}
                                />
                            </div>

                            <div className="relative w-auto">
                                <input
                                    type="date"
                                    id="endDate"
                                    placeholder="종료일"
                                    className="w-[245px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out cursor-pointer"
                                    {...register('endDate', {
                                        required: '종료일을 선택해 주세요',
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 진행인원 section */}
                    <Controller
                        name="people"
                        control={control}
                        rules={{ required: '진행 인원을 선택해 주세요' }}
                        render={({ field, fieldState }) => (
                            <div className="relative">
                                <UploadDropDown
                                    arr={peopleArr}
                                    dropDownLabel={'진행 인원 *'}
                                    dropDownPlaceholoder={''}
                                    width="w-[245px]"
                                    height="h-[64px]"
                                    gap="gap-[12px]"
                                    labelFont="font-bold"
                                    labelText="text-[24px]"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[73px]">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* 내용 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px] relative">
                    <label
                        htmlFor="description"
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        프로젝트 내용 *
                    </label>
                    <textarea
                        placeholder="내용을 입력해 주세요"
                        className={`w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border border-[var(--color-gray-400)] resize-none overflow-y-auto h-[312px] focus:outline-none transition duration-300 ease-in-out flex flex-col justify-start items-start ${
                            errors.description
                                ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                        }`}
                        {...register('description', {
                            required: '내용을 입력해주세요',
                        })}
                    />
                    {/* 내용 error section */}
                    {errors.description && (
                        <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[370px]">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* 담당 역할, 스킬 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                    {/* 담당 역할 section */}
                    <div className="w-fit flex flex-col justify-center items-start gap-[12px] relative">
                        <label
                            htmlFor="role"
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            담당 역할 *
                        </label>
                        <input
                            type="text"
                            id="role"
                            placeholder="담당 역할을 입력해주세요"
                            className={`w-[376px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out ${
                                errors.role
                                    ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                    : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                            }`}
                            {...register('role', {
                                required: '담당 역할을 입력해 주세요',
                            })}
                        />
                        {/* 담당 역할 error section */}
                        {errors.role && (
                            <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[120px]">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                    {/* 스킬 section */}
                    <SearchSkill width="w-[376px]" />
                </div>

                {/* URL, 배포 현황 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                    {/* URL section */}
                    <div className="w-fit flex flex-col justify-center items-start gap-[12px]">
                        <label
                            htmlFor="projectURL"
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            URL
                        </label>
                        <input
                            type="url"
                            id="projectURL"
                            placeholder="개인 URL을 입력해 주세요"
                            className="w-[376px] h-[64px] border border-[var(--color-gray-400)] focus:border-[var(--color-purple-500)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out"
                            {...register('projectURL')}
                        />
                    </div>

                    {/* 배포 현황 section */}
                    <Controller
                        name="distribution"
                        control={control}
                        rules={{ required: '진행 인원을 선택해 주세요' }}
                        render={({ field, fieldState }) => (
                            <div className="relative">
                                <UploadDropDown
                                    arr={isDeployArr}
                                    dropDownLabel={'배포 현황'}
                                    dropDownPlaceholoder={'배포 현황 선택'}
                                    width="w-[376px]"
                                    height="h-[64px]"
                                    gap="gap-[12px]"
                                    labelFont="font-bold"
                                    labelText="text-[24px]"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {fieldState.error && (
                                    <p className="text-sm text-[var(--color-red-500)] absolute left-0 top-[120px]">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* 대표 이미지 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="w-fit flex flex-row justify-center items-center gap-[12px] text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        대표 이미지 *
                        <span className="font-medium text-[20px] text-[var(--color-gray-500)]">
                            사진을 첨부해주세요
                        </span>
                    </label>
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            type="file"
                            id="file"
                            className="w-[768px] h-[312px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                        />
                    </div>
                </div>

                {/* 시연 영상 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="w-fit flex flex-row justify-center items-center gap-[12px] text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        시연 영상
                        <span className="font-medium text-[20px] text-[var(--color-gray-500)]">
                            영상을 첨부해주세요
                        </span>
                    </label>
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            type="file"
                            id="video"
                            className="w-[768px] h-[312px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                        />
                    </div>
                </div>

                {/* 버튼 section */}
                <div className="w-full h-auto flex justify-end items-center gap-[24px]">
                    <button className="w-[131px] h-[48px] rounded-[8px] text-[var(--color-gray-700)] text-[16px] font-semibold leading-[24px] border border-[var(--color-gray-300)] bg-white px-[24px] py-[12px] hover:text-white hover:bg-[var(--color-purple-500)] transition duration-300 ease-in-out cursor-pointer flex justify-center items-center gap-[6px] group">
                        임시저장 <span className="text-[var(--color-gray-300)] font-light">|</span>{' '}
                        <span className="text-[var(--color-purple-500)] group-hover:text-white transition duration-300 ease-in-out">
                            2
                        </span>
                    </button>
                    <button
                        className="w-[248px] h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        등록하기
                    </button>
                </div>
            </form>
        </>
    );
};

export default UploadProjects;
