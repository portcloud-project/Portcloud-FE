import { Controller, useForm } from 'react-hook-form';
import { useCommentTeamPost } from '../hooks/useCommentTeamPost';

interface CommentForm {
    comment: string;
    parentId: string;
}

export interface CommentProps {
    id: string | string[];
}

const CommentTeam = ({ id }: CommentProps) => {
    const { control, handleSubmit, setValue } = useForm<CommentForm>();
    const { mutate } = useCommentTeamPost();

    const onSubmit = (data: CommentForm) => {
        console.log(data.parentId);
        mutate({ id, comment: data.comment, parent_id: data.parentId });
        setValue('comment', '');
    };
    return (
        <section className="w-full min-h-[15vh] flex">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-[24px]">
                <Controller
                    control={control}
                    name="comment"
                    render={({ field }) => (
                        <input {...field} className="w-full flex-1 border p-[24px] rounded-[8px]" />
                    )}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className=" px-[24px] py-[12px] text-[16px] font-semibold bg-gray-100 text-gray-400 max-w-[108px] cursor-pointer rounded-[8px] "
                    >
                        댓글 작성
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CommentTeam;
