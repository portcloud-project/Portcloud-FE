'use client';

import { useAllTeam } from '../hooks/useAllTeam';
import dayjs from 'dayjs';
import LoadingSpinner from './LoadingSpinner';
import { FaTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTeam } from '../hooks/useDeleteTeam';
import { userStore } from '../stores/userStore';
import { useState } from 'react';
import CustomConfirm from './CustomConfirm';

const MypageTeam = () => {
    const { data: items, isLoading, isError, error } = useAllTeam();
    const deleteMutation = useDeleteTeam();
    const router = useRouter();
    const queryClient = useQueryClient();
    const user = userStore();
    const [isOpenConfirm, setIsConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const myTeams = items?.filter((a) => a.writerName === user.user.nickname);
    console.log(myTeams);
    if (items?.length === 0) {
        return <div>기록이 존재하지 않습니다</div>;
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[50vh]">
                <LoadingSpinner />
            </div>
        );
    }
    if (isError) {
        return (
            <p className="text-red-500 flex items-center justify-center w-full h-[50vh]">
                {error instanceof Error ? error.message : '데이터를 불러오지 못했습니다.'}
            </p>
        );
    }
    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteMutation.mutateAsync(id);
            await queryClient.invalidateQueries({ queryKey: ['alllogs'] });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-wrap gap-[12px]">
            {myTeams !== undefined && myTeams?.length > 0 ? (
                myTeams.map((a, idx) => {
                    return (
                        <li
                            key={`${a}_${idx}`}
                            className="w-[330px] h-[284px] flex flex-col justify-start items-start gap-[12px] border-[2px] border-[var(--color-gray-300)] bg-white rounded-[20px] p-[24px] relative cursor-pointer transition duration-700 ease-in-out hover:bg-black/10"
                            onClick={() => {
                                router.push(`/output/teams/${a?.id}`);
                            }}
                        >
                            <div className="w-[102px] h-[34px] rounded-[20px] border  border-[var(--color-red-500)] flex items-center justify-center text-[var(--color-red-500)] text-[14px] font-semibold">
                                {dayjs(a.recruitDeadline).diff(dayjs(), 'day') < 0
                                    ? '마감'
                                    : dayjs(a.recruitDeadline).diff(dayjs(), 'day') + '일'}
                            </div>
                            <div className="w-fit h-auto flex flex-row justify-center items-center gap-[4px]">
                                <h3 className="font-semibold text-[14px] text-[var(--color-gray-500)]">
                                    마감일
                                </h3>
                                <span className="text-[14px] text-[var(--color-gray-300)]">|</span>
                                <p className="text-[14px] text-[var(--color-gray-500)] font-normal">
                                    {a?.recruitDeadline}
                                </p>
                            </div>
                            <h3 className="font-bold text-[18px] text-black">{a?.title}</h3>
                            <hr className="w-full h-[1px] text-[var(--color-gray-500)]" />
                            <div className="">{a?.writerName}</div>
                            <div
                                className="w-full h-full inset-0 bg-black/10 flex justify-center items-center"
                                onClick={(e) => {
                                    setIsConfirm(true);
                                    setDeleteId(String(a?.id));
                                    e.stopPropagation();
                                }}
                            >
                                <FaTrashCan />
                            </div>
                            {isOpenConfirm && deleteId && (
                                <CustomConfirm
                                    onAccept={() => {
                                        handleDelete(deleteId);
                                        setIsConfirm(false);
                                        setDeleteId('');
                                    }}
                                    onCancel={() => {
                                        setIsConfirm(false);
                                        setDeleteId('');
                                    }}
                                    title="포트폴리오 삭제"
                                    message="포트폴리오를 삭제하시겠습니까 ?"
                                />
                            )}
                        </li>
                    );
                })
            ) : (
                <div>모집 중인 팀이 없습니다.</div>
            )}
        </div>
    );
};

export default MypageTeam;
