'use client';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';

interface MypageAddProps {
    title: string;
    route: string;
}
const MypageAdd = ({ title, route }: MypageAddProps) => {
    const router = useRouter();
    return (
        <div className=" w-full  laptop:w-[calc(33.3%-8px)]  tablet:w-[calc(50%-6px)] flex justify-center aspect-[4/3] items-center rounded-[20px] bg-none border border-gray-300">
            <div className="flex gap-[24px] flex-col justify-center items-center  ">
                <div
                    className="w-fit bg-purple-500 p-[22px] rounded-[100px] cursor-pointer"
                    onClick={() => router.push(route)}
                >
                    <FaPlus className=" text-white" />
                </div>
                <div className="border rounded-[20px] min-w-[163px] min-h-[40px] flex justify-center items-center">
                    <p className="text-[16px] font-semibold text-gray-600">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default MypageAdd;
