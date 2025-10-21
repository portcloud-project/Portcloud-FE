'use client';

// import { useForm } from 'react-hook-form';
import TopBtn from '@/app/customComponents/TopBtn';
import CommentProject from '@/app/customComponents/CommentProject';
import { useProjectDetail } from '@/app/hooks/useProjectDetatil';
import { useDeleteProject } from '@/app/hooks/useDeleteProject';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Like from '@/app/customComponents/Like';
import { useLikeProejct } from '@/app/hooks/useLikeProject';
import CommentProjectView from '@/app/customComponents/CommentViewProject';
import BookMarkProject from '@/app/customComponents/BookMarkProject';
import dayjs from 'dayjs';
import { useState } from 'react';
import CustomConfirm from '@/app/customComponents/CustomConfirm';
import LikePost from '@/app/customComponents/LikePostProject';

const OutputProjects = (props: { params: { id: string } }) => {
    const id = props.params.id;
    const { data: project, isLoading, isError, error } = useProjectDetail(id);
    const deleteMutation = useDeleteProject();
    const router = useRouter();
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const queryclient = useQueryClient();
    const { data: like } = useLikeProejct(id);

    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!project?.id) return <p>프로젝트가 삭제되었거나 찾을 수 없습니다.</p>;

    const writeInfoArr = [
        {
            title: '작성자',
            value: `${project.writeName}`,
        },
        {
            title: '작성기간',
            value: `${dayjs(project.createdAt).format('YYYY-MM-DD')}`,
        },
    ];

    const handleDelete = async () => {
        if (!project?.owner) {
            return alert('사용자 정보가 일치하지 않습니다');
        }
        try {
            await deleteMutation.mutateAsync(id);
            queryclient.invalidateQueries({
                queryKey: ['recent_project', 'mainlist'],
            });
            router.push('/works/projects');
        } catch (err) {
            console.error(err);
        }
    };

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
                        <div
                            className={`w-[90px] h-[40px] border font-semibold text-[16px] flex justify-center items-center rounded-[20px]
                                ${project?.distribution ? 'border-[var(--color-green-600)] text-[var(--color-green-600)]' : 'border-[var(--color-red-500)] text-[var(--color-red-500)]'}
                                `}
                        >
                            {project?.distribution ? '배포 중' : '배포 종료'}
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
                    {project?.owner && (
                        <span className="flex flex-row justify-start items-center gap-[8px] text-[16px] font-normal text-[var(--color-gray-500)]">
                            <button
                                className="cursor-pointer"
                                onClick={() => router.push(`/output/projects/${id}/edit`)}
                            >
                                수정
                            </button>
                            <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                            <button
                                className="cursor-pointer"
                                onClick={() => setIsOpenConfirm(true)}
                            >
                                삭제
                            </button>
                        </span>
                    )}
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
                <ul className="w-fit flex flex-row gap-[12px]">
                    {project?.skills.map((a, i) => (
                        <li
                            className="w-[70px] h-[34px] rounded-[20px] flex justify-center items-center bg-[var(--color-purple-50)] text-[var(--color-purple-500)] font-bold text-[14px] whitespace-nowrap"
                            key={i}
                        >
                            {a.name}
                        </li>
                    ))}
                </ul>
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
                    {project.demonstrationVideoUrl ? (
                        project.demonstrationVideoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                                src={`https://port-cloud.com/img/${project.demonstrationVideoUrl}`}
                                controls
                                className="w-full h-full object-contain rounded"
                            />
                        ) : project.demonstrationVideoUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
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

            <Like likeData={like} />
            <section className="w-full flex ">
                <CommentProject id={id} />
            </section>
            <section className="w-full flex ">
                <CommentProjectView id={id} />
            </section>
            <LikePost id={id} />
            <BookMarkProject id={id} />
            <TopBtn />
            {isOpenConfirm && (
                <CustomConfirm
                    onAccept={handleDelete}
                    onCancel={() => setIsOpenConfirm(false)}
                    title="프로젝트 삭제"
                    message="정말로 프로젝트를 삭제하시겠습니까 ? "
                />
            )}
        </main>
    );
};

export default OutputProjects;
