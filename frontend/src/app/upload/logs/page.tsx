'use client';

import { useForm } from 'react-hook-form';

const UploadLogs = () => {
    interface UploadLogsFormValuesType {
        title: string;
        content: string;
    }

    const {
        // getValues,
        register,
        // handleSubmit,
        // watch,
        // setValue,
        formState: { errors },
    } = useForm<UploadLogsFormValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    return (
        <>
            <h3 className="text-[28px] font-bold">기록하기</h3>
            <form action="" className="flex flex-col gap-[48px]">
                {/* 제목 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px] relative">
                    <label
                        htmlFor="title"
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        제목 *
                    </label>
                    <div className="w-full flex flex-col justify-between items-center gap-[6px]">
                        <input
                            type="text"
                            id="title"
                            placeholder="제목을 입력해주세요"
                            className={`w-[768px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px]  focus:outline-none transition duration-300 ease-in-out ${
                                errors.title
                                    ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                    : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                            }`}
                            {...register('title', {
                                required: '제목을 입력해주세요',
                                minLength: {
                                    value: 3,
                                    message: '제목은 1자 이상 입력해주세요',
                                },
                            })}
                        />
                        {/* 제목 error section */}
                        {errors.title && (
                            <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[120px]">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 내용 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px] relative">
                    <label
                        htmlFor="content"
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        내용 *
                    </label>
                    <textarea
                        placeholder="내용을 입력해 주세요"
                        className={`w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border border-[var(--color-gray-400)] resize-none overflow-y-auto h-[312px] focus:outline-none transition duration-300 ease-in-out flex flex-col justify-start items-start ${
                            errors.content
                                ? 'focus:bg-[var(--color-red-50)] focus:border-[var(--color-red-500)]'
                                : 'focus:bg-[var(--color-green-50)] focus:border-[var(--color-green-600)]'
                        }`}
                        {...register('content', {
                            required: '내용을 입력해주세요',
                        })}
                    />
                    {/* 내용 error section */}
                    {errors.content && (
                        <p className="font-normal text-[14px] text-[var(--color-red-500)] absolute left-0 top-[370px]">
                            {errors.content.message}
                        </p>
                    )}
                </div>
            </form>
        </>
    );
};

export default UploadLogs;
