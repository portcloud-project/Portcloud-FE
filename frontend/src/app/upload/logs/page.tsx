'use client';

import MarkdownEditor from '@/app/customComponents/MarkdownEditor';
import { Controller, useForm } from 'react-hook-form';

interface UploadLogsFormValuesType {
    title: string;
    content: string;
}

const UploadLogs = () => {
    const {
        // getValues,
        register,
        handleSubmit,
        // watch,
        // setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UploadLogsFormValuesType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onLogsSubmit = (data: UploadLogsFormValuesType) => {
        console.log(data.content);
    };

    return (
        <>
            <h3 className="text-[28px] font-bold">기록하기</h3>
            <form
                action=""
                onSubmit={handleSubmit(onLogsSubmit)}
                className="flex flex-col gap-[48px]"
            >
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

                {/* 관심직군 section */}
                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: '내용을 입력해 주세요',
                        minLength: { value: 10, message: '최소 10자 이상 입력해 주세요' },
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
                        />
                    )}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-md bg-[var(--color-purple-500)] text-white cursor-pointer"
                >
                    업로드
                </button>
            </form>
        </>
    );
};

export default UploadLogs;
