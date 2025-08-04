import { useEffect, useState } from "react";
import { getItem } from "../api/listItem";
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
      <ul className="flex gap-[24px]">
        {item.length > 0 ? (
          item.map((item, index) => {
            return (
              <li
                key={`${index}-${item}`}
                className="w-[330px] flex items-center justify-center bg-[url('/listBg.jpg')] bg-cover h-[248px] rounded-[20px] text-white relative px-[24px] cursor-pointer"
                // height의 경우 백엔드 api 완성 후 내부에 들어갈 데이터 채워 놓은 후 수정 필요
              >
                {/* 텍스트 */}
                <div className="relative z-10 flex items-center justify-center text-white font-bold text-[18px]">
                  {item}
                </div>
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/40 rounded-[20px]"></div>{" "}
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
