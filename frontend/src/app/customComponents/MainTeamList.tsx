'use client';

import { TeamGetValueType, useMainTeam } from '../hooks/useMainTeam';
import { useRouter } from 'next/navigation';
import { AiOutlineEye } from 'react-icons/ai';

interface MainTeamListProps {
    title: string;
}

const MainTeamList = ({ title }: MainTeamListProps) => {
    const { isLoading, isError, error, data } = useMainTeam();
    // const [deadline, setDeadline] = useState<string>('');
    const teamList = data as TeamGetValueType[];
    const router = useRouter();

    // 날짜 계산 함수
    // const getDeadlineText = (endDate: string) => {
    //     const diff = Math.ceil(
    //         (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    //     );
    //     return `마감 ${diff}일 전`;
    // };

    // // 예: data 마감일이 들어왔을 때
    // useEffect(() => {
    //     if (data?.recruitDeadline) {
    //         setDeadline(getDeadlineText(data?.recruitDeadline));
    //     }
    // }, [data]);

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
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-start overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {teamList && teamList.length > 0 ? (
                    teamList?.map((item) => {
                        return (
                            <li
                                key={item?.id}
                                className="w-[330px] h-[224px] border-[2px] border-[var(--color-gray-300)] bg-white rounded-[20px] p-[24px] gap-[18px] flex flex-col justify-start items-start relative cursor-pointer transition duration-300 ease-in-out hover:bg-black/10"
                                onClick={() => {
                                    router.push(`/output/teams/${item?.id}`);
                                }}
                            >
                                <div className="w-[102px] h-[34px] rounded-[20px] border border-[var(--color-red-500)] flex items-center justify-center text-[var(--color-red-500)] text-[14px] font-semibold">
                                    마감 12일 전
                                </div>
                                <div className="w-fit h-auto flex flex-row justify-center items-center gap-[4px]">
                                    <h3 className="font-semibold text-[14px] text-[var(--color-gray-500)]">
                                        마감일
                                    </h3>
                                    <span className="text-[14px] text-[var(--color-gray-300)]">
                                        |
                                    </span>
                                    <p className="text-[14px] text-[var(--color-gray-500)] font-normal">
                                        {item?.recruitDeadline}
                                    </p>
                                </div>
                                <h3 className="font-bold text-[18px] text-black">{item?.title}</h3>
                                <div className="absolute bottom-[24px] right-[24px] flex flex-row w-fit h-auto justify-center items-center gap-[12px]">
                                    <AiOutlineEye className="w-[20px] h-[20px]" />
                                    <p className="font-semibold text-[14px] text-[var(--color-gray-500)]">
                                        {item?.viewCount}
                                    </p>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="w-[1392px] h-[248px] bg-gray-300 rounded-[20px] items-center flex justify-center text-white text-[20px] font-bold px-[24px]">
                        목록이 없습니다
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MainTeamList;
