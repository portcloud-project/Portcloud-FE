import { FaHeart } from 'react-icons/fa6';
export interface LikeData {
    bookMarkCheck: boolean;
    bookMarkCount: string;
    likeCheck: boolean;
    likeCount: string;
}

export interface LikeProps {
    likeData?: LikeData;
}
const Like = ({ likeData }: LikeProps) => {
    return (
        <div className="flex ">
            <p className="flex items-center gap-[12px]">
                <FaHeart color="red" />
                {likeData?.likeCount}
            </p>
        </div>
    );
};

export default Like;
