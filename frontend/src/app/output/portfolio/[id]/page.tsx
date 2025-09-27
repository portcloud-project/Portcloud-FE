'use client';
import { useParams } from 'next/navigation';
import { usePortfolioDetail } from '@/app/hooks/usePortfolioDetail';
import { userStore } from '@/app/stores/userStore';
import dayjs from 'dayjs';
import { useDeletePortfolio } from '@/app/hooks/useDeleteAllPortfolio';

const PortfolioOutput = () => {
    const params = useParams();
    const user = userStore((state) => state.user);
    const id = params.id;
    const { data: portfolio, isLoading, isError, error } = usePortfolioDetail(id);
    const deleteMutation = useDeletePortfolio();
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!portfolio?.id) return <p>포트폴리오가 삭제되었거나 찾을 수 없습니다.</p>;

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        if (user.sub !== portfolio.email) {
            return alert('사용자 정보가 일치하지 않습니다');
        }
        try {
            await deleteMutation.mutateAsync(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="w-[768px]  flex  justify-start items-center ">
            <div className="flex gap-[48px] flex-col w-full">
                <section className="flex gap-[24px] flex-col w-full">
                    <h1 className="text-[40px] font-bold">{portfolio.title}</h1>
                    <div className="flex w-full justify-between text-[16px] text-gray-500 ">
                        <div className="flex w-fit items-center gap-[12px]">
                            <p className="flex">{portfolio.writeName}</p>
                            <p className="font-semibold"></p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p className="">{dayjs(portfolio.createAt).format('YYYY-MM-DD')}</p>
                            <p className="font-semibold"></p>
                        </div>
                        {user?.sub === portfolio.email && (
                            <div className="flex w-fit items-center gap-[12px]">
                                <button>수정</button>
                                <div className="border-r h-[14px] border-gray-300" />
                                <button onClick={handleDelete}>삭제</button>
                            </div>
                        )}
                    </div>
                    <hr />
                </section>
                <section className="flex w-full items-center gap-[12px]">
                    <p className="text-[24px] font-bold">{portfolio.writeName}</p>
                    <div className="border-r h-[14px] border-gray-300" />
                    <p className="text-[20px] font-medium">{portfolio.email}</p>
                </section>
                <section className="flex w-full gap-[24px] items-center">
                    <p className="text-[24px] font-bold">{portfolio.industry}</p>
                    <p>
                        {/* {portfolio.skill.map((s, idx) => (
                            <p key={`${idx}_${s.id}`}>{s.name}</p>
                        ))} */}
                    </p>
                </section>
                <section className="flex w-full  gap-[12px] flex-col">
                    <h2 className="text-[24px] font-bold">본인소개</h2>
                    <div className="border p-[24px] rounded-[8px]">{portfolio.introductions}</div>
                </section>
                <section className="w-full flex items-start gap-[12px] ">
                    <div className="flex items-center gap-[12px]">
                        <h2 className="text-[24px] font-bold ">학력</h2>
                        <div className="border-r h-[14px] border-gray-300" />
                    </div>
                    <p className="text-[20px] flex-col gap-[12px]">
                        {portfolio.educations.map((item, idx) => (
                            <div
                                key={`${idx}_${item.school}`}
                                className="flex gap-[12px] items-center"
                            >
                                <p>{item.school}</p>
                                <div className="border-r h-[14px] border-gray-300" />
                                <p className="text-[20px]">{item.schoolStatus}</p>
                            </div>
                        ))}
                    </p>
                </section>
                {portfolio.careers.some(
                    (c) => c.companyName || c.companyPosition || c.duty || c.startDate || c.endDate,
                ) && (
                    <section className="w-full flex flex-col gap-[12px]">
                        <h2 className="text-[24px] font-bold">경력</h2>
                        <div className="flex flex-col gap-[12px]">
                            {portfolio.careers.map((item, idx) => (
                                <div
                                    key={`${idx}_${item.companyName}`}
                                    className="border p-[24px] flex flex-col gap-[12px] rounded-[8px]"
                                >
                                    <div className="flex gap-[12px] items-center text-[16px] font-semibold">
                                        <p>{item.companyName}</p>
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <p>{item.duty}</p>
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <p>{item.companyPosition}</p>
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <p>{dayjs(item.startDate).format('YYYY-MM-DD')}</p>
                                        <div className="border-r h-[14px] border-gray-300" />
                                        <p>{dayjs(item.endDate).format('YYYY-MM-DD')}</p>
                                    </div>

                                    {/* 상세 설명 */}
                                    {item.dutyDescription && (
                                        <div className="w-full border p-[24px] rounded-[8px]">
                                            {item.dutyDescription}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {portfolio.projectDescriptions.some((c) => c.description) && (
                    <section className="w-full flex flex-col gap-[12px]">
                        <h2 className="text-[24px] font-bold ">프로젝트</h2>
                        {portfolio.projectDescriptions.map((item, idx) => (
                            <div
                                className="border p-[24px] rounded-[8px]"
                                key={`${idx}_${item.description}`}
                            >
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </section>
                )}
                {portfolio.awards.some((c) => c.awardDescription) && (
                    <section className="w-full flex  flex-col gap-[12px]">
                        <h2 className="text-[24px] font-bold">수상</h2>
                        {portfolio.awards.map((item, idx) => (
                            <div
                                className="border p-[24px] rounded-[8px]"
                                key={`${idx}_${item.awardDescription}`}
                            >
                                {item.awardDescription}
                            </div>
                        ))}
                    </section>
                )}
                {portfolio.certificates.some(
                    (c) => c.certificateName || c.certificateDate || c.number,
                ) && (
                    <section className="w-full flex flex-col gap-[12px]">
                        <h2 className="text-[24px] font-bold">자격/어학</h2>
                        <div className="flex items-start gap-[12px] flex-col">
                            {portfolio.certificates.map((item, idx) => (
                                <div
                                    key={`${idx}_${item.certificateName}`}
                                    className="flex items-center gap-[12px]"
                                >
                                    <p>{item.certificateName}</p>
                                    <div className="border-r h-[14px] border-gray-300 " />
                                    <p>{item.number}</p>
                                    <div className="border-r h-[14px] border-gray-300" />
                                    <p>{dayjs(item.certificateDate).format('YYYY-MM-DD')}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                <section className="w-full flex ">댓글</section>
                <section className="w-full flex ">댓글출력</section>
            </div>
        </main>
    );
};
export default PortfolioOutput;
