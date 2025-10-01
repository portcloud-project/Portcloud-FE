'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MypageAdd from '../customComponents/MypageAdd';
import { userStore } from '../stores/userStore';
import MyPagePortfolio from '../customComponents/MypagePortfolio';
import MypageLogs from '../customComponents/MypageLogs';
import MypageUserProfile from '../customComponents/MypageUserProfile';

const Mypage = () => {
    const tabsArr = [
        { value: 'bookMarks', title: '북마크 관리' },
        {
            value: 'portfolios',
            title: '포트폴리오 관리',
        },
        { value: 'projects', title: '프로젝트 관리' },
        { value: 'teams', title: '팀 관리' },
        { value: 'myActivity', title: '내 활동' },
        { value: 'settings', title: '설정' },
        // {
        //     value: 'addComp',
        //     title: '추가',
        //     content: (
        //         <div>
        //             <MypageAdd />
        //         </div>
        //     ),
        // },
    ];
    const user = userStore((state) => state.user);
    if (!user.name && !user.nickname && !user.sub) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                로그인 후에 이용가능한 기능입니다.
            </div>
        );
    }

    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <h3 className="font-bold text-[28px] text-black">마이 페이지</h3>
            <Tabs
                defaultValue="profile"
                className="w-[1392px] h-[764px] border border-[var(--color-gray-300)]"
            >
                <TabsList>
                    <div className="flex flex-col justify-center items-center gap-[24px] w-full h-[344px] py-[48px] border-b-[1px] border-[var(--color-gray-300)]">
                        {/* 프로필 사진 */}
                        <div className="w-[92px] h-[92px] rounded-full border border-black"></div>
                        {/* 닉네임, 이메일 */}
                        <div className="flex flex-col justify-center items-center gap-[4px]">
                            <h3 className="text-balck text-[28px] font-bold">
                                {user.nickname ? user.nickname : 'PortCloud'}
                            </h3>
                            <h3 className="text-[var(--color-gray-500)] font-semibold text-[16px]">
                                {user.sub ? user.sub : '로그인이 필요합니다'}
                            </h3>
                        </div>
                        <TabsTrigger
                            value="profile"
                            className="w-[121px] h-[40px] flex justify-center items-center text-[16px] font-semibold text-white bg-[var(--color-purple-500)] rounded-[20px]"
                        >
                            프로필 수정
                        </TabsTrigger>
                    </div>
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

                <TabsContent value="profile" className="p-[20px]">
                    <MypageUserProfile />
                </TabsContent>
                <TabsContent value="bookMarks" className="overflow-y-auto p-[20px]">
                    <MypageLogs />
                </TabsContent>
                <TabsContent value="portfolios" className="overflow-y-auto p-[20px]">
                    <MyPagePortfolio />
                </TabsContent>
                <TabsContent value="projects">
                    여긴 프로젝트 <MypageAdd title="프로젝트 업로드" route="/upload/projects" />
                </TabsContent>
                <TabsContent value="teams">
                    여긴 팀관리 <MypageAdd title="팀 구하기 업로드" route="/upload/teams" />
                </TabsContent>
                <TabsContent value="myActivity">여긴 내 활동</TabsContent>
                <TabsContent value="settings">여긴 설정</TabsContent>
            </Tabs>
        </main>
    );
};

export default Mypage;
