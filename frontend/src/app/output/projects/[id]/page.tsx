'use client';


import OutputHeader from '@/app/customComponents/OutputHeader';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useEffect } from 'react';

interface ProjectsCommentsType {
    projectsComments: string;
}

const OutputProjects = (props: { params: { id: string } }) => {
    // const fetchOutputProject = async () => {
    //     try {
    //         const res = await axios.get('/api/output-project');

    //         console.log(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     fetchOutputProject();
    // }, []);

    console.log(props.params.id);

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProjectsCommentsType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onCommentsSubmit = async () => {};

    const projectsComments = watch('projectsComments', '');

    return (
        <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
            {/* 작성 정보 section */}
            <OutputHeader />

            {/* 프로젝트 기간, 인원 section */}
            <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                <h3 className="font-bold text-[24px]">2025.07~2025.08</h3>
                <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                <h3 className="font-medium text-[20px] whitespace-nowrap">3인</h3>
            </section>

            {/* 담당역할, 스킬 section */}
            <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                <h3 className="font-bold text-[24px]">담당 역할: Front-End</h3>
                <span>스킬들</span>
            </section>

            {/* 프로젝트 내용 section */}
            <section className="flex flex-col gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-center items-start">
                <h3 className="font-bold text-[24px]">프로젝트 내용</h3>
                <div className="border border-[var(--color-gray-300)] w-full h-[312px] p-[24px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal">
                    여기 내용
                </div>
            </section>

            {/* 영상 section */}
            {/* 분기처리 예정 */}
            <section className="flex flex-col gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-center items-start">
                <h3 className="font-bold text-[24px]">영상</h3>
                <div className="border border-[var(--color-gray-300)] w-full h-[312px] p-[24px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal">
                    여기 영상
                </div>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 댓글 section */}
            <section className="w-full h-auto">
                <form
                    onSubmit={handleSubmit(onCommentsSubmit)}
                    className="w-full flex flex-col gap-[12px] justify-center items-start text-[var(--color-gray-900)] relative"
                >
                    <label className="font-bold text-[24px]">3개의 댓글</label>
                    <textarea
                        className={`border w-full h-[120px] p-[12px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal resize-none transition duration-300 ease-in-out focus:outline-none focus:border-[var(--color-purple-500)] ${
                            errors.projectsComments
                                ? 'border-[var(--color-red-500)]'
                                : 'border-[var(--color-gray-300)]'
                        }`}
                        maxLength={1000}
                        {...register('projectsComments', {
                            pattern: {
                                value: /^(?!.*<[^>]*>)(?!.*https?:\/\/).+$/,
                                message: '유효하지 않은 입력입니다. 태그와 외부 링크는 금지됩니다.',
                            },
                        })}
                    />
                    <div className="absolute left-0 top-[178px] text-[var(--color-gray-500)]">
                        {projectsComments.length} / 1000
                    </div>
                    {errors.projectsComments && (
                        <p className="text-sm text-[var(--color-red-500)] absolute right-[120px] top-[178px]">
                            {errors.projectsComments.message}
                        </p>
                    )}
                    <button
                        className={`w-[108px] h-[48px] rounded-[8px] text-[16px] font-semibold transition duration-300 ease-in-out self-end ${projectsComments ? 'text-white border border-[var(--color-purple-500)] bg-[var(--color-purple-500)] hover:text-[var(--color-purple-500)] hover:bg-white cursor-pointer' : 'text-[var(--color-gray-400)] border border-[var(--color-gray-200)] bg-[var(--color-gray-100)] cursor-not-allowed'}`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        댓글 작성
                    </button>
                </form>
            </section>
        </main>
    );
};

export default OutputProjects;
