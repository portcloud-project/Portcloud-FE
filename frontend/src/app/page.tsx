'use client';

import Autoplay from 'embla-carousel-autoplay';
// import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import mainBannerImg from '@/app/imgs/mainbanner-img.png';
import { useState, useEffect } from 'react';
import MainList from './customComponents/MainList';
import MainTeamList from './customComponents/MainTeamList';

export default function Home() {
    // 캐러셀 api state
    const [api, setApi] = useState<CarouselApi>();
    // 현재 위치 state
    const [current, setCurrent] = useState(0);
    // 개수 state
    const [count, setCount] = useState(0);

    // 현재 위치 알 수 있게
    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <main className="w-full flex flex-col justify-start items-center m-auto py-[84px]  laptop:w-[1392px] tablet:w-full mobile:w-[720px] s-mobile:w-[432px] xs-mobile:w-[345px]">
            {/* 배너 줄어들기 원하지 않을시 tablet : w-[976px] 이 방법 채택시 전체 폭 가로 스크롤바 생김*/}
            {/* 스타일 통일이 필요해 보임 전체 스크롤바 선택 or 전체스크롤바 x 배너 + 내부 컨텐츠 같이 줄어들기 */}
            {/* mainBanner Section */}
            <section className="w-full flex flex-col justify-center items-center">
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    setApi={setApi}
                    className="w-full"
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="w-full flex justify-center items-center"
                            >
                                <div className="w-full m-auto">
                                    <Image
                                        src={mainBannerImg}
                                        alt="mainbanner"
                                        className="tablet:aspect-[25/6]  w-full rounded-[20px] xs-mobile:aspect-[16/9]"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="cursor-pointer" />
                    <CarouselNext className="cursor-pointer" />
                </Carousel>

                {/* 현재 위치 bullet point 부분*/}
                <div className="flex flex-row justify-center items-center w-[108px] h-[12px] gap-[12px] -mt-[24px] z-10">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`w-[12px] h-[12px] rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                                current === index + 1
                                    ? 'bg-[var(--color-purple-500)]'
                                    : 'bg-gray-50'
                            }`}
                        />
                    ))}
                </div>
            </section>
            {/* 메인 리스트 */}
            <section className="w-full flex my-[48px] flex-col gap-[48px] overflow-x-auto ">
                <MainList title="인기 프로젝트" />
                <MainList title="인기 포트폴리오" />
                <MainTeamList title="팀 구하기" />
            </section>
        </main>
    );
}
