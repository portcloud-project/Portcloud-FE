import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikeProjectPost } from '../hooks/useLikeProjectPost';
import { useLikeProjectDelete } from '../hooks/useLikeProjectDelete';
import { useLikeProejct } from '../hooks/useLikeProject';

const LikePost = ({ id }: { id: string | string[] }) => {
    const { mutate: like } = useLikeProjectPost(); // POST 좋아요
    const { mutate: unlike } = useLikeProjectDelete(); // DELETE 좋아요
    const { data, refetch } = useLikeProejct(id); // 현재 상태 조회

    const handleLike = () => {
        if (!id) return;
        if (data?.likeCheck) {
            unlike(id, { onSuccess: () => refetch() });
        } else {
            like(id, { onSuccess: () => refetch() });
        }
    };
    console.log(data);

    return (
        <div
            className="fixed right-[30%] top-[40%]     
                s-mobile::right-[10%] s-mobile::top-[30%]
                mobile:right-[20%] mobile:top-[35%]

                tablet:right-[25%] tablet:top-[38%]"
        >
            <button
                onClick={handleLike}
                className="cursor-pointer bg-gray-100 p-[10px]  rounded-full border border-gray-200"
            >
                {data?.likeCheck ? (
                    <AiFillHeart size={24} color="red" />
                ) : (
                    <AiOutlineHeart size={24} />
                )}
            </button>
        </div>
    );
};

export default LikePost;
