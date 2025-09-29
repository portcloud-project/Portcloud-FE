'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import CardLayout from '../layoutComponents/CardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UploadLogsFormValuesType } from '../upload/logs/page';

const LogsModal = ({
    setLogsModal,
    onLogsSubmit,
}: {
    setLogsModal: React.Dispatch<React.SetStateAction<boolean>>;
    onLogsSubmit: SubmitHandler<UploadLogsFormValuesType>;
}) => {
    const { register, handleSubmit } = useFormContext<UploadLogsFormValuesType>();
    return (
        <CardLayout setLoginModal={setLogsModal}>
            <Card
                className="w-[518px] tablet:w-[720px] h-[602px] tablet:h-[614px] overflow-y-auto p-8 flex flex-col gap-8 relative"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <CardHeader className="text-start text-[28px] font-bold">등록하기</CardHeader>

                <CardContent className="space-y-8 text-sm leading-6 flex-col flex">
                    <div className="flex gap-[32px]">
                        <div className="flex flex-col gap-[12px]">
                            <label htmlFor="file" className="text-[20px] font-bold">
                                대표 이미지 첨부
                            </label>
                            <input
                                className="w-full border min-h-[350px] rounded-[8px] p-[20px]"
                                type="file"
                                id="file"
                                placeholder="10MB 이내의 파일을 업로드 해주세요"
                                {...register('thumbnail', {
                                    required: '* 대표이미지를 첨부해 주세요.',
                                })}
                            />
                        </div>
                        <div className="flex flex-col w-1/2 gap-[30px]">
                            <div className="flex flex-col gap-[12px]">
                                <label htmlFor="category" className="text-[20px] font-bold">
                                    카테고리
                                </label>
                                <select
                                    className="min-h-[64px] border rounded-[8px] p-[20px]"
                                    id="category"
                                    {...register('category', {
                                        required: '* 카테고리를 선택해 주세요.',
                                    })}
                                >
                                    <option value="정보공유">정보 공유</option>
                                    <option value="자기개발">자기 개발</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <label htmlFor="blogStatus" className="text-[20px] font-bold">
                                    공개여부
                                </label>
                                <select
                                    className="min-h-[64px] border rounded-[8px] p-[20px]"
                                    id="blogStatus"
                                    {...register('blogStatus', {
                                        required: '* 공개여부를 선택해 주세요.',
                                    })}
                                >
                                    <option value="1">공개</option>
                                    <option value="2">비공개</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-[var(--color-purple-500)] text-white cursor-pointer max-w-[87px] ml-auto"
                        onClick={() => handleSubmit(onLogsSubmit)()}
                    >
                        등록하기
                    </button>
                </CardContent>
            </Card>
        </CardLayout>
    );
};

export default LogsModal;
