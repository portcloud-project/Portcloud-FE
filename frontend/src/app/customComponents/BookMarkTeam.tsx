'use client';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { useBookMark } from '../hooks/useBookMark';
import { useBookMarkDelete } from '../hooks/useDeleteBookMark';
import { useTeamDetail } from '../hooks/useTeamsDetail';

import { motion } from 'framer-motion';

interface Props {
    id: string | string[];
}

const BookMarkTeam = ({ id }: Props) => {
    const { data, refetch } = useTeamDetail(id);
    const { mutate: like } = useBookMark({
        keyName: 'team',
        apiName: 'team',
    });
    const { mutate: unlike } = useBookMarkDelete({
        keyName: 'team',
        apiName: 'team',
    });

    const handleClick = () => {
        if (!id) return;
        if (data?.bookmarked) {
            unlike(id, { onSuccess: () => refetch() });
        } else {
            like(id, { onSuccess: () => refetch() });
        }
    };

    return (
        <div
            className="fixed right-[30%] top-[50%]     

                    s-mobile::right-[10%] s-mobile::top-[40%]
                    mobile:right-[20%] mobile:top-[45%]
    
                    tablet:right-[25%] tablet:top-[48%]"
        >
            <button
                onClick={handleClick}
                className="cursor-pointer bg-gray-100 p-[10px]  rounded-full border border-gray-200"
            >
                <motion.div
                    key={data?.bookmarked ? 'filled' : 'outline'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {data?.bookmarked ? (
                        <FaBookmark size={24} color="" />
                    ) : (
                        <FaRegBookmark size={24} />
                    )}
                </motion.div>
            </button>
        </div>
    );
};

export default BookMarkTeam;
