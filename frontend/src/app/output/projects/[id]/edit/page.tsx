'use client';

// import { useForm } from 'react-hook-form';
import LikePost from '@/app/customComponents/LikePost';
import TopBtn from '@/app/customComponents/TopBtn';
import { useProjectDetail } from '@/app/hooks/useProjectDetatil';
import Like from '@/app/customComponents/Like';
import { useLikeProejct } from '@/app/hooks/useLikeProject';
import { FormProvider, useForm } from 'react-hook-form';
import { UploadProjectsFormValuesType } from '@/app/upload/projects/page';
import { useEffect } from 'react';
import UploadDropDown from '@/app/customComponents/UploadDropDown';
import { useEditProject } from '@/app/hooks/useEditProject';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import SearchSkill from '@/app/customComponents/SearchSkill';

const ProjectsEdit = (props: { params: { id: string } }) => {
    const id = props.params.id;
    const { data: project, isLoading, isError, error } = useProjectDetail(id);
    const mutate = useEditProject(id);
    const { data: like } = useLikeProejct(id);
    const router = useRouter();
    const queryclient = useQueryClient();
    const method = useForm<UploadProjectsFormValuesType>({
        defaultValues: {
            title: '',
            endDate: '',
            people: '',
            distribution: '배포중',
            role: '',
            projectURL: '',
            description: '',
            skills: [],
            thumbnailImg: '',
            thumbnailURL: '',
            demonstrationVideo: '',
            projectPosition: '',
            startDate: '',
        },
    });
    const { reset, handleSubmit } = method;

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                endDate: project.endDate,
                people: project.people,
                distribution: project.distribution ? '배포중' : '배포 완료',
                role: project.role,
                projectURL: project.projectURL,
                description: project.description,
                skills: project.skills,
                thumbnailImg: project.thumbnailImg,
                thumbnailURL: project.thumbnailURL,
                demonstrationVideo: project.demonstrationVideo,
                projectPosition: project.projectPosition,
                startDate: project.startDate,
            });
        }
    }, [project, reset]);
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!project?.id) return <p>프로젝트가 삭제되었거나 찾을 수 없습니다.</p>;
    if (!project.owner) return router.push('/');
    const peopleArr = [...Array.from({ length: 9 }, (_, i) => `${i + 1}명`), '10명 이상'];
    const projectPositionArr = ['', 'Front-end-개발', 'Back-end-개발', 'PM-기획', 'UI/UX-디자인'];
    const isDeployArr = ['배포 중', '배포 완료'];
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

    const onSubmit = async (data: UploadProjectsFormValuesType) => {
        try {
            const formdata = new FormData();
            formdata.append('title', data.title);
            formdata.append('startDate', data.startDate);
            formdata.append('endDate', data.endDate);
            formdata.append('people', data.people);
            formdata.append('description', data.description);
            formdata.append('role', data.role);
            formdata.append('projectURL', data.projectURL);
            formdata.append('distribution', data.distribution === '배포 중' ? 'true' : 'false');
            data.skills.forEach((item, i) => {
                if (item.name) formdata.append(`skillIds[${i}]`, item.id);
            });

            await mutate.mutateAsync(formdata);
            queryclient.invalidateQueries();
            router.push(`/output/projects/${id}`);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
                    {/* 작성 정보 section */}
                    <section className="flex flex-col gap-[24px] w-full h-auto">
                        {/* 제목, 배포현황 */}
                        <div className="w-full flex flex-row justify-between items-start">
                            <span className="w-[654px] h-[104px] flex justify-start items-start">
                                <input
                                    className="font-bold text-[40px] leading-[44px]"
                                    {...method.register('title', {
                                        required: '필수 값 입니다.',
                                    })}
                                />
                            </span>
                            <span className="w-auto h-[104px]">
                                <div
                                    className={`w-fit h-[40px] font-semibold text-[16px] flex justify-center items-center rounded-[20px]
                                ${project?.distribution ? ' text-[var(--color-green-600)]' : ' text-[var(--color-red-500)]'}
                                `}
                                >
                                    <UploadDropDown
                                        arr={['배포 중', '배포 완료']}
                                        width="w-full"
                                        dropDownLabel=""
                                        dropDownPlaceholoder=""
                                        gap=""
                                        height="h-[50px]"
                                        name="distribution"
                                        labelFont=""
                                        labelText=""
                                    />
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
                        </div>
                        {/* 밑줄 */}
                        <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />
                    </section>

                    {/* 프로젝트 기간, 인원 section */}
                    <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                        <input
                            type="date"
                            className="font-bold text-[24px] relative"
                            {...method.register('startDate', {
                                required: '필수 값 입니다.',
                            })}
                        />
                        <input
                            type="date"
                            className="font-bold text-[24px] relative"
                            {...method.register('endDate', {
                                required: '필수 값 입니다.',
                            })}
                        />

                        <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                        <UploadDropDown
                            arr={peopleArr}
                            width="w-full"
                            height="h-[36px]"
                            gap=""
                            labelFont=""
                            labelText=""
                            dropDownLabel=""
                            dropDownPlaceholoder=""
                            name="people"
                        />
                        {/* <h3 className="font-medium text-[20px] whitespace-nowrap">
                            {project.people}
                        </h3> */}
                    </section>

                    {/* 담당역할, 스킬 section */}
                    <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                        <h3 className="font-bold text-[24px]">담당 역할</h3>
                        <UploadDropDown
                            arr={projectPositionArr}
                            width="w-full"
                            height="h-[36px]"
                            gap=""
                            labelFont=""
                            labelText=""
                            dropDownLabel=""
                            dropDownPlaceholoder=""
                            name="role"
                        />
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
                    <section>
                        <SearchSkill fieldName="skills" />
                    </section>
                    <section className="flex flex-row gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-start items-center">
                        <h3 className="font-bold text-[24px]">Url</h3>
                        {!project.projectURL && (
                            <input
                                type="text"
                                name="projectUrl"
                                placeholder="프로젝트 URL을 입력해 주세요."
                                className="px-[8px] py-[6px]"
                            />
                        )}
                        {!project.distribution && (
                            <UploadDropDown
                                arr={isDeployArr}
                                width="w-full"
                                height="h-[36px]"
                                gap=""
                                labelFont=""
                                labelText=""
                                dropDownLabel=""
                                dropDownPlaceholoder=""
                                name="distribution"
                            />
                        )}
                    </section>

                    {/* 프로젝트 내용 section */}
                    <section className="flex flex-col gap-[12px] w-full h-auto text-[var(--color-gray-900)] justify-center items-start">
                        <h1 className="font-bold text-[24px]">프로젝트 내용</h1>
                        <textarea
                            className="border resize-none border-[var(--color-gray-300)] w-full h-[312px] p-[24px] rounded-[8px] text-[16px] text-[var(--color-gray-900)] font-normal"
                            {...method.register('description', {
                                required: '필수 값 입니다.',
                            })}
                        />
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
                                ) : project.demonstrationVideo.match(
                                      /\.(jpg|jpeg|png|gif|webp)$/i,
                                  ) ? (
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
                        <div className="flex ml-auto">
                            <button
                                type="submit"
                                className="flex justify-center max-w-[248px] min-h-[48px] items-center px-[96px] bg-purple-500 text-white text-[14px] font-semibold rounded-[8px] cursor-pointer"
                                disabled={isLoading}
                                onClick={() => {
                                    if (document.activeElement instanceof HTMLElement) {
                                        document.activeElement.blur();
                                    }
                                }}
                            >
                                수정하기
                            </button>
                        </div>
                    </section>

                    <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

                    <Like likeData={like} />

                    <LikePost id={id} />
                    <TopBtn />
                </main>
            </form>
        </FormProvider>
    );
};

export default ProjectsEdit;
