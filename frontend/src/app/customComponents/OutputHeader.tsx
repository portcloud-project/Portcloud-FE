const OutputHeader = () => {

    const writeInfoArr = [
        {
            title: '작성자',
            value: '@yeheelee', // 값 가져와서 여기에 넣으면 될듯
        },
        {
            title: '작성기간',
            value: '2025.07.19 20:37', // 여기도
        },
    ];

    return (
        <section className="flex flex-col gap-[24px] w-full h-auto">
                {/* 제목, 배포현황 */}
                <div className="w-full flex flex-row justify-between items-start">
                    <span className="w-[654px] h-[104px] flex justify-start items-start">
                        <h3 className="font-bold text-[40px] leading-[44px]">
                            PortCloud, IT 커리어 성장 플랫폼 프로젝트
                        </h3>
                    </span>
                    <span className="w-auto h-[104px]">
                        {/* 분기처리 예정 */}
                        <div
                            className={`w-[90px] h-[40px] border border-[var(--color-green-600)] text-[var(--color-green-600)] font-semibold text-[16px] flex justify-center items-center rounded-[20px]`}
                        >
                            배포중
                        </div>
                    </span>
                </div>
                {/* 작성자, 작성기간, 수정 및 삭제 */}
                <div className="w-full flex flex-row justify-between items-center">
                    <span className="flex flex-row justify-start items-center gap-[8px] text-[16px]">
                        {writeInfoArr.map((a, i) => {
                            return (
                                <span
                                    key={i}
                                    className="flex flex-row justify-start items-center gap-[6px]"
                                >
                                    <h3 className="font-normal text-[var(--color-gray-500)]">
                                        {a.title}
                                    </h3>
                                    <p className="font-semibold text-[var(--color-gray-500)]">
                                        {a.value}
                                    </p>
                                </span>
                            );
                        })}
                        {/* 중간에 | 이거 넣어야함 예정 */}
                    </span>
                    {/* 분기처리 예정 */}
                    <span className='flex flex-row justify-start items-center gap-[8px] text-[16px] font-normal text-[var(--color-gray-500)]'>
                        <button className='cursor-pointer'>수정</button>
                        <span className='text[14px] text-[var(--color-gray-300)]'>|</span>
                        <button className='cursor-pointer'>삭제</button>
                    </span>
                </div>
                {/* 밑줄 */}
                <hr className='w-full h-[1px] text-[var(--color-gray-300)]'/>
            </section>
    )
}

export default OutputHeader;
