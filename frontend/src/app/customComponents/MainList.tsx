import { useEffect, useState } from 'react';
import { getItem } from '../api/listItem';

interface MainListProps {
    title: string;
}

const MainList = ({ title }: MainListProps) => {
    const [item, setItem] = useState<string[]>([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchData = await getItem();
                setItem(fetchData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItem();
    }, [setItem]);

    return (
        <div className="w-full flex flex-col gap-[16px]">
            <p className="font-bold text-[20px]">{title}</p>
            <ul className="gap-y-[16px] w-full flex flex-row flex-wrap justify-center overflow-hidden gap-x-[20px] mobile:grid mobile:grid-cols-2 mobile:grid-rows-2 tablet:flex tablet:flex-row tablet:gap-x-[24px] tablet:flex-nowrap tablet:justify-start tablet:overflow-x-auto laptop:overflow-hidden">
                {item.length > 0 ? (
                    item.map((itemText, index) => {
                        return (
                            <li
                                key={`${index}-${itemText}`}
                                className="group min-w-[220px] aspect-[4/3] min-h-[100px] perspective-[1000px] cursor-pointer flex-1 tablet:shrink-0 tablet:min-w-[330px]"
                            >
                                {/* 회전 컨테이너 */}
                                <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                                    {/* 앞면 */}
                                    <div className="absolute inset-0 rounded-[20px] backface-hidden overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: 'var(--background-list-default)',
                                            }}
                                        ></div>
                                    </div>

                                    {/* 뒷면 */}
                                    <div className="absolute inset-0 rounded-[20px] rotate-y-180 backface-hidden overflow-hidden">
                                        {/* 뒷면 배경 */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: 'var(--background-list-hover)',
                                            }}
                                        ></div>
                                        {/* 오버레이 */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        {/* 텍스트  */}
                                        <div className="absolute inset-0 flex items-end justify-start z-10 text-white font-bold text-[18px] p-[24px]">
                                            {itemText}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="w-[1392px] h-[248px] bg-gray-300 rounded-[20px] items-center flex justify-center text-white text-[20px] font-bold">
                        목록이 없습니다
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MainList;
