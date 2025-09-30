import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikePortfolioPost } from '../hooks/useLikePortfolioPost';
import { useLikePortfolio } from '../hooks/useLikePortfolio';
import { usePortfolioDelete } from '../hooks/useLikePortfolioDelete';

const LikePost = ({ id }: { id: string | string[] }) => {
    const { mutate: like } = useLikePortfolioPost(); // POST 좋아요
    const { mutate: unlike } = usePortfolioDelete(); // DELETE 좋아요
    const { data, refetch } = useLikePortfolio(id); // 현재 상태 조회

    const handleLike = () => {
        if (!id) return;
        console.log('likeCheck', data?.likeCheck);
        if (data?.likeCheck) {
            unlike(id, { onSuccess: () => refetch() });
        } else {
            like(id, { onSuccess: () => refetch() });
        }
    };

    return (
        <div className="fixed right-[30%] top-[40%]">
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
