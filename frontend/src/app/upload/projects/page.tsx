import MarkdownEditor from "@/app/customComponents/MarkdownEditor";

const UploadProjects = () => {
    return (
        <>
            <h3 className="font-bold text-[28px] text-black">프로젝트 업로드</h3>

            <form action="" className="w-full flex flex-col justify-start items-start gap-[48px]">
                {/* 제목 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="text-[28px] font-semibold text-[var(--color-gray-900)]"
                    >
                        제목 *
                    </label>
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            type="text"
                            id="title"
                            placeholder="PortCloud, IT 커리어 성장 플랫폼 프로젝트"
                            className="w-[768px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                </div>

                {/* name, birth section */}
                <div className="w-full flex flex-row justify-between items-center gap-[6px]">

                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[28px] font-semibold text-[var(--color-gray-900)]"
                        >
                            프로젝트 기간 *
                        </label>

                        <div className='w-auto flex flex-row justify-center items-center gap-[16px]'>
                            <div className="relative w-auto">
                                <input
                                    type="date"
                                    id="start-date"
                                    placeholder="시작일"
                                    className="w-[245px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                                    required
                                />
                                
                            </div>

                            <div className="relative w-auto">
                                <input
                                    type="date"
                                    id="end-date"
                                    placeholder="종료일"
                                    className="w-[245px] h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out cursor-pointer"
                                    required
                                />
                            </div>
                        </div>

                    </div>

                    <div className="w-[236px] flex flex-col justify-center items-start gap-[6px]">
                        <label
                            htmlFor=""
                            className="text-[28px] font-semibold text-[var(--color-gray-900)]"
                        >
                            진행 인원 *
                        </label>
                        <input
                            type="number"
                            id="people"
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            min="1" max="15" step="1"
                            required
                        />
                    </div>
                </div>

                {/* 내용 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="text-[28px] font-semibold text-[var(--color-gray-900)]"
                    >
                        프로젝트 내용 *
                    </label>
                    <div className="w-[768px] flex flex-row justify-between items-center gap-[6px]">
                        <MarkdownEditor editorHeight={312}/>
                    </div>
                </div>

            </form>
        </>
    );
};

export default UploadProjects;
