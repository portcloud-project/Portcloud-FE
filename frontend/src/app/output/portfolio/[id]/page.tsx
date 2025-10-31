'use client';
import { useParams, useRouter } from 'next/navigation';
import { usePortfolioDetail } from '@/app/hooks/usePortfolioDetail';
import { userStore } from '@/app/stores/userStore';
import dayjs from 'dayjs';
import { useDeletePortfolio } from '@/app/hooks/useDeleteAllPortfolio';
import Like from '@/app/customComponents/Like';
import { useLikePortfolio } from '@/app/hooks/useLikePortfolio';
import LikePost from '@/app/customComponents/LikePost';
import Comment from '@/app/customComponents/Comment';
import CommentView from '@/app/customComponents/CommentView';
import TopBtn from '@/app/customComponents/TopBtn';
import BookMarkPortfolio from '@/app/customComponents/BookMarkPortfolio';
import CustomConfirm from '@/app/customComponents/CustomConfirm';
import { useState } from 'react';
import Cookies from 'js-cookie';

const PortfolioOutput = () => {
    const params = useParams();
    const user = userStore((state) => state.user);
    const id = params.id;
    const { data: portfolio, isLoading, isError, error } = usePortfolioDetail(id);
    const { data: like } = useLikePortfolio(id);
    const deleteMutation = useDeletePortfolio();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const token = Cookies.get('accessToken');
    const router = useRouter();
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!portfolio?.id) return <p>포트폴리오가 삭제되었거나 찾을 수 없습니다.</p>;

    const handleDelete = async () => {
        if (user.sub !== portfolio.email) {
            return alert('사용자 정보가 일치하지 않습니다');
        }
        try {
            await deleteMutation.mutateAsync(id);
            router.push('/works/portfolios');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="max-w-[768px] w-full flex justify-start items-center px-[12px] tablet:px-0 ">
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
                                <button
                                    onClick={() => router.push(`/output/portfolio/${id}/edit`)}
                                    className="cursor-pointer"
                                >
                                    수정
                                </button>
                                <div className="border-r h-[14px] border-gray-300" />
                                <button
                                    onClick={() => setIsConfirmOpen(true)}
                                    className="cursor-pointer"
                                >
                                    삭제
                                </button>
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
                    <p className="text-[24px]  font-bold">{portfolio.industry}</p>
                    <div className="border-r h-[14px] border-gray-300" />
                    <p className="text-[24px]  font-bold">{portfolio.jobPosition}</p>
                </section>
                <section>
                    <div className="flex gap-[8px] flex-wrap">
                        {portfolio.skill.map((s, idx) => (
                            <div
                                className="flex text-purple-500 bg-purple-50 px-[16px] py-[6px] rounded-[20px] box-border text-[14px] font-semibold"
                                key={`${idx}_${s.id}`}
                            >
                                {s.name}
                            </div>
                        ))}
                    </div>
                </section>
                <section className="flex w-full  gap-[12px] flex-col">
                    <h2 className="text-[24px] font-bold">본인소개</h2>
                    <div className="border p-[24px] rounded-[8px]">{portfolio.introductions}</div>
                </section>
                {portfolio.educations.some((c) => c.school || c.schoolStatus) && (
                    <section className="w-full flex items-start gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                            <h2 className="text-[24px] font-bold ">학력</h2>
                            <div className="border-r h-[14px] border-gray-300" />
                        </div>
                        <div className="text-[20px] flex-col gap-[12px] flex">
                            {portfolio.educations.map((item, idx) => (
                                <div
                                    key={`${idx}_${item.school}`}
                                    className="flex gap-[12px] items-center"
                                >
                                    <div>{item.school}</div>
                                    <div className="border-r h-[14px] border-gray-300" />
                                    <div className="text-[20px] ">{item.schoolStatus}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
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
                <Like likeData={like} />
                {token && (
                    <section className="w-full flex ">
                        <Comment id={id} />
                    </section>
                )}
                <section className="w-full flex ">
                    <CommentView id={id} />
                </section>
            </div>

            {token && (
                <div>
                    <LikePost id={id} />
                    <BookMarkPortfolio id={id} />
                </div>
            )}
            <TopBtn />
            {isConfirmOpen && (
                <CustomConfirm
                    onAccept={handleDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                    message="정말로 포트폴리오를 삭제하시겠습니까 ?"
                    title="포트폴리오 삭제"
                />
            )}
        </main>
    );
};
export default PortfolioOutput;
