'use client';

import SearchSkill from '@/app/customComponents/SearchSkill';
import UploadDropDown from '@/app/customComponents/UploadDropDown';
import { useEditTeams } from '@/app/hooks/useEditTeams';
import { TeamDetailType, useTeamDetail } from '@/app/hooks/useTeamsDetail';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

const EditTeams = (props: { params: { id: string } }) => {
    const id = props.params.id;
    const { data: teams, isLoading, isError, error } = useTeamDetail(id);

    const method = useForm<TeamDetailType>();
    const { reset, control, handleSubmit } = method;
    const recuitRolesArray = useFieldArray({ control, name: 'recruitRoles' });
    const mutate = useEditTeams(id);
    // const router = useRouter();

    useEffect(() => {
        if (teams) {
            reset({
                title: teams.title,
                content: teams.content,
                recruitRoles: teams.recruitRoles.map((rec) => ({
                    role: rec.role,
                    people: rec.people,
                    skills: rec.skills,
                    count: rec.count,
                })),
                contactMethod: teams.contactMethod,
                recruitStatus: teams.recruitStatus,
                recruitDeadline: teams.recruitDeadline,
            });
        }
    }, [teams, reset]);

    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!teams?.id) return <p>해당 팀이 삭제되었거나 찾을 수 없습니다.</p>;
    // if (!teams.owner) return router.push('/');
    const peopleArr = [...Array.from({ length: 5 }, (_, i) => `${i + 1}`)];
    const engToKo = (a: string): string => {
        return a === 'RECRUITING' ? '모집 중' : '모집 마감';
    };
    const roleArr = ['Back-end', 'Front-end', 'Full-stack', 'PM', 'Designer'];
    console.log(teams.recruitRoles);

    const writeInfoArr = [
        {
            title: '작성자',
            value: `${teams?.writerName ?? ''}`,
        },
        {
            title: '작성기간',
            value: `${dayjs(teams?.createdAt).format('YYYY-MM-DD')}`,
        },
    ];

    console.log(typeof teams?.recruits);

    const contactArr = [
        {
            title: '모집 마감일',
            value: `${teams?.recruitDeadline}`,
        },
        {
            title: '연락 방법',
            value: `${teams?.contactMethod}`,
        },
    ];

    const handleEditSubmit = async (data: TeamDetailType) => {
        console.log(data);
        try {
            mutate.mutateAsync(data);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(handleEditSubmit)}>
                <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
                    {/* 작성 정보 section */}
                    <section className="flex flex-col gap-[24px] w-full h-auto">
                        {/* 제목, 배포현황 */}
                        <div className="w-full h-[104px] flex flex-row justify-between items-start">
                            <span className="w-full h-[104px] flex justify-start items-start">
                                <input
                                    className="font-bold text-[40px] leading-[44px]"
                                    {...method.register('title', {
                                        required: '필수 값 입니다.',
                                    })}
                                ></input>
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
                        </div>
                    </section>

                    {/* 밑줄 */}
                    <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

                    {/* 내용 section */}
                    <section className="flex flex-col w-full h-auto justify-center items-start">
                        <textarea
                            className="text-[16px] w-full resize-none min-h-[324px] font-normal text-[var(--color-gray-900)]"
                            {...method.register('content', {
                                required: '필수 값 입니다.',
                            })}
                        ></textarea>
                    </section>

                    {/* 밑줄 */}
                    <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

                    {/* 포지션 별 내용 section */}
                    {recuitRolesArray.fields.length > 0 && (
                        <div>
                            <section className="flex flex-row gap-[16px] w-full h-auto justify-between items-center flex-wrap">
                                {recuitRolesArray.fields.map((field, i) => (
                                    <span
                                        className="w-[calc(50%-8px)] border border-[var(--color-gray-300)] p-[20px] rounded-[8px] gap-[8px] flex flex-col justify-center items-start relative h-[280px] overflow-y-auto"
                                        key={field.id ? field.id : `recruitRole_${i}`}
                                    >
                                        <div className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]">
                                            <h3 className="font-semibold whitespace-nowrap">
                                                포지션
                                            </h3>
                                            <span className="text-[var(--color-gray-300)] text-[14px]">
                                                |
                                            </span>
                                            <UploadDropDown
                                                arr={roleArr}
                                                dropDownLabel=""
                                                width="w-full "
                                                height="max-h-[24px]"
                                                name={`recruitRoles.${i}.role`}
                                                labelText="text-[24px]"
                                                labelFont="font-bold"
                                                gap=""
                                                dropDownPlaceholoder="모집 인원"
                                            />
                                        </div>
                                        <div className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]">
                                            <h3 className="font-semibold whitespace-nowrap">
                                                인원
                                            </h3>
                                            <span className="text-[var(--color-gray-300)] text-[14px]">
                                                |
                                            </span>
                                            <UploadDropDown
                                                arr={peopleArr}
                                                dropDownLabel=""
                                                width="w-full "
                                                height="max-h-[24px]"
                                                name={`recruitRoles.${i}.count`}
                                                labelText="text-[24px]"
                                                labelFont="font-bold"
                                                gap=""
                                                dropDownPlaceholoder="모집 인원"
                                            />
                                        </div>
                                        <p className="flex flex-wrap gap-[8px]">
                                            {field.skills.map((a, idx) => (
                                                <div
                                                    key={`${a}_skill_${idx}`}
                                                    className="flex text-purple-500 bg-purple-50 px-[16px] py-[6px] rounded-[20px] box-border text-[14px] font-semibold"
                                                >
                                                    {a}
                                                </div>
                                            ))}
                                        </p>
                                        <div className="w-full h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]">
                                            <SearchSkill
                                                key={`${i}_skill`}
                                                labelName=""
                                                fieldName={`recruitRoles.${i}.skills`}
                                            />
                                        </div>
                                        <div
                                            className={`flex justify-center  items-center w-[72px] h-[34px] border rounded-full absolute top-[18px] right-[20px] ${teams?.recruitStatus === 'RECRUITING' ? 'border-[var(--color-purple-500)] bg-[var(--color-purple-50)]' : 'border-[var(--color-gray-400)] bg-[var(--color-gray-100)]'}`}
                                        >
                                            <h3
                                                className={`text-[14px]  font-semibold
                            ${teams?.recruitStatus === 'RECRUITING' ? 'text-[var(--color-purple-500)]' : 'text-[var(--color-gray-400)]'}
                            `}
                                            >
                                                {engToKo(teams?.recruitStatus)}
                                            </h3>
                                        </div>
                                        {recuitRolesArray.fields.length > 1 && (
                                            <button
                                                type="button"
                                                className="absolute top-[0px] right-[0px]"
                                                onClick={() =>
                                                    recuitRolesArray.remove(
                                                        recuitRolesArray.fields.length - 1,
                                                    )
                                                }
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        )}
                                    </span>
                                ))}
                            </section>
                            {recuitRolesArray.fields.length < 5 && (
                                <button
                                    type="button"
                                    className="cursor-pointer bg-gray-100 w-[44px] rounded-[100%] h-[44px] flex justify-center items-center border-gray-200 border m-auto mt-[12px]"
                                    onClick={() =>
                                        recuitRolesArray.append({
                                            role: '',
                                            skills: [],
                                            count: '',
                                            people: '',
                                        })
                                    }
                                >
                                    +
                                </button>
                            )}
                        </div>
                    )}

                    {/* 모집 마감일, 연락 방법 section */}
                    <section className="flex flex-col w-full h-auto gap-[8px] justify-center items-start">
                        {contactArr.map((a, i) => (
                            <div
                                key={i}
                                className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                            >
                                <h3 className="font-semibold">{a.title}</h3>
                                <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                                <input
                                    type={i === 0 ? 'date' : 'text'}
                                    className="font-normal relative w-[150px]"
                                    {...method.register(
                                        i === 0 ? 'recruitDeadline' : 'contactMethod',
                                    )}
                                />
                            </div>
                        ))}
                    </section>

                    {/* 밑줄 */}
                    <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />
                </main>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex justify-center max-w-[248px] min-h-[48px] items-center px-[96px] bg-purple-500 text-white text-[14px] font-semibold rounded-[8px] cursor-pointer"
                        disabled={isLoading}
                    >
                        수정하기
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default EditTeams;
