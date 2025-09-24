'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineNoteAdd } from 'react-icons/md';

const UploadBtn = () => {
    const pathname = usePathname();
    const router = useRouter();
    const pathnameWord = pathname.split('/')[2];

    return (
        <button
            className="hidden tablet:block tablet:w-fit h-[48px] min-w-[193px] rounded-[100px] border border-purple-500 cursor-pointer font-semibold "
            onClick={() => {
                router.push(
                    pathnameWord === 'projects'
                        ? '/upload/projects'
                        : pathnameWord === 'portfolios'
                          ? '/upload/portfolios'
                          : pathnameWord === 'logs'
                            ? '/upload/logs'
                            : '/upload/teams',
                );
            }}
        >
            <div className="w-full flex justify-center items-center gap-[6px]">
                <MdOutlineNoteAdd size={24} color="#732BF1" />
                {pathname === '/works/projects' ? (
                    <p className="text-[16px] text-purple-500">프로젝트 업로드</p>
                ) : pathname === '/works/portfolios' ? (
                    <p className="text-[16px] text-purple-500">포트폴리오 업로드</p>
                ) : pathname === '/works/logs' ? (
                    <p className="text-[16px] text-purple-500">기록 업로드</p>
                ) : (
                    <p className="text-[16px] text-purple-500">팀원 구하기</p>
                )}
            </div>
        </button>
    );
};
export default UploadBtn;
