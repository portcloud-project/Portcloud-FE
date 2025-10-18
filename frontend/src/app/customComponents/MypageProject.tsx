'use client';

import { useAllProject } from '../hooks/useAllProject';
import { FaTrashCan } from 'react-icons/fa6';
// import { useDeleteProject } from '../hooks/useDeleteProject';
// import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';

const MypageProject= () => {
    const { isError, error, isLoading, data } = useAllProject();
    // const deleteMutation = useDeleteProject();
    // const queryClient = useQueryClient();
    const router = useRouter();

    if(data?.length === 0) {
        return <div>프로젝트가 존재하지 않습니다</div>;
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

    // const handleDelete = async (id:string) => {
    //     if(!confirm('정말 삭제하시겠습니까?')) return;
    //     try {
    //         await deleteMutation.mutateAsync(id);
    //         await queryClient.invalidateQueries();
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }

    return (
        <div className="w-full flex flex-col gap-[16px]">
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-center overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {data && data.length > 0 ? (
                    data?.map((item) => {
                        return (
                            <li
                                key={`${item.id}`}
                                className="group min-w-[220px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer flex-1 tablet:shrink-0 tablet:w-full"
                                onClick={() => router.push(`/output/projects/${item.id}`)}
                            >
                                {/* 앞면 */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(https://port-cloud.com/img/${item.thumbnailImg})`,
                                        }}
                                    ></div>
                                </div>

                                {/* 뒷면 */}
                                <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                                    {/* 뒷면 배경 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(https://port-cloud.com/img/${item.thumbnailImg})`,
                                        }}
                                    ></div>
                                    {/* 오버레이 */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    {/* 텍스트  */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-[18px] p-[24px] flex-col gap-[4px]">
                                        <div className="rounded-[100px] bg-purple-500  min-w-[72px] min-h-[72px] flex justify-center items-center">
                                            <FaTrashCan />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="w-[1392px] h-[248px] bg-gray-300 rounded-[20px] items-center flex justify-center text-white text-[20px] font-bold">
                        목록이 없습니다
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MypageProject;
