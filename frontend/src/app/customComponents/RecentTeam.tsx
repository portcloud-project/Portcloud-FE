'use client';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export interface TeamItem {
    id: number;
    title: string | null;
    writerName: string;
    projectType?: string | null;
    createdAt: string;
    recruitStatus?: string;
    viewCount?: number;
    likeCount?: number;
    requiredRoles?: string[];
    recruitDeadline?: string | null;
}

type RecentTeamProps = {
    teamItems: TeamItem[];
};

const RecentTeam = ({ teamItems }: RecentTeamProps) => {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col">
            <ul className="w-full grid grid-cols-4 gap-[24px]">
                {teamItems.map((item) => {
                    const dday = item.recruitDeadline
                        ? dayjs(item.recruitDeadline).diff(dayjs(), 'day')
                        : null;

                    return (
                        <li
                            key={item.id}
                            className="w-[330px] h-[284px] flex flex-col justify-start items-start gap-[12px] border-[2px] border-[var(--color-gray-300)] bg-white rounded-[20px] p-[24px] relative cursor-pointer transition duration-700 ease-in-out hover:bg-black/10"
                            onClick={() => router.push(`/output/teams/${item.id}`)}
                        >
                            <div className="w-[102px] h-[34px] rounded-[20px] border border-[var(--color-red-500)] flex items-center justify-center text-[var(--color-red-500)] text-[14px] font-semibold">
                                {dday === null ? '마감일 없음' : dday < 0 ? '마감' : `${dday}일`}
                            </div>

                            <div className="w-fit h-auto flex flex-row justify-center items-center gap-[4px]">
                                <h3 className="font-semibold text-[14px] text-[var(--color-gray-500)]">
                                    마감일
                                </h3>
                                <span className="text-[14px] text-[var(--color-gray-300)]">|</span>
                                <p className="text-[14px] text-[var(--color-gray-500)] font-normal">
                                    {item.recruitDeadline ?? '-'}
                                </p>
                            </div>

                            <h3 className="font-bold text-[18px] text-black">
                                {item.title ?? '(제목 없음)'}
                            </h3>
                            <hr className="w-full h-[1px] text-[var(--color-gray-500)]" />
                            <div className="">{item.writerName}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RecentTeam;
