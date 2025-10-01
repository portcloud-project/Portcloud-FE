'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const OutputTeams = (props: { params: { id: string } }) => {
    const [title, setTitle] = useState<string>('');
    const [writerName, setWriterName] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [positionType, setPositionType] = useState<string>('');
    const [positionSkills, setPositionSkills] = useState<string>('');
    const [recruitStatus, setRecruitStatus] = useState<string>('');
    const [recruitDeadline, setRecruitDeadline] = useState<string>('');
    const [contactMethod, setContactMethod] = useState<string>('');

    const fetchOutputTeams = async () => {
        const id = props.params.id;

        try {
            const res = await axios.get('/api/output-teams', {
                params: { id: id },
            });
            const data = res.data;
            setTitle(data.title);
            setWriterName(data.writerName);
            setCreatedAt(data.createdAt);
            setContent(data.content);
            setPositionType(data.projectType);
            setPositionSkills(data.skills);
            const reStatus = data.recruitStatus;
            const recruitMapping = (a: string): string => {
                return a === 'RECRUITING' ? '모집 중' : '모집 완료';
            };
            setRecruitStatus(recruitMapping(reStatus));
            setRecruitDeadline(data.recruitDeadline);
            setContactMethod(data.contactMethod);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOutputTeams();
    }, []);

    const writeInfoArr = [
        {
            title: '작성자',
            value: `${writerName}`,
        },
        {
            title: '작성기간',
            value: `${createdAt}`,
        },
    ];

    const positionArr = [
        {
            title: '포지션',
            value: `${positionType}`,
        },
        {
            title: '인원',
            value: `2명`, // 값 넣어야함
        },
        {
            title: '필요 스킬',
            value: `${positionSkills}`,
        },
    ];

    const contactArr = [
        {
            title: '모집 마감일',
            value: `${recruitDeadline}`,
        },
        {
            title: '연락 방법',
            value: `${contactMethod}`,
        },
    ];

    return (
        <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
            {/* 작성 정보 section */}
            <section className="flex flex-col gap-[24px] w-full h-auto">
                {/* 제목, 배포현황 */}
                <div className="w-full h-[104px] flex flex-row justify-between items-start">
                    <span className="w-full h-[104px] flex justify-start items-start">
                        <h3 className="font-bold text-[40px] leading-[44px]">{title}</h3>
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
                    <span className="flex flex-row justify-start items-center gap-[8px] text-[16px] font-normal text-[var(--color-gray-500)]">
                        <button className="cursor-pointer">수정</button>
                        <span className="text[14px] text-[var(--color-gray-300)]">|</span>
                        <button className="cursor-pointer">삭제</button>
                    </span>
                </div>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 내용 section */}
            <section className="flex flex-col w-full h-auto justify-center items-start">
                <p className="text-[16px] font-normal text-[var(--color-gray-900)]">{content}</p>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 포지션 별 내용 section */}
            <section className="flex flex-row gap-[16px] w-full h-auto justify-between items-center">
                <span className="w-[376px] h-[128px] border border-[var(--color-gray-300)] p-[20px] rounded-[8px] gap-[8px] flex flex-col justify-center items-start relative">
                    {positionArr.map((a, i) => (
                        <div
                            key={i}
                            className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                        >
                            <h3 className="font-semibold">{a.title}</h3>
                            <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                            <p className="font-normal">{a.value}</p>
                        </div>
                    ))}
                    <div className="flex justify-center items-center w-[72px] h-[34px] border border-[var(--color-purple-500)] bg-[var(--color-purple-50)] rounded-full absolute top-[18px] right-[20px]">
                        <h3 className="text-[14px] text-[var(--color-purple-500)] font-semibold">
                            {recruitStatus}
                        </h3>
                    </div>
                </span>
            </section>

            {/* 모집 마감일, 연락 방법 section */}
            <section className="flex flex-col w-full h-auto gap-[8px] justify-center items-start">
                {contactArr.map((a, i) => (
                    <div
                        key={i}
                        className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                    >
                        <h3 className="font-semibold">{a.title}</h3>
                        <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                        <p className="font-normal">{a.value}</p>
                    </div>
                ))}
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />
        </main>
    );
};

export default OutputTeams;
