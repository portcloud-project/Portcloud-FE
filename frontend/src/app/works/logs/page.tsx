'use client';
import MainLogs from '@/app/customComponents/MainLogs';
import RecentLogs from '@/app/customComponents/RecentLogs';

const Logs = () => {
    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full gap-[48px]">
            <MainLogs title="추천 기록" />
            <RecentLogs title="최신 기록" />
        </main>
    );
};

export default Logs;
