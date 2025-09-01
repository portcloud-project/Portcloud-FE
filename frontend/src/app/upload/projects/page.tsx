'use client';

// import MarkdownEditor from '@/app/customComponents/MarkdownEditor';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6';
import { useState } from 'react';

const UploadProjects = () => {
    const isDeployArr = ['', '배포 중', '배포 완료'];
    const [selected, setSelected] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <h3 className="font-bold text-[28px] text-black">프로젝트 업로드</h3>

            <form action="" className="w-full flex flex-col justify-start items-start gap-[48px]">
                {/* 제목 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
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
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            프로젝트 기간 *
                        </label>

                        <div className="w-auto flex flex-row justify-center items-center gap-[16px]">
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
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            진행 인원 *
                        </label>
                        <input
                            type="number"
                            id="people"
                            className="w-full h-[44px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            min="1"
                            max="15"
                            step="1"
                            required
                        />
                    </div>
                </div>

                {/* 내용 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        프로젝트 내용 *
                    </label>
                    <textarea
                        placeholder="내용을 입력해 주세요"
                        className="w-full min-h-[312px] rounded-[8px] py-[12px] px-[20px] border border-[var(--color-gray-400)] resize-none overflow-y-auto h-[312px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out flex flex-col justify-start items-start"
                    />
                </div>

                {/* 담당 역할, 스킬 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                    {/* 담당 역할 section */}
                    <div className="w-fit flex flex-col justify-center items-start gap-[12px]">
                        <label
                            htmlFor=""
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            담당 역할 *
                        </label>
                        <input
                            type="text"
                            id="act"
                            placeholder="담당 역할을 입력해주세요"
                            className="w-[376px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    {/* 스킬 section */}
                    <div className="w-fit flex flex-col justify-center items-start gap-[12px]">
                        <label
                            htmlFor=""
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            스킬
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="skills"
                                placeholder="활용된 스킬을 입력해 주세요"
                                className="w-[376px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] p-[20px] pl-[40px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out upload-placeholder"
                                required
                            />
                            <span className="w-[24px] h-[24px] flex justify-center items-center absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FaMagnifyingGlass className="w-[16.8px] h-[16.8px] text-[var(--color-gray-500)]" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* URL, 배포 현황 section */}
                <div className="w-full flex flex-row justify-between items-center gap-[16px]">
                    {/* URL section */}
                    <div className="w-fit flex flex-col justify-center items-start gap-[12px]">
                        <label
                            htmlFor=""
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            placeholder="개인 URL을 입력해 주세요"
                            className="w-[376px] h-[64px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>

                    {/* 배포 현황 section */}
                    <div className="w-fit flex flex-col justify-between items-start gap-[12px]">
                        <label
                            htmlFor=""
                            className="text-[24px] font-bold text-[var(--color-gray-900)]"
                        >
                            배포 현황
                        </label>

                        <input type="hidden" name="isDeploy" value={selected} />

                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger
                                className={`w-[376px] h-[64px] border rounded-[8px] px-[12px] flex items-center justify-between cursor-pointer transition duration-300 ease-in-out
  ${open ? 'border-[var(--color-purple-500)]' : 'border-[var(--color-gray-400)]'}`}
                            >
                                <span className="flex-1 text-left">
                                    {selected || (
                                        <span className="text-[var(--color-gray-600)] text-[16px]">
                                            배포 현황 선택
                                        </span>
                                    )}
                                </span>
                                <span className="ml-2 flex-shrink-0">
                                    {open ? (
                                        <FaAngleUp className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                    ) : (
                                        <FaAngleDown className="w-[15px] h-[15px] text-[var(--color-gray-400)]" />
                                    )}
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[376px] flex flex-col gap-[4px] p-[6px]"
                                side="bottom"
                                align="start"
                                sideOffset={6}
                                alignOffset={0}
                            >
                                {isDeployArr.map((a, i) => (
                                    <DropdownMenuItem
                                        key={i}
                                        className="text-[16px] text-[var(--color-gray-700)] data-[highlighted]:text-white bg-[white] data-[highlighted]:bg-[var(--color-purple-500)] transition duration-300 ease-in-out w-[364px] h-[48px]"
                                        onSelect={() => setSelected(a)}
                                    >
                                        <FaCheck className="text-white" />
                                        {a}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* 대표 이미지 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="w-fit flex flex-row justify-center items-center gap-[12px] text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        대표 이미지 *
                        <span className="font-medium text-[20px] text-[var(--color-gray-500)]">
                            사진을 첨부해주세요
                        </span>
                    </label>
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            type="file"
                            id="file"
                            className="w-[768px] h-[312px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                </div>

                {/* 시연 영상 section */}
                <div className="w-full h-fit flex flex-col justify-center items-start gap-[12px]">
                    <label
                        htmlFor=""
                        className="w-fit flex flex-row justify-center items-center gap-[12px] text-[24px] font-bold text-[var(--color-gray-900)]"
                    >
                        시연 영상
                        <span className="font-medium text-[20px] text-[var(--color-gray-500)]">
                            영상을 첨부해주세요
                        </span>
                    </label>
                    <div className="w-full flex flex-row justify-between items-center gap-[6px]">
                        <input
                            type="file"
                            id="video"
                            className="w-[768px] h-[312px] border border-[var(--color-gray-400)] rounded-[8px] py-[10px] px-[12px] focus:border-[var(--color-purple-500)] focus:outline-none transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default UploadProjects;
