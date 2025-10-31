'use client';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

const TopBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [pos, setPos] = useState({ top: 0, right: 0 });

    useEffect(() => {
        const updatePosition = () => {
            setPos({
                top: window.innerHeight * 0.5,
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
                onClick={scrollToTop}
                className="cursor-pointer bg-gray-100 p-[10px] rounded-full border border-gray-200 shadow-md hover:bg-gray-200"
            >
                <MdKeyboardArrowUp size={24} />
            </button>
        </div>
    );
};

export default TopBtn;
