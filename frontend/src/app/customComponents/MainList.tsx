import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface MainListProps {
    title: string;
}

interface Item {
    id: number;
    title: string;
    description: string;
    writeName: string;
    thumbnailURL: string | null;
}

interface ApiResponse {
    status: number;
    message: string | null;
    data: Item[];
}

const fetchMainItems = async (): Promise<Item[]> => {
    const response = await axios.get<ApiResponse>('/api/mainlist?type=mainlist');

    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    } else {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
    }
};

const MainList = ({ title }: MainListProps) => {
    const {
        data: items,
        isLoading,
        isError,
        error,
    } = useQuery<Item[], Error>({
        queryKey: ['mainlist'],
        queryFn: fetchMainItems,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return (
            <div>
                <p className="font-bold text-[20px]">{title}</p>
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
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-center overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {items && items.length > 0 ? (
                    items?.map((item) => {
                        return (
                            <li
                                key={`${item.id}`}
                                className="group min-w-[220px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer flex-1 tablet:shrink-0 tablet:w-full"
                            >
                                {/* 앞면 */}
                                <div className="absolute inset-0 rounded-[20px] overflow-hidden duration-700 ease-in-out group-hover:opacity-0">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `var(--background-list-default)`,
                                        }}
                                    ></div>
                                </div>

                                {/* 뒷면 */}
                                <div className="absolute inset-0 rounded-[20px] opacity-0 overflow-hidden duration-700 ease-in-out group-hover:opacity-100">
                                    {/* 뒷면 배경 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `/opt/portcloud/images/${item.thumbnailURL}`,
                                        }}
                                    ></div>
                                    {/* 오버레이 */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    {/* 텍스트  */}
                                    <div className="absolute inset-0 flex items-start justify-end z-10 text-white font-bold text-[18px] p-[24px] flex-col gap-[4px]">
                                        <p>{item.title}</p>
                                        <p>{item.description}</p>
                                        <p className="text-[14px] text-gray-100">
                                            {item.writeName}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 flex items-end justify-start z-10 text-white font-bold text-[18px] p-[24px] flex-col ">
                                        <p className="bg-purple-500 px-[24px] py-[8px] rounded-[20px] w-fit">
                                            개발
                                        </p>
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

export default MainList;
