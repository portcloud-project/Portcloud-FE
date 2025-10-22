'use client';
import BookMarkLogs from '@/app/customComponents/BookMarkLogs';
import CommentLogs from '@/app/customComponents/CommentLogs';
import CommentViewLogs from '@/app/customComponents/CommentViewLogs';
import CustomConfirm from '@/app/customComponents/CustomConfirm';
import Like from '@/app/customComponents/Like';
import LikePostLogs from '@/app/customComponents/LikePostLogs';
import TopBtn from '@/app/customComponents/TopBtn';
import { useDeleteLogs } from '@/app/hooks/useDeleteAllLogs';
import { useLikeLogs } from '@/app/hooks/useLikeLogs';
import { useLogsDetail } from '@/app/hooks/useLogsDetail';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Cookies from 'js-cookie';
const LogsOutput = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const { data: logs, isLoading, isError, error } = useLogsDetail(id);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const { data: like } = useLikeLogs(id);
    const deleteMutation = useDeleteLogs();
    const token = Cookies.get('accessToken');
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!logs?.id) return <p>기록이 삭제되었거나 찾을 수 없습니다.</p>;

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(id);
            router.push('/works/logs');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="w-[768px]  flex  justify-start items-center ">
            <div className="flex gap-[48px] flex-col w-full">
                <section className="flex gap-[24px] flex-col w-full">
                    <h1 className="text-[40px] font-bold">{logs?.title}</h1>
                    <div className="flex w-full justify-between text-[16px] text-gray-500 ">
                        <div className="flex w-fit items-center gap-[12px]">
                            <p className="">작성자</p>
                            <p className="flex font-semibold">{logs?.writeName}</p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p className="">작성시간</p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p className="font-semibold">
                                {dayjs(logs?.createdAt).format('YYYY-MM-DD')}
                            </p>
                            <div className="border-r h-[14px] border-gray-300" />
                            <p className=" text-purple-500">카테고리</p>
                            <p className="text-purple-500 font-semibold">{logs?.category}</p>
                        </div>
                        {logs?.owner && (
                            <div className="flex w-fit items-center gap-[12px]">
                                <button
                                    onClick={() => router.push(`/output/logs/${id}/edit`)}
                                    className="cursor-pointer"
                                >
                                    수정
                                </button>
                                <div className="border-r h-[14px] border-gray-300" />
                                <button
                                    onClick={() => setIsOpenConfirm(true)}
                                    className="cursor-pointer"
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                    <hr />
                </section>
                <section className="markdown-output">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{logs.content}</ReactMarkdown>
                </section>
                <hr />
                <Like likeData={like} />
                {token && <CommentLogs id={id} />}
                <CommentViewLogs id={id} />
            </div>
            {token && (
                <div>
                    <LikePostLogs id={id} />
                    <BookMarkLogs id={id} />
                </div>
            )}
            <TopBtn />
            {isOpenConfirm && (
                <CustomConfirm
                    onAccept={handleDelete}
                    onCancel={() => setIsOpenConfirm(false)}
                    title="기록 삭제"
                    message="정말로 기록을 삭제하시겠습니까 ?"
                />
            )}
        </main>
    );
};
export default LogsOutput;
