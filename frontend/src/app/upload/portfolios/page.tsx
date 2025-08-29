import SearchSkill from '@/app/customComponents/SearchSkill';

const UploadPortfolios = () => {
    return (
        <section className="w-[768px] flex gap-[48px] flex-col">
            <h3 className="text-[28px] font-bold">포트폴리오 업로드</h3>
            <form action="" className="flex flex-col gap-[48px]">
                <div className="flex gap-[12px] flex-col">
                    <label htmlFor="" className="font-bold">
                        제목 *
                    </label>
                    <input
                        type="text"
                        className="w-full py-[12px] border rounded-[8px] px-[20px]"
                        placeholder="제목을 입력해 주세요"
                    />
                </div>
                <div className="flex gap-[12px]">
                    <label htmlFor="" className="font-bold">
                        이름
                    </label>
                    <p>이예희</p>
                </div>
                <div className="flex gap-[12px] flex-col">
                    <label htmlFor="" className="font-bold">
                        이메일 *
                    </label>
                    <input
                        type="text"
                        className="w-full py-[12px] border rounded-[8px] px-[20px]"
                        placeholder="이메일을 입력해 주세요"
                    />
                </div>
                <div className="flex gap-[12px]">
                    <div className="flex flex-col flex-grow">
                        <label htmlFor="" className="font-bold">
                            분야 *
                        </label>
                        <input
                            type="text"
                            className=" py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="분야를 입력해 주세요"
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label htmlFor="" className="font-bold">
                            직무 *
                        </label>
                        <input
                            type="text"
                            className=" py-[12px] border rounded-[8px] px-[20px]"
                            placeholder="직무를 입력해 주세요"
                        />
                    </div>
                </div>
                <SearchSkill />
            </form>
        </section>
    );
};

export default UploadPortfolios;
