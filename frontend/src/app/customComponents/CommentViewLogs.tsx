import dayjs from 'dayjs';
import { Control, Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { CommentProps } from './Comment';
import { useCommentLogsPost } from '../hooks/useCommentLogsPost';
import { useCommentViewLogs } from '../hooks/useCommentLogsView';
import { useCommentLogsDelete } from '../hooks/useCommentLogsDelete';
import Cookies from 'js-cookie';

interface CommentItem {
    id: string; // 객체 자체의 id
    comment: string | null;
    userWriteName: string;
    createdAt: string;
    owner: boolean;
    replies: CommentItem[];
}

interface CommentNodeProps {
    comment: CommentItem;
    parentId: string | string[]; // 부모 코멘트 아이템의 id
    // eslint-disable-next-line no-unused-vars
    mutate: (payload: {
        id: string | string[]; // 게시글 id
        comment: string; //  댓글 내용
        parentCommentId: string | null; // 부모코멘트 아이템의 id  대댓글이 아닌 첫 댓글일 경우 null로 전달
    }) => void; // 포트스 뮤테이트
    // eslint-disable-next-line no-unused-vars
    deleteMutate: (payload: { id: string | string[]; parentCommentId: string }) => void; // 댓글 삭제 뮤테이트 게시글 id 와 부모 코멘트 id 전달
    control: Control<{ [key: string]: string }>; // 인풋 컨트롤러
    repliesToggle: Record<string, boolean>; // 댓글입력창 토글 게터
    setRepliesToggle: React.Dispatch<React.SetStateAction<Record<string, boolean>>>; // 댓글입력창 토글 세터
    depth?: number;
    // eslint-disable-next-line no-unused-vars
    setValue: (name: string, value: string) => void;
}

const CommentNode = ({
    comment,
    parentId,
    mutate,
    deleteMutate,
    control,
    repliesToggle,
    setRepliesToggle,
    depth = 0,
    setValue,
}: CommentNodeProps) => {
    const token = Cookies.get('accessToken');
    const handleToggleReplies = (id: string) => {
        if (!token) return;
        setRepliesToggle((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={`${depth === 0 ? '' : 'bg-gray-50'} py-[24px] flex flex-col gap-[12px]`}>
            <div className="flex gap-[8px] items-center px-[24px]">
                <p className="text-gray-900 text-[18px] font-bold ">{comment.userWriteName}</p>
                <p className="text-gray-500 text-[16px]">
                    {dayjs(comment.createdAt).format('YYYY-MM-DD')}
                </p>
                {comment.owner && (
                    <button
                        className="flex ml-auto text-gray-500 text-[16px]"
                        onClick={() => deleteMutate({ id: parentId, parentCommentId: comment.id })}
                    >
                        삭제
                    </button>
                )}
            </div>
            <p className="text-gray-900 text-[18px] px-[24px]">{comment.comment}</p>
            {token && (
                <button
                    className="bg-gray-100 border border-gray-200 rounded-[20px] px-[16px] py-[6px] text-gray-700 text-[14px] font-semibold max-w-[60px] ml-[24px]"
                    onClick={() => handleToggleReplies(comment.id)}
                >
                    답글
                </button>
            )}

            {token && repliesToggle[comment.id] && (
                <Controller
                    name={`comment_${comment.id}`}
                    control={control}
                    render={({ field }) => (
                        <form
                            className="flex flex-col gap-[24px]"
                            onSubmit={(e) => {
                                e.preventDefault();
                                mutate({
                                    id: parentId,
                                    comment: field.value,
                                    parentCommentId: comment.id,
                                });
                                setValue(`comment_${comment.id}`, '');
                            }}
                        >
                            <input
                                {...field}
                                className="w-full flex-1 border p-[24px] rounded-[8px] min-h-[10vh]"
                            />
                            <button
                                type="submit"
                                className="px-[24px] py-[12px] text-[16px] font-semibold bg-gray-100 text-gray-400 max-w-[108px] cursor-pointer rounded-[8px] ml-auto"
                            >
                                댓글 작성
                            </button>
                        </form>
                    )}
                />
            )}
            {/* 재귀적으로 자식 댓글 렌더링 */}
            {comment.replies
                .filter((rep): rep is CommentItem => typeof rep !== 'string')
                .map((rep) => (
                    <CommentNode
                        key={rep.id} // comment : commentItem.id와 동일
                        comment={rep} // comment : commentItem과 동일
                        parentId={parentId}
                        mutate={mutate}
                        deleteMutate={deleteMutate}
                        control={control}
                        repliesToggle={repliesToggle}
                        setRepliesToggle={setRepliesToggle}
                        depth={depth + 1}
                        setValue={setValue}
                    />
                ))}
        </div>
    );
};

const CommentViewLogs = ({ id }: CommentProps) => {
    const { data } = useCommentViewLogs(id);
    const { mutate } = useCommentLogsPost();
    const { mutate: deleteMutate } = useCommentLogsDelete();
    const { control, setValue } = useForm();
    const [repliesToggle, setRepliesToggle] = useState<Record<string, boolean>>({});

    return (
        <section className="w-full flex flex-col gap-[32px]">
            {data?.map((item: CommentItem) => (
                <CommentNode
                    key={item.id}
                    comment={item}
                    parentId={id}
                    mutate={mutate}
                    deleteMutate={deleteMutate}
                    control={control}
                    repliesToggle={repliesToggle}
                    setRepliesToggle={setRepliesToggle}
                    setValue={setValue}
                />
            ))}
        </section>
    );
};

export default CommentViewLogs;
