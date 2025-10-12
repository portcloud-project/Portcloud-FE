import { MdKeyboardArrowUp } from 'react-icons/md';

const TopBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div
            className="fixed right-[30%] top-[45%]   
                s-mobile::right-[10%] s-mobile::top-[30%]
                mobile:right-[20%] mobile:top-[40%]
                tablet:right-[25%] tablet:top-[43%]"
        >
            <button
                onClick={scrollToTop}
                className="cursor-pointer bg-gray-100 p-[10px]  rounded-full border border-gray-200
            
                "
            >
                <MdKeyboardArrowUp size={24} />
            </button>
        </div>
    );
};

export default TopBtn;
