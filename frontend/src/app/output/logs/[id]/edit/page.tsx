'use client';
import Like from '@/app/customComponents/Like';
import LikePostLogs from '@/app/customComponents/LikePostLogs';
import MarkdownEditor from '@/app/customComponents/MarkdownEditor';
import TopBtn from '@/app/customComponents/TopBtn';
import UploadDropDown from '@/app/customComponents/UploadDropDown';
import { useLogsEdit } from '@/app/hooks/useEditLogs';
import { useLikeLogs } from '@/app/hooks/useLikeLogs';
import { useLogsDetail } from '@/app/hooks/useLogsDetail';
import { AllLogs } from '@/app/hooks/useRecentLogs';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

const LogsEdit = () => {
    const params = useParams();
    const router = useRouter();
    const queryclient = useQueryClient();
    const method = useForm<AllLogs>({
        defaultValues: {
            title: '',
            content: '',
            category: '',
            blogStatus: 1,
        },
    });

    const { handleSubmit, reset, control } = method;
    const categoryArr = ['정보공유', '자기개발'];
    const statusArr = ['공개', '비공개'];
    const id = params.id;
    const { data: logs, isLoading, isError, error } = useLogsDetail(id);
    const { data: like } = useLikeLogs(id);
    const mutate = useLogsEdit(id);
    useEffect(() => {
        if (logs) {
            reset({
                title: logs.title,
                content: logs.content,
                category: logs.category,
                blogStatus: logs.blogStatus,
            });
        }
    }, [logs, reset]);
    if (isLoading) return <p>불러오는 중...</p>;

    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!logs?.id) return <p>기록이 삭제되었거나 찾을 수 없습니다.</p>;
    if (!logs.owner) return router.push('/');

    const onSubmit = async (data: AllLogs) => {
        try {
            const formdata = new FormData();
            formdata.append('title', data.title);
            formdata.append('content', data.content);
            formdata.append('category', data.category);
            formdata.append('blogStatus', data.blogStatus === '공개' ? '1' : '2');
            console.log(Array.from(formdata.entries()));
            await mutate.mutateAsync(formdata);
            queryclient.invalidateQueries();
            router.push(`/output/logs/${id}`);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    return (
        <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <main className="w-[768px]  flex  justify-start items-center ">
                    <div className="flex gap-[48px] flex-col w-full">
                        <section className="flex gap-[24px] flex-col w-full">
                            <input
                                className="text-[40px] font-bold"
                                defaultValue={logs?.title}
                                {...method.register('title', {
                                    required: '필수 값 입니다.',
                                })}
                            />
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
                                    <UploadDropDown
                                        arr={categoryArr}
                                        width="w-full"
                                        height="h-[30px]"
                                        dropDownLabel=""
                                        dropDownPlaceholoder=""
                                        gap=""
                                        labelFont=""
                                        labelText=""
                                        name="category"
                                    />
                                    <div className="border-r h-[14px] border-gray-300" />
                                    <p className=" text-purple-500">공개여부</p>
                                    <UploadDropDown
                                        arr={statusArr}
                                        width="w-full"
                                        height="h-[30px]"
                                        dropDownLabel=""
                                        dropDownPlaceholoder=""
                                        gap=""
                                        labelFont=""
                                        labelText=""
                                        name="blogStatus"
                                    />
                                    {/* <p className="text-purple-500 font-semibold">
                                        {logs?.category}
                                    </p> */}
                                </div>
                            </div>
                            <hr />
                        </section>
                        <section>
                            <Controller
                                name="content"
                                control={control}
                                rules={{
                                    required: '내용을 입력해 주세요',
                                    minLength: {
                                        value: 10,
                                        message: '최소 10자 이상 입력해 주세요',
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <MarkdownEditor
                                        id="content"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                        labelText="text-[14px]"
                                        labelFont="font-semibold"
                                        dropDownLabel="내용 *"
                                        editorHeight={500}
                                        defaultValue={logs.content}
                                    />
                                )}
                            />
                        </section>
                        <hr />
                        <Like likeData={like} />
                    </div>
                    <LikePostLogs id={id} />
                    <TopBtn />
                </main>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex justify-center max-w-[248px] min-h-[48px] items-center px-[96px] bg-purple-500 text-white text-[14px] font-semibold rounded-[8px] cursor-pointer"
                        disabled={isLoading}
                        onClick={() => {
                            if (document.activeElement instanceof HTMLElement) {
                                document.activeElement.blur();
                            }
                        }}
                    >
                        수정하기
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};
export default LogsEdit;
