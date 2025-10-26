import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTeamDetail } from '../hooks/useTeamsDetail';
import { useLikeTeamPost } from '../hooks/useLikeTeamPost';
import { useLikeTeamDelete } from '../hooks/useLikeTeamDelete';
import { motion } from 'framer-motion';

const LikePostTeam = ({ id }: { id: string | string[] }) => {
    const { mutate: like } = useLikeTeamPost(); // POST 좋아요
    const { mutate: unlike } = useLikeTeamDelete(); // DELETE 좋아요
    const { data, refetch } = useTeamDetail(id); // 현재 상태 조회
    const likeCheck = data?.liked;

    const handleLike = () => {
        if (!id) return;
        if (likeCheck) {
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
                {likeCheck ? (
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

export default LikePostTeam;
