import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTeamDetail } from '../hooks/useTeamsDetail';
import { useLikeTeamPost } from '../hooks/useLikeTeamPost';
import { useLikeTeamDelete } from '../hooks/useLikeTeamDelete';

const LikePostTeam = ({ id }: { id: string | string[] }) => {
    const { mutate: like } = useLikeTeamPost(); // POST 좋아요
    const { mutate: unlike } = useLikeTeamDelete(); // DELETE 좋아요
    const { data, refetch } = useTeamDetail(id); // 현재 상태 조회
    const likeCheck = data?.liked;

    const handleLike = () => {
        if (!id) return;
        console.log('likeCheck', likeCheck);
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
                    <AiFillHeart size={24} color="red" />
                ) : (
                    <AiOutlineHeart size={24} />
                )}
            </button>
        </div>
    );
};

export default LikePostTeam;
