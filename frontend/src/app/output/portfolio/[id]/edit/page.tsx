'use client';
import { useParams, useRouter } from 'next/navigation';
import { usePortfolioDetail } from '@/app/hooks/usePortfolioDetail';
import dayjs from 'dayjs';
import Like from '@/app/customComponents/Like';
import { useLikePortfolio } from '@/app/hooks/useLikePortfolio';
import LikePost from '@/app/customComponents/LikePost';
import TopBtn from '@/app/customComponents/TopBtn';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import UploadDropDown from '@/app/customComponents/UploadDropDown';
import { useEffect } from 'react';
import { FormData as PortfolioFormData } from '@/app/upload/portfolios/page';
import SearchSkill from '@/app/customComponents/SearchSkill';
import { useEditPortfolio } from '@/app/hooks/useEditPortfolio';
import { useQueryClient } from '@tanstack/react-query';
import { AiOutlineClose } from 'react-icons/ai';

const PortfolioEdit = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const { data: portfolio, isLoading, isError, error } = usePortfolioDetail(id);
    const queryclient = useQueryClient();
    const mutateEdit = useEditPortfolio(id);
    const { data: like } = useLikePortfolio(id);

    // ✅ 기본값 정의
    const method = useForm<PortfolioFormData>({
        defaultValues: {
            title: '',
            email: '',
            jobPosition: '',
            industry: '',
            introductions: '',
            skill: [],
            educations: [],
            careers: [],
            projectDescriptions: [],
            awards: [],
            certificates: [],
        },
    });

    const { handleSubmit, control, register, reset } = method;

    // ✅ useFieldArray 설정
    const educationsArray = useFieldArray({ control, name: 'educations' });
    const careersArray = useFieldArray({ control, name: 'careers' });
    const projectsArray = useFieldArray({ control, name: 'projectDescriptions' });
    const awardsArray = useFieldArray({ control, name: 'awards' });
    const certificatesArray = useFieldArray({ control, name: 'certificates' });

    // ✅ portfolio 데이터를 form에 동기화
    useEffect(() => {
        if (portfolio) {
            reset({
                title: portfolio.title,
                email: portfolio.email,
                jobPosition: portfolio.jobPosition,
                industry: portfolio.industry,
                introductions: portfolio?.introductions,
                skill: portfolio.skill,
                educations: portfolio.educations.map((e) => ({
                    school: e.school,
                    schoolStatus: e.schoolStatus,
                })),
                careers: portfolio.careers.map((c) => ({
                    companyName: c.companyName,
                    companyPosition: c.companyPosition,
                    duty: c.duty,
                    startDate: dayjs(c.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(c.endDate).format('YYYY-MM-DD'),
                    dutyDescription: c.dutyDescription,
                })),
                projectDescriptions: portfolio.projectDescriptions.map((p) => ({
                    description: p.description,
                })),
                awards: portfolio.awards.map((a) => ({
                    awardDescription: a.awardDescription,
                })),
                certificates: portfolio.certificates.map((c) => ({
                    certificateName: c.certificateName,
                    certificateDate: dayjs(c.certificateDate).format('YYYY-MM-DD'),
                    number: c.number,
                })),
            });
        }
    }, [portfolio, reset]);

    // ✅ 제출 로직
    const onSubmitEdit = async (data: PortfolioFormData) => {
        try {
            const formdata = new FormData();
            formdata.append('title', data.title);
            formdata.append('email', data.email);
            formdata.append('jobPosition', data.jobPosition);
            formdata.append('introductions', data.introductions ?? '');
            formdata.append('industry', data.industry);

            data.skill.forEach((item, i) => {
                if (item.name) formdata.append(`skillIds[${i}]`, item.id);
            });

            data.educations.forEach((item, i) => {
                formdata.append(`educations[${i}].school`, item.school);
                formdata.append(`educations[${i}].schoolStatus`, item.schoolStatus);
            });

            data.careers.forEach((item, i) => {
                formdata.append(`careers[${i}].companyName`, item.companyName);
                formdata.append(`careers[${i}].companyPosition`, item.companyPosition);
                formdata.append(`careers[${i}].duty`, item.duty);
                formdata.append(`careers[${i}].dutyDescription`, item.dutyDescription);
                formdata.append(`careers[${i}].startDate`, item.startDate);
                formdata.append(`careers[${i}].endDate`, item.endDate);
            });

            data.projectDescriptions.forEach((item, i) => {
                formdata.append(`projectDescriptions[${i}].description`, item.description);
            });

            data.awards.forEach((item, i) => {
                formdata.append(`awards[${i}].awardDescription`, item.awardDescription);
            });

            data.certificates.forEach((item, i) => {
                formdata.append(`certificates[${i}].certificateName`, item.certificateName);
                formdata.append(`certificates[${i}].certificateDate`, item.certificateDate);
                formdata.append(`certificates[${i}].number`, item.number);
            });

            await mutateEdit.mutateAsync(formdata);
            queryclient.invalidateQueries();
            router.push(`/output/portfolio/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ 드롭다운 리스트
    const industryArr = ['기획', '개발', '디자인', '마케팅', '기타'];
    const jobPositionArr = [
        'Frontend',
        'Backend',
        'Designer',
        'Publisher',
        'PM',
        'Marketer',
        'DevOps',
        'QA',
    ];
    const schoolStatusArr = ['졸업', '재학', '휴학', '중퇴', '졸업예정'];

    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!portfolio?.id) return <p>포트폴리오가 삭제되었거나 찾을 수 없습니다.</p>;

    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmitEdit)}>
                <main className="w-[768px] flex justify-start items-center">
                    <div className="flex gap-[48px] flex-col w-full">
                        {/* 제목 */}
                        <section className="flex gap-[24px] flex-col w-full">
                            <input
                                className="text-[40px] font-bold"
                                {...register('title', { required: '필수 값 입니다.' })}
                            />
                            <div className="flex w-full justify-between text-[16px] text-gray-500 ">
                                <div className="flex w-fit items-center gap-[12px]">
                                    <p>{portfolio.writeName}</p>
                                    <div className="border-r h-[14px] border-gray-300" />
                                    <p>{dayjs(portfolio.createAt).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                            <hr />
                        </section>

                        <section className="flex w-full gap-[24px] items-center">
                            <div className="w-fit flex gap-[12px] items-center">
                                <UploadDropDown
                                    arr={industryArr}
                                    dropDownLabel=""
                                    width="min-w-[150px]"
                                    height="min-h-[36px]"
                                    name="industry"
                                    labelText="text-[24px]"
                                    labelFont="font-bold"
                                    gap=""
                                    dropDownPlaceholoder=""
                                />
                                <div className="border-r h-[14px] border-gray-300" />
                                <UploadDropDown
                                    arr={jobPositionArr}
                                    dropDownLabel=""
                                    width="min-w-[150px]"
                                    height="min-h-[36px]"
                                    name="jobPosition"
                                    labelText="text-[24px]"
                                    labelFont="font-bold"
                                    gap=""
                                    dropDownPlaceholoder=""
                                />
                            </div>
                        </section>

                        {/* 스킬 */}
                        <section className="gap-[12px] flex flex-col">
                            <p className="flex gap-[8px] flex-wrap">
                                {portfolio.skill.map((s, idx) => (
                                    <div
                                        className="flex text-purple-500 bg-purple-50 px-[16px] py-[6px] rounded-[20px] box-border text-[14px] font-semibold"
                                        key={`${idx}_${s.id}`}
                                    >
                                        {s.name}
                                    </div>
                                ))}
                            </p>
                            <SearchSkill />
                        </section>

                        {/* 본인소개 */}
                        <section className="flex w-full flex-col gap-[12px]">
                            <h2 className="text-[24px] font-bold">본인소개</h2>
                            <textarea
                                className="border p-[24px] rounded-[8px] resize-none min-h-[312px]"
                                {...register('introductions', { required: '필수 항목입니다.' })}
                                placeholder="자기소개를 입력해 주세요."
                            />
                        </section>

                        {/* 학력 */}
                        {educationsArray.fields.length > 0 && (
                            <section className="w-full flex items-start gap-[12px]">
                                <h2 className="text-[24px] font-bold text-nowrap">학력</h2>
                                <div className="text-[20px] flex-col gap-[12px] flex w-full ">
                                    {educationsArray.fields.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-[12px] items-center w-full relative"
                                        >
                                            <input
                                                {...register(`educations.${idx}.school`)}
                                                className="w-[70%] px-[8px]"
                                                placeholder="학교명"
                                            />
                                            <div className="w-[20%]">
                                                <UploadDropDown
                                                    arr={schoolStatusArr}
                                                    dropDownLabel=""
                                                    width="w-full "
                                                    height="min-h-[36px]"
                                                    name={`educations.${idx}.schoolStatus`}
                                                    labelText="text-[24px]"
                                                    labelFont="font-bold"
                                                    gap=""
                                                    dropDownPlaceholoder="상태"
                                                />
                                            </div>
                                            {educationsArray.fields.length > 1 && (
                                                <button
                                                    className="cursor-pointer"
                                                    type="button"
                                                    onClick={() =>
                                                        educationsArray.remove(
                                                            educationsArray.fields.length - 1,
                                                        )
                                                    }
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {educationsArray.fields.length < 3 && (
                                        <button
                                            type="button"
                                            className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                            onClick={() =>
                                                educationsArray.append({
                                                    school: '',
                                                    schoolStatus: '',
                                                    id: educationsArray.fields.length,
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* 경력 */}
                        {careersArray.fields.length > 0 && (
                            <section className="w-full flex flex-col gap-[12px]">
                                <h2 className="text-[24px] font-bold">경력</h2>
                                <div className="flex flex-col gap-[12px] w-full">
                                    {careersArray.fields.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="border p-[24px] flex flex-col gap-[12px] rounded-[8px] w-full"
                                        >
                                            <div className="flex gap-[12px] items-center text-[16px] font-semibold w-full">
                                                <input
                                                    className="w-[25%]"
                                                    {...register(`careers.${idx}.companyName`)}
                                                    placeholder="회사명"
                                                />
                                                <div className="border-r h-[14px] border-gray-300" />
                                                <input
                                                    className="w-[10%]"
                                                    {...register(`careers.${idx}.duty`)}
                                                    placeholder="직무"
                                                />
                                                <div className="border-r h-[14px] border-gray-300" />
                                                <input
                                                    className="w-[10%]"
                                                    {...register(`careers.${idx}.companyPosition`)}
                                                    placeholder="직책"
                                                />
                                                <div className="border-r h-[14px] border-gray-300" />
                                                <input
                                                    type="date"
                                                    className="w-[20%] relative"
                                                    {...register(`careers.${idx}.startDate`)}
                                                />
                                                <div className="border-r h-[14px] border-gray-300" />
                                                <input
                                                    type="date"
                                                    className="w-[20%] relative"
                                                    {...register(`careers.${idx}.endDate`)}
                                                />
                                                {careersArray.fields.length > 1 && (
                                                    <button
                                                        className="cursor-pointer"
                                                        type="button"
                                                        onClick={() =>
                                                            careersArray.remove(
                                                                careersArray.fields.length - 1,
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineClose />
                                                    </button>
                                                )}
                                            </div>

                                            <textarea
                                                className="w-full border p-[24px] rounded-[8px] resize-none overflow-y-auto min-h-[312px]"
                                                {...register(`careers.${idx}.dutyDescription`)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {careersArray.fields.length < 3 && (
                                    <button
                                        type="button"
                                        className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                        onClick={() =>
                                            careersArray.append({
                                                companyName: '',
                                                companyPosition: '',
                                                duty: '',
                                                date: '',
                                                endDate: '',
                                                startDate: '',
                                                dutyDescription: '',
                                                id: careersArray.fields.length,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                )}
                            </section>
                        )}

                        {/* 프로젝트 */}
                        {projectsArray.fields.length > 0 && (
                            <section className="w-full flex flex-col gap-[12px] ">
                                <h2 className="text-[24px] font-bold ">프로젝트</h2>
                                {projectsArray.fields.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="border p-[24px] rounded-[8px] relative"
                                    >
                                        <textarea
                                            className="resize-none overflow-y-auto min-h-[312px] w-full"
                                            {...register(`projectDescriptions.${idx}.description`)}
                                            placeholder="진행한/진행중인 프로젝트를 입력해주세요."
                                        />
                                        {projectsArray.fields.length > 1 && (
                                            <button
                                                className="absolute top-2 right-2 cursor-pointer"
                                                type="button"
                                                onClick={() =>
                                                    projectsArray.remove(
                                                        projectsArray.fields.length - 1,
                                                    )
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {projectsArray.fields.length < 3 && (
                                    <button
                                        className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                        type="button"
                                        onClick={() =>
                                            projectsArray.append({
                                                description: '',
                                                id: projectsArray.fields.length,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                )}
                            </section>
                        )}

                        {/* 수상 */}
                        {awardsArray.fields.length > 0 && (
                            <section className="w-full flex flex-col gap-[12px]">
                                <h2 className="text-[24px] font-bold">수상</h2>
                                {awardsArray.fields.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="border p-[24px] rounded-[8px] relative"
                                    >
                                        <textarea
                                            className="resize-none overflow-y-auto min-h-[312px] w-full"
                                            {...register(`awards.${idx}.awardDescription`)}
                                            placeholder="수상내역을 입력해주세요."
                                        />
                                        {awardsArray.fields.length > 1 && (
                                            <button
                                                className="absolute top-2 right-2 cursor-pointer"
                                                type="button"
                                                onClick={() =>
                                                    awardsArray.remove(
                                                        awardsArray.fields.length - 1,
                                                    )
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {awardsArray.fields.length < 3 && (
                                    <button
                                        type="button"
                                        className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                        onClick={() =>
                                            awardsArray.append({
                                                awardDescription: '',
                                                id: awardsArray.fields.length,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                )}
                            </section>
                        )}

                        {/* 자격 */}
                        {certificatesArray.fields.length > 0 && (
                            <section className="w-full flex flex-col gap-[12px]">
                                <h2 className="text-[24px] font-bold ">자격/어학</h2>
                                {certificatesArray.fields.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-[12px] w-full relative"
                                    >
                                        <input
                                            className="w-[33%]"
                                            {...register(`certificates.${idx}.certificateName`)}
                                            placeholder="자격이름"
                                        />
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <input
                                            className="w-[33%] relative"
                                            {...register(`certificates.${idx}.number`)}
                                            placeholder="자격번호"
                                        />
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <input
                                            type="date"
                                            className="w-[25%] relative"
                                            {...register(`certificates.${idx}.certificateDate`)}
                                        />
                                        {certificatesArray.fields.length > 1 && (
                                            <button
                                                className="cursor-pointer"
                                                type="button"
                                                onClick={() =>
                                                    certificatesArray.remove(
                                                        careersArray.fields.length - 1,
                                                    )
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {certificatesArray.fields.length < 3 && (
                                    <button
                                        type="button"
                                        className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                        onClick={() =>
                                            certificatesArray.append({
                                                certificateDate: '',
                                                certificateName: '',
                                                number: '',
                                                id: certificatesArray.fields.length,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                )}
                            </section>
                        )}

                        <Like likeData={like} />
                    </div>
                    <LikePost id={id} />
                    <TopBtn />
                </main>

                <div className="flex justify-end">
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
            </form>
        </FormProvider>
    );
};

export default PortfolioEdit;
