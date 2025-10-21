import { FaHeart } from 'react-icons/fa6';

export interface LikeData {
    bookMarkCheck: boolean;
    bookMarkCount: string;
    likeCheck: boolean;
    likeCount: string | number;
}

export interface LikeProps {
    likeData?: LikeData | boolean | number;
}

const Like = ({ likeData }: LikeProps) => {
    let count: number | string | null = null;

    if (typeof likeData === 'number' || typeof likeData === 'string') {
        count = likeData;
    } else if (likeData && typeof likeData !== 'boolean') {
        count = likeData.likeCount;
    }

    return (
        <div className="flex">
            <p className="flex items-center gap-[12px]">
                <FaHeart color="red" />
                {count}
            </p>
        </div>
    );
};

export default Like;
