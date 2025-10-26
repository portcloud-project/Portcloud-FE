import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikePortfolioPost } from '../hooks/useLikePortfolioPost';
import { useLikePortfolio } from '../hooks/useLikePortfolio';
import { usePortfolioDelete } from '../hooks/useLikePortfolioDelete';
import { motion } from 'framer-motion';

const LikePost = ({ id }: { id: string | string[] }) => {
    const { mutate: like } = useLikePortfolioPost(); // POST 좋아요
    const { mutate: unlike } = usePortfolioDelete(); // DELETE 좋아요
    const { data, refetch } = useLikePortfolio(id); // 현재 상태 조회

    const handleLike = () => {
        if (!id) return;
        if (data?.likeCheck) {
            unlike(id, { onSuccess: () => refetch() });
        } else {
            like(id, { onSuccess: () => refetch() });
        }
    };

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
                    <motion.div
                        key="filled"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        <AiFillHeart size={24} color="red" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="outline"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <AiOutlineHeart size={24} />
                    </motion.div>
                )}
            </button>
        </div>
    );
};

export default LikePost;
