'use client';
import MainPortfolio from '@/app/customComponents/MainPortfolio';
import RecentPortfolio from '@/app/customComponents/RecentPortfolio';

const UserPortfolios = () => {
    return (
        <section className="flex gap-[48px] flex-col">
            <MainPortfolio title={'추천 포트폴리오'} />
            <RecentPortfolio title={'최신 포트폴리오'} />
        </section>
    );
};

export default UserPortfolios;
