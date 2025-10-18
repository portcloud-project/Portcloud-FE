'use client';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { useBookMark } from '../hooks/useBookMark';
import { useLikePortfolio } from '../hooks/useLikePortfolio';
import { useBookMarkDelete } from '../hooks/useDeleteBookMark';

interface Props {
    id: string | string[];
}

const BookMarkPortfolio = ({ id }: Props) => {
    const { data, refetch } = useLikePortfolio(id);
    const { mutate: like } = useBookMark({
        keyName: 'portfolio',
        apiName: 'portfolio',
    });
    const { mutate: unlike } = useBookMarkDelete({
        keyName: 'portfolio',
        apiName: 'portfolio',
    });

    const handleClick = () => {
        if (!id) return;
        if (data?.bookMarkCheck) {
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
                {data?.bookMarkCheck ? (
                    <FaBookmark size={24} color="" />
                ) : (
                    <FaRegBookmark size={24} />
                )}
            </button>
        </div>
    );
};

export default BookMarkPortfolio;
