import dayjs from 'dayjs';
import { useActivityComment } from '../hooks/useActivityComment';
import { useRouter } from 'next/navigation';

const MyActivityComment = () => {
    const { data: comment } = useActivityComment();
    const router = useRouter();
    const postTypeMap: Record<string, string> = {
        project: '프로젝트',
        portfolio: '포트폴리오',
        teampost: '팀구하기',
        blog: '기록',
    };

    const onClickByType = (type: string, id: string) => {
        if (type === 'teampost') {
            const path = (type = 'teams');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'blog') {
            const path = (type = 'logs');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'project') {
            const path = (type = 'projects');
            router.push(`/output/${path}/${id}`);
        }
        if (type === 'portfolio') {
            const path = (type = 'portfolio');
            router.push(`/output/${path}/${id}`);
        }
    };

    return (
        <div className="w-full flex flex-col gap-[24px]">
            {comment?.map((comments) => (
                <div
                    key={`${comments}_${comments.commentId}`}
                    className="w-full flex cursor-pointer"
                    onClick={() => onClickByType(comments.postType, comments.postId)}
                >
                    <div className="flex flex-col w-full gap-[12px]">
                        <div className="flex justify-end">
                            <div className="w-[12%] min-h-[40px] bg-purple-500 text-white flex items-center justify-center rounded-full">
                                {postTypeMap[comments.postType] || comments.postType}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[4px] w-full">
                            <div className="text-gray-900 text-[20px] font-bold">
                                {comments.postTitle}
                            </div>
                            <div className="text-gray-900 text-[20px] font-medium">
                                {comments.comment}
                            </div>
                        </div>
                        <div className="text-gray-500 text-[16px]">
                            {dayjs(comments.createdAt).format('YYYY.MM.DD')}
                        </div>

                        <hr className="mt-[24px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default MyActivityComment;
