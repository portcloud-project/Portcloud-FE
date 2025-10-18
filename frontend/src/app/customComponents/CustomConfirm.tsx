interface CustomAlertProps {
    message?: string;
    title?: string;
    isLoading?: boolean; // 리액트 쿼리랑 연계해서 사용
    isError?: boolean;
    onSuccess?: boolean;
    errorMsg?: string;
    onAccept: () => void;
    onCancel?: () => void;
}

const CustomConfirm: React.FC<CustomAlertProps> = ({
    onAccept,
    onCancel, // 부모 요소에서 정의해서 내려줌
    message,
    title,
    // errorMsg,
    // isError,
    // onSuccess,
}) => {
    return (
        <main className="z-index fixed inset-0 flex items-center justify-center">
            <div className="opacity-50 absolute inset-0 bg-black"></div>
            <div className="fixed z-50 top-[1/2] right-[1/2]  justify-center  flex gap-[24px] bg-white min-w-[432px] min-h-[192px] rounded-[8px] flex-col  items-center">
                <div className="flex gap-[16px] flex-col  items-start w-full px-[24px] ">
                    <div className="text-[20px] font-bold">{title}</div>

                    <div className="text-gray-500 text-[16px]">{message}</div>
                    <div className="flex gap-[8px] w-full min-h-[48px] ">
                        <button
                            onClick={onCancel}
                            className="bg-gray-100 w-1/2 rounded-[8px] cursor-pointer"
                        >
                            취소
                        </button>
                        <button
                            onClick={onAccept}
                            className="bg-purple-500 text-white w-1/2 rounded-[8px] cursor-pointer"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CustomConfirm;
