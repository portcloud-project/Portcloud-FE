'use client';

import { useDeleteTeam } from '@/app/hooks/useDeleteTeam';
import { useTeamDetail } from '@/app/hooks/useTeamsDetail';
import { userStore } from '@/app/stores/userStore';
import { useRouter } from 'next/navigation';

const OutputTeams = (props: { params: { id: string } }) => {
    const id = props.params.id;
    const { data: teams, isLoading, isError, error } = useTeamDetail(id);

    const user = userStore((state) => state.user);

    const deleteMutation = useDeleteTeam();
    const router = useRouter();

    if (isLoading) return <p>불러오는 중...</p>;
    if (isError) return <p className="text-red-500">에러 발생 {error.message}</p>;
    if (!teams?.id) return <p>해당 팀이 삭제되었거나 찾을 수 없습니다.</p>;

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        if (user.name !== teams?.writerName) {
            return alert('사용자 정보가 일치하지 않습니다');
        }
        try {
            await deleteMutation.mutateAsync(id);
            alert('해당 팀 구하기가 삭제되었습니다.');
            router.push('/works/teams');
        } catch (err) {
            console.error(err);
        }
    };

    const engToKo = (a: string): string => {
        return a === 'RECRUITING' ? '모집 중' : '모집 마감';
    };

    const writeInfoArr = [
        {
            title: '작성자',
            value: `${teams?.writerName ?? ''}`,
        },
        {
            title: '작성기간',
            value: `${teams?.createdAt}`,
        },
    ];

    console.log(typeof teams?.recruits);

    const contactArr = [
        {
            title: '모집 마감일',
            value: `${teams?.recruitDeadline}`,
        },
        {
            title: '연락 방법',
            value: `${teams?.contactMethod}`,
        },
    ];

    return (
        <main className="flex flex-col justify-start itmes-start w-[768px] h-auto gap-[48px]">
            {/* 작성 정보 section */}
            <section className="flex flex-col gap-[24px] w-full h-auto">
                {/* 제목, 배포현황 */}
                <div className="w-full h-[104px] flex flex-row justify-between items-start">
                    <span className="w-full h-[104px] flex justify-start items-start">
                        <h3 className="font-bold text-[40px] leading-[44px]">{teams?.title}</h3>
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
                        <button className="cursor-pointer" onClick={handleDelete}>
                            삭제
                        </button>
                    </span>
                </div>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 내용 section */}
            <section className="flex flex-col w-full h-auto justify-center items-start">
                <p className="text-[16px] font-normal text-[var(--color-gray-900)]">
                    {teams?.content}
                </p>
            </section>

            {/* 밑줄 */}
            <hr className="w-full h-[1px] text-[var(--color-gray-300)]" />

            {/* 포지션 별 내용 section */}
            <section className="flex flex-row gap-[16px] w-full h-auto justify-between items-center">
                <span className="w-[376px] h-[128px] border border-[var(--color-gray-300)] p-[20px] rounded-[8px] gap-[8px] flex flex-col justify-center items-start relative">
                    {/* {teams?.recruits.map((a, i) => (
                        <span
                            className="w-[376px] h-[128px] border border-[var(--color-gray-300)] p-[20px] rounded-[8px] gap-[8px] flex flex-col justify-center items-start relative"
                            key={i}
                        >
                            <div
                                key={i}
                                className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                            >
                                <h3 className="font-semibold whitespace-nowrap">포지션</h3>
                                <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                                <p className="font-normal">{a.position}</p>
                            </div>
                            <div
                                key={i}
                                className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                            >
                                <h3 className="font-semibold whitespace-nowrap">인원</h3>
                                <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                                <p className="font-normal">{a.people}</p>
                            </div>
                            <div
                                key={i}
                                className="w-fit h-auto flex flex-row justify-center items-center text-[var(--color-gray-900)] text-[16px] gap-[12px]"
                            >
                                <h3 className="font-semibold whitespace-nowrap">필요 스킬</h3>
                                <span className="text-[var(--color-gray-300)] text-[14px]">|</span>
                                <p className="font-normal">{a.skills.map((a) => ` ${a}`)}</p>
                            </div>
                        </span>
                    ))} */}
                    <div
                        className={`flex justify-center items-center w-[72px] h-[34px] border rounded-full absolute top-[18px] right-[20px] ${teams?.recruitStatus === 'RECRUITING' ? 'border-[var(--color-purple-500)] bg-[var(--color-purple-50)]' : 'border-[var(--color-gray-400)] bg-[var(--color-gray-100)]'}`}
                    >
                        <h3
                            className={`text-[14px]  font-semibold
                            ${teams?.recruitStatus === 'RECRUITING' ? 'text-[var(--color-purple-500)]' : 'text-[var(--color-gray-400)]'}
                            `}
                        >
                            {engToKo(teams?.recruitStatus)}
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
