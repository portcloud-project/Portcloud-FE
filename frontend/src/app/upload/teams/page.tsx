'use client';

import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
// import axios from 'axios';
// import SearchSkill from '@/app/customComponents/SearchSkill';
import UploadDropDown from '@/app/customComponents/UploadDropDown';
import SearchSkill from '@/app/customComponents/SearchSkill';
import { Skills } from '@/app/stores/skillStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface UploadTeamsFormValuesType {
    title: string;
    content: string;
    position: string;
    people: string;
    skill: Skills[];
    endDate: string;
    contact: string;
    saveStatus: true;
    writerName: string;
    createdAt: string;
    id: string;
}

const UploadTeams = () => {
    const positionArr = ['Back-end', 'Front-end', 'Full-stack', 'PM', 'Designer'];
    const peopleArr = [...Array.from({ length: 5 }, (_, i) => `${i + 1}명`)];
    const router = useRouter();

    const onSubmit = async (data: UploadTeamsFormValuesType) => {
        console.log(data);

        try {
            const response = await axios.post('/api/teamupload', {
                title: data.title,
                content: data.content,
                projectType: data.position,
                recruitDeadline: data.endDate,
                contactMethod: data.contact,
                saveStatus: data.saveStatus,
                skills: data.skill,
            });
            router.push('/works/teams');
            return response.status;
        } catch (err) {
            console.error(err);
        }
    };

    const methods = useForm<UploadTeamsFormValuesType>({
        defaultValues: {
            title: '',
            content: '',
            position: '',
            people: '',
            skill: [{ name: '' }],
            endDate: '',
            contact: '',
        },
    });

    const {
        register,
        formState: { errors: formErrors, isSubmitting },
        handleSubmit,
    } = methods;
    const errors = formErrors as FieldErrors<UploadTeamsFormValuesType>;

    return (
        <>
            <h3 className="font-bold text-[28px] text-black">
                팀원 구하기{' '}
                <span className="font-normal text-[16px] text-[var(--color-gray-600)]">
                    * 프로젝트를 소개하고 팀원을 구해 보세요
                </span>
            </h3>
            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    // onSubmit={handleSubmit(onUploadProjectsSubmit)}
                    className="w-full flex flex-col justify-start items-start gap-[48px]"
                    onSubmit={handleSubmit(onSubmit)}
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
                                minLength: {
                                    value: 3,
                                    message: '내용은 3자 이상 입력해주세요',
                                },
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
                            name="position"
                            rules={{ required: '모집 포지션을 선택해주세요' }}
                            errors={errors.position}
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
                            name="people"
                            rules={{ required: '모집 인원을 선택해주세요' }}
                            errors={errors.people}
                        />
                        {/* 스킬 section */}
                        <SearchSkill width="w-[384px]" />
                    </div>

                    {/* 마감일, 연락 방법 section */}
                    <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                        {/* 마감일 section */}
                        <div className="w-[376px] h-fit flex flex-col justify-center items-start gap-[12px] relative">
                            <label
                                htmlFor="endDate"
                                className="text-[24px] font-bold text-[var(--color-gray-900)]"
                            >
                                모집 마감일 *
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                placeholder="제목을 입력해주세요"
                                className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:outline-none transition duration-300 ease-in-out relative ${
                                    errors.endDate
                                        ? 'bg-[var(--color-red-50)] border-[var(--color-red-500)]'
                                        : 'focus:bg-[var(--color-green-50)] border-[var(--color-green-600)]'
                                }`}
                                {...register('endDate', {
                                    required: '마감일을 입력해주세요',
                                })}
                            />
                            {errors.endDate && (
                                <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[124px]">
                                    {errors.endDate.message}
                                </p>
                            )}
                        </div>

                        {/* 연락 방법 section */}
                        <div className="w-[376px] h-fit flex flex-col justify-center items-start gap-[12px] relative">
                            <label
                                htmlFor="contact"
                                className="text-[24px] font-bold text-[var(--color-gray-900)]"
                            >
                                연락 방법 *
                            </label>
                            <input
                                type="text"
                                id="contact"
                                placeholder="이메일/카카오톡 오픈 채팅방 링크"
                                className={`w-full h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out relative ${
                                    errors.contact
                                        ? 'bg-[var(--color-red-50)] border-[var(--color-red-500)]'
                                        : 'bg-[var(--color-green-50)] border-[var(--color-green-600)]'
                                }`}
                                {...register('contact', {
                                    required: '연락 방법을 입력해주세요',
                                })}
                            />
                            {errors.contact && (
                                <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[124px]">
                                    {errors.contact.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        className="w-[248px] h-[48px] rounded-[8px] text-white text-[16px] font-semibold leading-[24px] border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] px-[24px] py-[12px] hover:text-[var(--color-purple-500)] hover:bg-white transition duration-300 ease-in-out cursor-pointer"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        등록하기
                    </button>
                </form>
            </FormProvider>
        </>
    );
};

export default UploadTeams;
