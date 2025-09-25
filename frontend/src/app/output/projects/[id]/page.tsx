'use client';

import axios from 'axios';
import { useEffect } from 'react';

const OutputProjects = () => {
    const fetchOutputProject = async () => {
        try {
            const res = await axios.get('/api/output-project');

            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOutputProject();
    }, []);

    return (
        <main className="flex flex-col justify-start itmes-start w-[768px] h-auto">
            {/* 윗 정보 section */}
            <section className="flex flex-col gap-[24px] w-full h-auto border border-black">
                <div className="w-full flex flex-row justify-between items-start">
                    <span className="w-[654px] h-[104px] flex justify-start items-start">
                        <h3 className="font-bold text-[40px]">
                            PortCloud, IT 커리어 성장 플랫폼 프로젝트
                        </h3>
                    </span>
                    <span className="w-auto h-[104px]">
                        <div
                            className={`w-[90px] h-[40px] border border-[var(--color-green-600)] text-[var(--color-green-600)] font-semibold text-[16px] flex justify-center items-center rounded-[20px]`}
                        >
                            배포중
                        </div>
                    </span>
                </div>
            </section>
        </main>
    );
};

export default OutputProjects;

// 프레임워크에서의 동작원리 page.tsx여도 export를 해야 나오는건가
// 가족여행 제주도 알아보기,
// 숙소 예약
// 하루에 8만원 쓰는 모임 - 무슨 모임인지 물어보기
// api 폴더 소문자 - 호출하는 곳도 수정
