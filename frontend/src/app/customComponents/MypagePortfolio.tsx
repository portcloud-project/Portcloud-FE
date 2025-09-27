'use client';

import dayjs from 'dayjs';
import { useAllPortfolio } from '../hooks/useAllPortfolio';
import LoadingSpinner from './LoadingSpinner';
import MypageAdd from './MypageAdd';
import { FaTrashCan } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const MyPagePortfolio = () => {
    const { data, isLoading, isError, error } = useAllPortfolio();
    const router = useRouter();
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
    return (
        <div className="flex flex-wrap gap-[12px]">
            {data?.map((portfolio) => (
                <div
                    key={`${portfolio.id}`}
                    className="group min-w-[323px] max-w-[323px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer flex-1 tablet:shrink-0 tablet:w-full"
                    onClick={() => router.push(`/output/portfolio/${portfolio.id}`)}
                >
                    {/* 앞면 */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                        <div className="absolute inset-0 bg-cover bg-center"></div>
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                        {/* 뒷면 배경 */}
                        <div className="absolute inset-0 bg-cover bg-center"></div>
                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="absolute inset-0 flex items-start justify-end z-10 text-white font-bold text-[18px] p-[24px] flex-col gap-[4px]">
                            <p>{portfolio.title}</p>
                            <p>{dayjs(portfolio.createAt).format('YYYY-MM-DD')}</p>
                            <p className="text-[14px] text-gray-100">{portfolio.jopPosition}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col  ">
                            <p className="bg-purple-500  rounded-[100px] min-w-[72px] min-h-[72px] flex justify-center items-center">
                                <FaTrashCan />
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {data?.length && data?.length > 0 && !isLoading && !isError && (
                <MypageAdd title="포트폴리오 업로드" route="/upload/portfolios" />
            )}
        </div>
    );
};

export default MyPagePortfolio;
