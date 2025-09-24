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
import MainPortfolio from './customComponents/MainPortfolio';

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
        <main className="w-full px-[24px] flex flex-col justify-start items-center mx-auto laptop:max-w-[1440px] tablet:w-full">
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
                        {Array.from({ length: 2 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="w-full flex justify-center items-center"
                            >
                                <div className="w-full m-auto">
                                    <Image
                                        src={mainBannerImg}
                                        alt="mainbanner"
                                        className="tablet:aspect-[25/6]  w-full rounded-[20px] xs-mobile:aspect-[16/9]"
                                        priority
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
            <section className="w-full flex mt-[48px] flex-col gap-[48px] overflow-x-auto">
                <MainList title="인기 프로젝트" />
                <MainPortfolio title="인기 포트폴리오" />
                <MainTeamList title="팀 구하기" />
            </section>
        </main>
    );
}
