'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MypageCard from '../customComponents/MypageProjectCard';

const Mypage = () => {
    const tabsArr = [
        { value: 'bookMarks', title: '북마크 관리', content: '' },
        { value: 'projects', title: '프로젝트 관리', content: <MypageCard /> },
        { value: 'portfolios', title: '포트폴리오 관리' },
        { value: 'teams', title: '팀 관리' },
        { value: 'myActivity', title: '내 활동' },
        { value: 'settings', title: '설정' },
    ];
    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <h3 className="font-bold text-[28px] text-black">마이 페이지</h3>

            <Tabs
                defaultValue="profile"
                className="w-[1392px] h-[764px] border border-[var(--color-gray-300)]"
            >
                <TabsList className="">
                    <TabsTrigger value="profile" className="w-full h-[344px]">
                        프로필 수정
                    </TabsTrigger>
                    <div className="p-[12px]">
                        {tabsArr.map((a, i) => {
                            return (
                                <TabsTrigger key={i} value={a.value}>
                                    {a.title}
                                </TabsTrigger>
                            );
                        })}
                    </div>
                </TabsList>

                {tabsArr.map((a, i) => (
                    <TabsContent key={i} value={a.value} className="p-[32px]">
                        {a.content}
                    </TabsContent>
                ))}
            </Tabs>
        </main>
    );
};

export default Mypage;
