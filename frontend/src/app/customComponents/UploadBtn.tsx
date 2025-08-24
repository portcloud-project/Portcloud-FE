'use client';

import { usePathname } from 'next/navigation';
import { MdOutlineNoteAdd } from 'react-icons/md';

const UploadBtn = () => {
    const location = usePathname();
    console.log(location);

    return (
        <button className="w-fit h-[48px] min-w-[193px] rounded-[100px] border border-purple-500 cursor-pointer font-semibold ">
            <div className="w-full flex justify-center items-center gap-[6px]">
                <MdOutlineNoteAdd size={24} color="#732BF1" />
                {location === '/works/projects' ? (
                    <p className="text-[16px] text-purple-500">프로젝트 업로드</p>
                ) : (
                    <p className="text-[16px] text-purple-500">포트폴리오 업로드</p>
                )}
            </div>
        </button>
    );
};
export default UploadBtn;
