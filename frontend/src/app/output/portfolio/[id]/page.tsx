'use client';
import { useParams } from 'next/navigation';
import { usePortfolioDetail } from '@/app/hooks/usePortfolioDetail';
import { userStore } from '@/app/stores/userStore';
import dayjs from 'dayjs';

const PortfolioOutput = () => {
    const params = useParams();
    const user = userStore((state) => state.user);
    console.log(user);
    const id = params.id;
    console.log(id);
    const { data: portfolio, isLoading, isError, error } = usePortfolioDetail(id);
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!portfolio) return <p>포트폴리오를 찾을 수 없습니다.</p>;

    console.log(portfolio);

    return (
        <main className="w-[768px]  flex  justify-start items-center ">
            <div className="flex gap-[48px] flex-col w-full">
                <section className="flex gap-[24px] flex-col w-full">
                    <h1 className="text-[40px] font-bold">{portfolio.title}</h1>
                    <div className="flex w-full justify-between text-[16px] text-gray-500 ">
                        <div className="flex w-fit items-center gap-[12px]">
                            <p className="flex">{user.name}</p>
                            <p className="font-semibold"></p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p className="">작성시간</p>
                            <p className="font-semibold"></p>
                        </div>
                        <div className="flex w-fit items-center gap-[12px]">
                            <button>수정</button>
                            <div className="border-r h-[14px] border-gray-300" />
                            <button>삭제</button>
                        </div>
                    </div>
                    <hr />
                </section>
                <section className="flex w-full items-center gap-[12px]">
                    <p className="text-[24px] font-bold">{user.name}</p>
                    <div className="border-r h-[14px] border-gray-300" />
                    <p className="text-[20px] font-medium">{user.sub}</p>
                </section>
                <section className="flex w-full gap-[24px] items-center">
                    <p className="text-[24px] font-bold">{portfolio.industry}</p>
                    <p>스킬</p>
                </section>
                <section className="flex w-full  gap-[12px] flex-col">
                    <h2 className="text-[24px] font-bold">본인소개</h2>
                    <div className="border p-[24px] rounded-[8px]">{portfolio.introductions}</div>
                </section>
                <section className="w-full flex items-center gap-[12px]">
                    <h2 className="text-[24px] font-bold ">학력</h2>
                    <div className="border-r h-[14px] border-gray-300" />
                    <p className="text-[20px]">{portfolio.educations.map((item) => item.school)}</p>
                    <div className="border-r h-[14px] border-gray-300" />
                    <p className="text-[20px]">
                        {portfolio.educations.map((item) => item.schoolStatus)}
                    </p>
                </section>
                <section className="w-full flex flex-col gap-[12px]">
                    <h2 className="text-[24px] font-bold">경력</h2>
                    <div className="border p-[24px] flex-col gap-[12px] flex rounded-[8px]">
                        <div className="flex gap-[12px] items-center text-[16px] font-semibold ">
                            <p>{portfolio.careers.map((item) => item.companyName)}</p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p>{portfolio.careers.map((item) => item.duty)}</p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p>{portfolio.careers.map((item) => item.companyPosition)}</p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p>
                                {portfolio.careers.map((item) =>
                                    dayjs(item.startDate).format('YYYY-MM-DD'),
                                )}
                            </p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p>
                                {portfolio.careers.map((item) =>
                                    dayjs(item.endDate).format('YYYY-MM-DD'),
                                )}
                            </p>
                        </div>
                        <div className="w-full border p-[24px] flex rounded-[8px]">
                            {portfolio.careers.map((item) => item.dutyDescription)}
                        </div>
                    </div>
                </section>
                <section className="w-full flex flex-col gap-[12px]">
                    <h2 className="text-[24px] font-bold ">프로젝트</h2>
                    <div className="border p-[24px] rounded-[8px]">
                        {portfolio.projectDescriptions.map((item) => item.description)}
                    </div>
                </section>
                <section className="w-full flex  flex-col gap-[12px]">
                    <h2 className="text-[24px] font-bold">수상</h2>
                    <div className="border p-[24px] rounded-[8px]">
                        {portfolio.awards.map((item) => item.awardDescription)}
                    </div>
                </section>
                <section className="w-full flex flex-col gap-[12px]">
                    <h2 className="text-[24px] font-bold">자격/어학</h2>
                    <div className="flex items-center gap-[12px]">
                        {portfolio.certificates.map((item) => item.certificateName)}
                        <div className="border-r h-[14px] border-gray-300" />
                        {portfolio.certificates.map((item) => item.certificateDate)}
                        <div className="border-r h-[14px] border-gray-300" />
                        {portfolio.certificates.map((item) => item.number)}
                    </div>
                </section>
                <section className="w-full flex ">댓글</section>
                <section className="w-full flex ">댓글출력</section>
            </div>
        </main>
    );
};
export default PortfolioOutput;
