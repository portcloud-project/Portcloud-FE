'use client';

import { useRouter } from 'next/navigation';
// import { useRecentTeam } from '../hooks/useRecentTeam';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Item = {
    id: number;
    title: string | null;
    writerName: string;
    projectType: string | null;
    createdAt: string;
    recruitStatus?: string;
    viewCount?: number;
    likeCount?: number;
    requiredRoles?: string[]; // 실제 스키마에 맞게 조정
    recruitDeadline?: string | null;
};

const RecentTeam = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/recentteam');
            const data = res.data?.data?.content;
            // 안전 가드
            const list: Item[] = Array.isArray(data) ? data : [];
            setItems(list);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? 'fetch error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postionArr = ['ALL', 'Front-end', 'Back-end', 'Full-stack', 'PM', 'Design'];

    //   if (isLoading) {
    //     return (
    //       <div>
    //         <p className="w-full h-[248px] rounded-[20px] items-center flex justify-center text-black text-[20px] font-bold">
    //           데이터 로딩중...
    //         </p>
    //       </div>
    //     );
    //   }

    //   if (isError) {
    //     return (
    //       <div className="flex justify-center items-center">
    //         <p className="text-red-500">오류: {error?.message || '알 수 없는 오류'}</p>
    //       </div>
    //     );
    //   }

    if (error) return <div className="text-red-500">에러: {error}</div>;

    return (
        <div className="w-full flex flex-col gap-[48px]">
            <div className="w-full grid grid-cols-3 grid-rows-2 border border-[var(--color-purple-500)] rounded-[20px] overflow-hidden">
                {postionArr.map((a, i) => (
                    <span
                        key={i}
                        className="w-[464px] h-[80px] flex font-bold text-[20px] text-black bg-white border border-[var(--color-purple-500)] hover:bg-[var(--color-purple-500)] hover:text-white transition duration-300 ease-in-out cursor-pointer place-items-center justify-items-center justify-center"
                    >
                        {a}
                    </span>
                ))}
            </div>

            <ul className="w-full grid grid-cols-4 gap-[24px]">
                {items.map((a) => {
                    return (
                        <li
                            key={a?.id}
                            className="w-[330px] h-[284px] flex flex-col justify-start items-start gap-[12px] border-[2px] border-[var(--color-gray-300)] bg-white rounded-[20px] p-[24px] relative cursor-pointer transition duration-300 ease-in-out hover:bg-black/10"
                            onClick={() => {
                                router.push(`/output/teams/${a?.id}`);
                            }}
                        >
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
                            <hr className='w-full h-[1px] text-[var(--color-gray-500)]'/>
                            <div className=''>
                                {a?.writerName}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RecentTeam;
