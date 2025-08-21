'use client';

import MainList from '@/app/customComponents/MainList';

const UserProject = () => {
    return (
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full">
            <MainList title="추천 프로젝트" />
            <MainList title="최신 프로젝트" />
        </main>
    );
};
export default UserProject;
