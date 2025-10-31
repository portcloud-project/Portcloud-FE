'use client';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { useBookMark } from '../hooks/useBookMark';
import { useBookMarkDelete } from '../hooks/useDeleteBookMark';
import { useLikeProejct } from '../hooks/useLikeProject';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
    id: string | string[];
}

const BookMarkPortfolio = ({ id }: Props) => {
    const { data, refetch } = useLikeProejct(id);
    const { mutate: like } = useBookMark({
        keyName: 'project',
        apiName: 'project',
    });
    const { mutate: unlike } = useBookMarkDelete({
        keyName: 'project',
        apiName: 'project',
    });

    const handleClick = () => {
        if (!id) return;
        if (data?.bookMarkCheck) {
            unlike(id, { onSuccess: () => refetch() });
        } else {
            like(id, { onSuccess: () => refetch() });
        }
    };

    const [pos, setPos] = useState({ top: 0, right: 0 });
    useEffect(() => {
        const updatePosition = () => {
            setPos({
                top: window.innerHeight * 0.45,
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
                onClick={handleClick}
                className="cursor-pointer bg-gray-100 p-[10px]  rounded-full border border-gray-200"
            >
                <motion.div
                    key={data?.bookMarkCheck ? 'filled' : 'outline'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {data?.bookMarkCheck ? (
                        <FaBookmark size={24} color="" />
                    ) : (
                        <FaRegBookmark size={24} />
                    )}
                </motion.div>
            </button>
        </div>
    );
};

export default BookMarkPortfolio;
