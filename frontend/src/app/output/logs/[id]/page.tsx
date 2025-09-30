'use client';
import { useDeleteLogs } from '@/app/hooks/useDeleteAllLogs';
import { useLogsDetail } from '@/app/hooks/useLogsDetail';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LogsOutput = () => {
    const params = useParams();
    const id = params.id;
    const { data: logs, isLoading, isError, error } = useLogsDetail(id);
    const deleteMutation = useDeleteLogs();
    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!logs?.id) return <p>기록이 삭제되었거나 찾을 수 없습니다.</p>;

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
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
                                <button>수정</button>
                                <div className="border-r h-[14px] border-gray-300" />
                                <button onClick={handleDelete}>삭제</button>
                            </div>
                        )}
                    </div>
                    <hr />
                </section>
                <section>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{logs.content}</ReactMarkdown>
                </section>
                <hr />
            </div>
        </main>
    );
};
export default LogsOutput;
