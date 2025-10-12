import { useRouter } from 'next/navigation';
import { useMainProject } from '../hooks/useMainProject';
import { UploadProjectsFormValuesType } from '../upload/projects/page';
import { AllLogs } from '../hooks/useRecentLogs';
import { FormData } from '../upload/portfolios/page';

export interface MainListProps {
    title?: string;
    items?: FormData[];
    projectItems?: UploadProjectsFormValuesType[];
    contentWithItem?: AllLogs[];
}

export interface Item {
    id: number;
    title: string;
    description: string;
    writeName: string;
    file: string | null;
    industry: string;
    thumbnailURL: string | null;
    projectPosition: string;
    role: string;
}

export interface ApiResponse<T> {
    status: number;
    message: string | null;
    data: T;
}

const MainList = ({ title }: MainListProps) => {
    const { isLoading, isError, error, data } = useMainProject();
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
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-start overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {data && data.length > 0 ? (
                    data?.map((a) => {
                        return (
                            <li
                                key={a?.id}
                                className={`w-[330px] h-[248px] flex flex-col bg-blend-multiply bg-cover bg-center rounded-[20px] p-[24px] justify-end cursor-pointer hover:bg-black/60 transition duration-300 ease-in-out inset-0 relative`}
                                style={{
                                    backgroundImage: `url(https://port-cloud.com/img/${a?.thumbnailURL})`,
                                }}
                                onClick={() => router.push(`/output/projects/${a.id}`)}
                            >
                                <div className="w-full h-auto flex flex-col justify-start items-start gap-[4px]">
                                    <h3 className="text-[18px] font-bold text-white">{a?.title}</h3>
                                    <p className="text-[14px] text-[var(--color-gray-100)] font-semibold">
                                        {a?.writeName}
                                    </p>
                                </div>
                                <div className="w-fit px-[24px] py-[8px] rounded-[20px] bg-[var(--color-purple-500)] text-white font-semibold text-[16px] absolute top-[24px] right-[20px] whitespace-nowrap">
                                    {a?.role}
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
