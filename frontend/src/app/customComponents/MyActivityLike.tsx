'use client';

import dayjs from 'dayjs';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';

import { useActivityLike } from '../hooks/useActivityLike';
import { FaHeartCircleMinus } from 'react-icons/fa6';
import CustomConfirm from './CustomConfirm';
import { useState } from 'react';
import { useLikeProjectDelete } from '../hooks/useLikeProjectDelete';
import { useLikeTeamDelete } from '../hooks/useLikeTeamDelete';
import { usePortfolioDelete } from '../hooks/useLikePortfolioDelete';
import { useLikeLogsDelete } from '../hooks/useLikeLogsDelete';
import { useQueryClient } from '@tanstack/react-query';

const MyActivityLike = () => {
    const queryclient = useQueryClient();
    const { data, isLoading, isError, error } = useActivityLike();
    const router = useRouter();
    const [isOpenConfirm, setIsConfirm] = useState(false);
    const { mutate: unlikePortfolio } = usePortfolioDelete(() =>
        queryclient.invalidateQueries({
            queryKey: ['activity-like'],
        }),
    ); // DELETE 좋아요
    const { mutate: unlikeProject } = useLikeProjectDelete(() =>
        queryclient.invalidateQueries({
            queryKey: ['activity-like'],
        }),
    ); // DELETE 좋아요
    const { mutate: unlikeTeam } = useLikeTeamDelete(() =>
        queryclient.invalidateQueries({
            queryKey: ['activity-like'],
        }),
    ); // DELETE 좋아요
    const { mutate: unlikeLogs } = useLikeLogsDelete(() =>
        queryclient.invalidateQueries({
            queryKey: ['activity-like'],
        }),
    ); // DELETE 좋아요
    const [deleteId, setDeleteId] = useState('');
    const [deleteType, setDeleteType] = useState('');

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
    if (!data || data?.length === 0) {
        return (
            <div className="absolute top-1/2 left-1/2 translate-x-1/2">
                좋아요한 게시글이 없습니다.
            </div>
        );
    }
    const handleDeleteByType = (id: string, type: string) => {
        switch (type) {
            case 'project':
                unlikeProject(id);
                break;
            case 'portfolio':
                unlikePortfolio(id);
                break;
            case 'teampost':
                unlikeTeam(id);
                break;
            case 'blog':
                unlikeLogs(id);
                break;
        }
    };

    const onClickByType = (type: string, id: string) => {
        if (type === 'teampost') {
            const path = (type = 'teams');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'blog') {
            const path = (type = 'logs');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'project') {
            const path = (type = 'projects');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'portfolio') {
            const path = (type = 'portfolio');
            router.push(`/output/${path}/${id}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-[12px] mobile:justify-center laptop:justify-start w-full">
            {(!data || data.length === 0) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    좋아요한 게시글이 없습니다.
                </div>
            )}

            {data &&
                data.length > 0 &&
                data?.map((active) => (
                    <div
                        key={`${active.id}`}
                        className="group relative w-full laptop:w-[calc(33.3%-8px)] tablet:w-[calc(50%-6px)] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer "
                        // className="group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 aspect-[4/3] cursor-pointer perspective-[1000px]"
                        onClick={() => onClickByType(active.type, active.id)}
                    >
                        {/* 앞면 */}
                        <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                // style={{
                                //     backgroundImage: `url(https://port-cloud.com/img/${active.file})`,
                                // }}
                            ></div>

                            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/60 to-transparent rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                                <div className="font-bold text-white text-[18px]">
                                    {active.title}
                                    <p>{dayjs(active.createTime).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>

                        {/* 뒷면 */}
                        <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                            {/* 뒷면 배경 */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                // style={{
                                //     backgroundImage: `url(https://port-cloud.com/img/${active.file})`,
                                // }}
                            ></div>
                            {/* 오버레이 */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <div className="absolute bottom-0 left-0 right-0 h-[100px] rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                                <div className="font-bold text-white text-[18px]">
                                    {active.title}

                                    <p>{dayjs(active.createTime).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col  ">
                                <p
                                    className="bg-purple-500  rounded-[100px] min-w-[72px] min-h-[72px] flex justify-center items-center"
                                    onClick={(e) => {
                                        setIsConfirm(true);
                                        setDeleteId(active.id);
                                        setDeleteType(active.type);
                                        e.stopPropagation();
                                    }}
                                >
                                    <FaHeartCircleMinus />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            {isOpenConfirm && deleteId && (
                <CustomConfirm
                    onAccept={() => {
                        handleDeleteByType(deleteId, deleteType);
                        setIsConfirm(false);
                        setDeleteId('');
                        setDeleteType('');
                    }}
                    onCancel={() => {
                        setIsConfirm(false);
                        setDeleteId('');
                        setDeleteType('');
                    }}
                    title="좋아요 삭제"
                    message="해당 게시글의 좋아요를 삭제하시겠습니까 ?"
                />
            )}
        </div>
    );
};

export default MyActivityLike;
