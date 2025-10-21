'use client';

import dayjs from 'dayjs';
import LoadingSpinner from './LoadingSpinner';
import { FaTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAllLogs } from '../hooks/useAllLogs';
import { useDeleteLogs } from '../hooks/useDeleteAllLogs';
import CustomConfirm from './CustomConfirm';
import { useState } from 'react';

const MyPageLogs = () => {
    const { data, isLoading, isError, error } = useAllLogs();
    const deleteMutation = useDeleteLogs();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    if (data?.length === 0) {
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
        try {
            await deleteMutation.mutateAsync(id);
            await queryClient.invalidateQueries({ queryKey: ['alllogs'] });
            setIsOpenConfirm(false);
        } catch (err) {
            console.error(err);
            setIsOpenConfirm(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-[24px]">
            {data?.map((logs) => (
                <div
                    key={`${logs.id}`}
                    className="group min-w-[330px] max-w-[330px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer flex-1 tablet:shrink-0 tablet:w-full"
                    onClick={() => router.push(`/output/logs/${logs.id}`)}
                >
                    {/* 앞면 */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${logs.thumbnailUrl})`,
                            }}
                        >
                            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/60 to-transparent rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                                <div className="font-bold text-white text-[18px]">
                                    {logs.title}
                                    <p className="text-gray-100 text-[14px]">{logs.jopPosition}</p>
                                    <p>{dayjs(logs.createAt).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                        {/* 뒷면 배경 */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${logs.thumbnailUrl})`,
                            }}
                        ></div>
                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[100px] rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                            <div className="font-bold text-white text-[18px]">
                                {logs.title}
                                <p className="text-gray-100 text-[14px]">{logs.jopPosition}</p>
                                <p>{dayjs(logs.createAt).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col">
                            <p
                                className="bg-purple-500  rounded-[100px] min-w-[72px] min-h-[72px] flex justify-center items-center"
                                onClick={(e) => {
                                    setIsOpenConfirm(true);
                                    setDeleteId(logs.id);
                                    e.stopPropagation();
                                }}
                            >
                                <FaTrashCan />
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {isOpenConfirm && (
                <CustomConfirm
                    onAccept={() => handleDelete(deleteId)}
                    onCancel={() => setIsOpenConfirm(false)}
                    title="기록 삭제"
                    message="기록을 삭제하시겠습니까 ?"
                />
            )}
        </div>
    );
};

export default MyPageLogs;
