"use client";

import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import mainBannerImg from "@/app/imgs/mainbanner-img.png";
import { useState, useEffect } from "react";
import MainList from "./customComponents/MainList";
import MainTeamList from "./customComponents/MainTeamList";

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

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <main className="w-[100vw] flex flex-col justify-start items-center py-[84px]">
      {/* mainBanner Section */}
      <section className="w-[1440px] flex flex-col justify-center items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            align: "start",
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
                <div className="w-[1392px] h-[336px] m-auto">
                  <Image
                    src={mainBannerImg}
                    alt="mainbanner"
                    className="object-cover w-full h-full rounded-[20px]"
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
                  ? "bg-[var(--color-purple-500)]"
                  : "bg-gray-50"
              }`}
            />
          ))}
        </div>
      </section>
      {/* 메인 리스트 */}
      <section className="w-[1392px] flex my-[48px] flex-col gap-[48px] ">
        <MainList title="인기 프로젝트" />
        <MainList title="인기 포트폴리오" />
        <MainTeamList title="팀 구하기" />
      </section>
    </main>
  );
}
