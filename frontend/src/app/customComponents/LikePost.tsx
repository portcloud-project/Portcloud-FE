import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikePortfolioPost } from '../hooks/useLikePortfolioPost';
import { useLikePortfolio } from '../hooks/useLikePortfolio';
import { usePortfolioDelete } from '../hooks/useLikePortfolioDelete';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

    const [pos, setPos] = useState({ top: 0, right: 0 });

    useEffect(() => {
        const updatePosition = () => {
            setPos({
                top: window.innerHeight * 0.4,
                right: window.innerWidth * 0.07,
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    return (
        <div
            className="fixed transition-all duration-300"
            style={{ top: pos.top, right: pos.right }}
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
