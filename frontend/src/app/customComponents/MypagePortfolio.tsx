'use client';

import dayjs from 'dayjs';
import { useAllPortfolio } from '../hooks/useAllPortfolio';
import LoadingSpinner from './LoadingSpinner';
import MypageAdd from './MypageAdd';
import { FaTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useDeletePortfolio } from '../hooks/useDeleteAllPortfolio';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import CustomConfirm from './CustomConfirm';

const MyPagePortfolio = () => {
    const { data, isLoading, isError, error } = useAllPortfolio();
    const deleteMutation = useDeletePortfolio();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isOpenConfirm, setIsConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    if (data?.length === 0) {
        return <div>포트폴리오가 존재하지 않습니다</div>;
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
            await queryClient.invalidateQueries({ queryKey: ['allportfolio'] });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex flex-wrap gap-[12px]">
            {data?.map((portfolio) => (
                <div
                    key={`${portfolio.id}`}
                    className="group w-full laptop:w-[calc(33.3%-8px)] tablet:w-[calc(50%-6px)] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer "
                    onClick={() => router.push(`/output/portfolio/${portfolio.id}`)}
                >
                    {/* 앞면 */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${portfolio.file})`,
                            }}
                        ></div>

                        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/60 to-transparent rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                            <div className="font-bold text-white text-[18px]">
                                {portfolio.title}
                                <p className="text-gray-100 text-[14px]">{portfolio.jopPosition}</p>
                                <p>{dayjs(portfolio.createAt).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                        {/* 뒷면 배경 */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://port-cloud.com/img/${portfolio.file})`,
                            }}
                        ></div>
                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="absolute bottom-0 left-0 right-0 h-[100px] rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                            <div className="font-bold text-white text-[18px]">
                                {portfolio.title}
                                <p className="text-gray-100 text-[14px]">{portfolio.jopPosition}</p>
                                <p>{dayjs(portfolio.createAt).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col  ">
                            <p
                                className="bg-purple-500  rounded-[100px] min-w-[72px] min-h-[72px] flex justify-center items-center"
                                onClick={(e) => {
                                    setIsConfirm(true);
                                    setDeleteId(portfolio.id);
                                    e.stopPropagation();
                                }}
                            >
                                <FaTrashCan />
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {data?.length && data?.length > 0 && !isLoading && !isError && (
                <MypageAdd title="포트폴리오 업로드" route="/upload/portfolios" />
            )}
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
        </div>
    );
};

export default MyPagePortfolio;
