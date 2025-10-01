'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import CardLayout from '../layoutComponents/CardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UploadLogsFormValuesType } from '../upload/logs/page';
import UploadDropDown from './UploadDropDown';
import CustomAlert from './CustomAlert';

const LogsModal = ({
    setLogsModal,
    onLogsSubmit,
    isLoding,
}: {
    setLogsModal: React.Dispatch<React.SetStateAction<boolean>>;
    onLogsSubmit: SubmitHandler<UploadLogsFormValuesType>;
    isLoding: boolean;
}) => {
    const { register, handleSubmit } = useFormContext<UploadLogsFormValuesType>();
    const categoryArr = ['정보공유', '자기개발'];
    const blogStatusArr = ['공개', '비공개'];
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
                                * 대표 이미지 첨부
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
                                <UploadDropDown
                                    name="category"
                                    width="w-[300px]"
                                    height="h-[50px]"
                                    labelFont="font-bold"
                                    labelText="text-[24px]"
                                    gap="gap-[12px]"
                                    arr={categoryArr}
                                    dropDownLabel="* 카테고리"
                                    dropDownPlaceholoder="* 카테고리를 선택해 주세요"
                                    rules={{ required: '* 카테고리를 선택해 주세요' }}
                                />
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <UploadDropDown
                                    name="blogStatus"
                                    width="w-[300px]"
                                    height="h-[50px]"
                                    labelFont="font-bold"
                                    labelText="text-[24px]"
                                    gap="gap-[12px]"
                                    arr={blogStatusArr}
                                    dropDownLabel="* 공개여부"
                                    dropDownPlaceholoder="* 공개여부를 선택해주에요"
                                    rules={{ required: '* 공개여부를 선택해주에요' }}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-[var(--color-purple-500)] text-white cursor-pointer max-w-[87px] ml-auto"
                        onClick={() => handleSubmit(onLogsSubmit)()}
                        disabled={isLoding}
                    >
                        등록하기
                    </button>
                </CardContent>
            </Card>
            {isLoding && (
                <CustomAlert
                    isLoading={isLoding}
                    title="기록 업로드 중..."
                    message="잠시 시간이 소요될 수 있습니다."
                />
            )}
        </CardLayout>
    );
};

export default LogsModal;
