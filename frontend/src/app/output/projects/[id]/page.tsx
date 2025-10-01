'use client';

// import { useForm } from 'react-hook-form';
import LikePost from '@/app/customComponents/LikePost';
import TopBtn from '@/app/customComponents/TopBtn';
import CommentView from '@/app/customComponents/CommentView';
import CommentProject from '@/app/customComponents/CommentProject';
import { useProjectDetail } from '@/app/hooks/useProjectDetatil';
// import Image from 'next/image';

// interface ProjectsCommentsType {
//     projectsComments: string;
// }

const OutputProjects = (props: { params: { id: string } }) => {
    const id = props.params.id;
    const { data: project, isLoading, isError, error } = useProjectDetail(id);
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!project?.id) return <p>프로젝트가 삭제되었거나 찾을 수 없습니다.</p>;

    // const {
    //     watch,
    //     register,
    //     handleSubmit,
    //     formState: { errors, isSubmitting },
    // } = useForm<ProjectsCommentsType>({
    //     mode: 'onChange',
    //     reValidateMode: 'onChange',
    // });

    // const onCommentsSubmit = async () => {};

    // const projectsComments = watch('projectsComments', '');

    const writeInfoArr = [
        {
            title: '작성자',
            value: `${project.writeName}`,
        },
        {
            title: '작성기간',
            value: `${project.createdAt}`,
        },
    ];

    return (
        <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
            {/* 작성 정보 section */}
            <section className="flex flex-col gap-[24px] w-full h-auto">
                {/* 제목, 배포현황 */}
                <div className="w-full flex flex-row justify-between items-start">
                    <span className="w-[654px] h-[104px] flex justify-start items-start">
                        <h3 className="font-bold text-[40px] leading-[44px]">{project.title}</h3>
                    </span>
                    <span className="w-auto h-[104px]">
                        {/* 분기처리 예정 */}
                        <div
                            className={`w-[90px] h-[40px] border border-[var(--color-green-600)] text-[var(--color-green-600)] font-semibold text-[16px] flex justify-center items-center rounded-[20px]`}
                        >
                            배포중
                        </div>
                    </span>
                </div>
                {/* 작성자, 작성기간, 수정 및 삭제 */}
                <div className="w-full flex flex-row justify-between items-center">
                    <span className="flex flex-row justify-start items-center gap-[8px] text-[16px]">
                        {writeInfoArr.map((a, i) => {
                            return (
                                <span
                                    key={i}
                                    className="flex flex-row justify-start items-center gap-[6px]"
                                >
                                    <h3 className="font-normal text-[var(--color-gray-500)]">
                                        {a.title}
                                    </h3>
                                    <p className="font-semibold text-[var(--color-gray-500)]">
                                        {a.value}
                                    </p>
                                </span>
                            );
                        })}
                        {/* 중간에 | 이거 넣어야함 예정 */}
                    </span>
                    {/* 분기처리 예정 */}
                    <span className="flex flex-row justify-start items-center gap-[8px] text-[16px] font-normal text-[var(--color-gray-500)]">
                        <button className="cursor-pointer">수정</button>
                        <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                        <button className="cursor-pointer">삭제</button>
                    </span>
                </div>
                {/* 밑줄 */}
                <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />
            </section>

            {/* 프로젝트 기간, 인원 section */}
            <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                <h3 className="font-bold text-[24px]">
                    {project.startDate} ~ {project.endDate}
                </h3>
                <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                <h3 className="font-medium text-[20px] whitespace-nowrap">{project.people}</h3>
            </section>

            {/* 담당역할, 스킬 section */}
            <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                <h3 className="font-bold text-[24px]">담당 역할: {project.role}</h3>
                <span>스킬들</span>
            </section>

            {/* 프로젝트 내용 section */}
            <section className="flex flex-col gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-center items-start">
                <h3 className="font-bold text-[24px]">프로젝트 내용</h3>
                <div className="border border-[var(--color-gray-300)] w-full h-[312px] p-[24px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal">
                    {project.description}
                </div>
            </section>

            {/* 영상 section */}
            <section className="flex flex-col gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-center items-start">
                <h3 className="font-bold text-[24px]">영상</h3>
                <div className="border border-[var(--color-gray-300)] w-full h-[312px] p-[24px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal">
                    {project.demonstrationVideo ? (
                        project.demonstrationVideo.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                                src={project.demonstrationVideo}
                                controls
                                className="w-full h-full object-contain rounded"
                            />
                        ) : project.demonstrationVideo.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <div
                                className="h-full w-auto"
                                style={{
                                    backgroundImage: `url(https://port-cloud.com/img/${project.demonstrationVideo})`,
                                }}
                            ></div>
                        ) : (
                            <span>지원하지 않는 형식입니다.</span>
                        )
                    ) : (
                        <span>데모 자료가 없습니다.</span>
                    )}
                </div>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 댓글 section */}
            {/* <section className="w-full h-auto">
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
            </section> */}
            <section className="w-full flex ">
                <CommentProject id={id} />
            </section>
            <section className="w-full flex ">
                <CommentView id={id} />
            </section>
            <LikePost id={id} />
            <TopBtn />
        </main>
    );
};

export default OutputProjects;
