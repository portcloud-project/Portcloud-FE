import { useEffect, useState } from 'react';
import { getTeamItem } from '../api/listItem';

interface TeamItem {
    title: string;
    author: string;
    tag: string;
    date: string;
}

interface MainTeamListProps {
    title: string;
}

const MainTeamList = ({ title }: MainTeamListProps) => {
    const [item, setItem] = useState<TeamItem[]>([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchData = await getTeamItem();
                setItem(fetchData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItem();
    }, [setItem]);

    return (
        <div className="flex flex-col gap-[24px]">
            <p className="font-bold text-[20px]">{title}</p>
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-center overflow-x-auto gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start">
                {item.length > 0 ? (
                    item.map((teamItem, index) => {
                        return (
                            <li
                                key={`${teamItem}-${index}`}
                                className="min-w-[220px] min-h-[100px] aspect-[4/3] bg-white border-[2px] border-gray-300 rounded-[20px] p-[24px] flex-1 cursor-pointer      tablet:shrink-0 tablet:min-w-[330px]"
                            >
                                <div className="flex gap-[4px] items-center">
                                    <p className="text-gray-500 text-[14px] font-medium">마감일</p>
                                    <div className="border-l h-[14px] border-gray-300 "></div>
                                    <p className="text-gray-500 text-[14px] font-medium">
                                        {new Date(teamItem.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <h2 className="text-[1em] font-bold my-[4px]">{teamItem.title}</h2>
                                <p className="w-fit rounded-[20px] bg-purple-50 px-[16px] py-[6px] box-border text-center font-semibold text-purple-500 text-[14px] my-[12px]">
                                    {teamItem.tag}
                                </p>
                                <hr />
                                <p className="mt-[18px] text-[14px] font-bold">{teamItem.author}</p>
                            </li>
                        );
                    })
                ) : (
                    <p className="w-[1392px] h-[248px] bg-gray-300 rounded-[20px] items-center flex justify-center text-white text-[20px] font-bold">
                        목록이 없습니다
                    </p>
                )}
            </ul>
        </div>
    );
};

export default MainTeamList;
