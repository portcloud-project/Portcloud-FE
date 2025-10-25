'use client';
import { useRouter } from 'next/navigation';
import { MainListProps } from './MainList';
import { useRecentProject } from '../hooks/useRecentProject';

const RecentProject = ({ title, projectItems }: MainListProps) => {
    const { isLoading, isError, error } = useRecentProject();
    const router = useRouter();

    if (isLoading) {
        return (
            <div>
                <p className="w-full h-[248px] rounded-[20px] items-center flex justify-center text-black text-[20px] font-bold">
                    데이터 로딩중...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">오류:{error?.message || '알수없는 오류'}</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-[16px]">
            <p className="font-bold text-[20px]">{title}</p>
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-start overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet: tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {projectItems && projectItems.length > 0 ? (
                    projectItems?.map((item) => {
                        return (
                            <li
                                onClick={() => router.push(`/output/projects/${item.id}`)}
                                key={`${item.id}`}
                                className="group min-w-[220px] max-w-[330px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer tablet:shrink-0 tablet:w-full"
                            >
                                {/* 앞면 */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(https://port-cloud.com/img/${item.thumbnailURL})`,
                                        }}
                                    >
                                        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/60 to-transparent rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                                            <p className="font-bold text-white text-[18px]">
                                                {item.title}
                                            </p>
                                            <p className="text-gray-100 text-[14px]">
                                                {item.writeName}
                                            </p>
                                        </div>
                                        <div className="absolute inset-0 flex items-end justify-start z-10 text-white font-bold text-[18px] p-[24px] flex-col ">
                                            <p className="bg-purple-500 px-[24px] py-[8px] rounded-[20px] w-fit">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 뒷면 */}
                                <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                                    {/* 뒷면 배경 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(https://port-cloud.com/img/${item.thumbnailURL})`,
                                        }}
                                    ></div>
                                    {/* 오버레이 */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    {/* 텍스트  */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[100px]  rounded-b-[20px] z-10 flex flex-col justify-end p-[24px] gap-[4px]">
                                        <p className="font-bold text-white text-[18px]">
                                            {item.title}
                                        </p>
                                        <p className="text-gray-100 text-[14px]">
                                            {item.writeName}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 flex items-end justify-start z-10 text-white font-bold text-[18px] p-[24px] flex-col ">
                                        <p className="bg-purple-500 px-[24px] py-[8px] rounded-[20px] w-fit">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    // <li className="w-[1392px] h-[248px] bg-gray-300 rounded-[20px] items-center flex justify-center text-white text-[20px] font-bold px-[24px]">
                    //     목록이 없습니다
                    // </li>
                    <li></li>
                )}
            </ul>
        </div>
    );
};

export default RecentProject;
