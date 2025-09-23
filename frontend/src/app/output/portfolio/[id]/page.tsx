'use client';
import { useParams } from 'next/navigation';
import { usePortfolioDetail } from '@/app/hooks/usePortfolioDetail';
import { userStore } from '@/app/stores/userStore';

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
        <main className="w-[768px]  flex  justify-start items-center">
            <div className="flex gap-[48px] flex-col w-full">
                <section className="flex gap-[24px] flex-col w-full">
                    <h1 className="text-[40px] font-bold">{portfolio.title}</h1>
                    <div className="flex w-full justify-between text-[16px] text-gray-500">
                        <div className="flex  w-fit  ">
                            <p className="">{user.name}</p>
                            <p className="font-semibold"></p>
                            <p className="">작성시간</p>
                            <p className="font-semibold"></p>
                        </div>
                        <div className="flex  w-fit">
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    </div>
                    <hr />
                </section>
                <section className="flex w-full">
                    <p className="text-[24px] font-bold">{user.name}</p>
                    <p className="text-[20px] font-medium">{user.sub}</p>
                </section>
                <section className="flex w-full">
                    <p className="text-[24px] font-bold">{portfolio.industry}</p>
                    <p>스킬</p>
                </section>
                <section className="flex w-full  gap-[12px] flex-col">
                    <h2>본인소개</h2>
                    <div className="border p-[24px]">{portfolio.introductions}</div>
                </section>
                <section className="w-full flex ">
                    <h2 className="text-[24px] font-bold">학력</h2>
                    <p>{portfolio.educations.map((item) => item.school)}</p>
                    <p>{portfolio.educations.map((item) => item.schoolStatus)}</p>
                </section>
                <section className="w-full flex flex-col">
                    <h2>경력</h2>
                    <div className="border p-[24px]">
                        {portfolio.careers.map((item) => item.dutyDescription)}
                    </div>
                </section>
                <section className="w-full flex flex-col">
                    <h2>프로젝트</h2>
                    <div className="border p-[24px]">
                        {portfolio.projectDescriptions.map((item) => item.description)}
                    </div>
                </section>
                <section className="w-full flex  flex-col">
                    <h2>수상</h2>
                    <div className="border p-[24px]">
                        {portfolio.awards.map((item) => item.awardDescription)}
                    </div>
                </section>
                <section className="w-full flex flex-col">
                    <h2>자격/어학</h2>
                    <div className="border p-[24px]">
                        {portfolio.certificates.map((item) => item.certificateName)}
                    </div>
                </section>
                <section className="w-full flex ">댓글</section>
                <section className="w-full flex ">댓글출력</section>
            </div>
        </main>
    );
};
export default PortfolioOutput;
