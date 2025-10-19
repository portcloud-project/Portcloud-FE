import LoadingSpinner from './LoadingSpinner';

interface CustomAlertProps {
    message?: string;
    title?: string;
    isLoading: boolean; // 리액트 쿼리랑 연계해서 사용
    isError?: boolean;
    onSucces?: boolean;
    errorMsg?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
    message,
    title,

    errorMsg,
    isLoading,
    isError,
    // onSucces,
}) => {
    return (
        <main className="z-index fixed inset-0 flex items-center justify-center">
            <div className="opacity-50 absolute inset-0 bg-black"></div>
            <div className="fixed z-50 top-[1/2] right-[1/2]  justify-center  flex gap-[24px] bg-white min-w-[400px] min-h-[200px] rounded-[8px] flex-col  items-center">
                <div>{isLoading && <LoadingSpinner />}</div>
                <div>{isError && <div>{errorMsg}</div>}</div>
                <div className="flex gap-[8px] flex-col  items-center">
                    <div className="text-[20px] font-bold">{isLoading && <div>{title}</div>}</div>

                    <div className="text-gray-500 text-[16px]">
                        {isLoading ? message : '로그인을 다시 시도해 주십시오'}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CustomAlert;
