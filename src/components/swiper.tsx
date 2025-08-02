"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { SparklesIcon } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { AspectRatio } from "./ui/aspect-ratio";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  slideShadows: boolean;
}

export const CardSwipe: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  slideShadows = false,
}) => {
  const css = `
  .swiper {
    width: 80%;
    
    padding-bottom: 0px;
  }
  
  .swiper-slide {
   display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;

  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  `;
  return (
    <section className="w-ace-y-4 ">
      <style>{css}</style>

      <div className="w-full ">
        <Swiper
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          effect={"cards"}
          grabCursor={true}
          loop={true}
          slidesPerView={"auto"}
          rewind={true}
          cardsEffect={{
            slideShadows: slideShadows,
          }}
          modules={[EffectCards, Autoplay, Pagination, Navigation]}
        >
          {" "}
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="size-full rounded-3xl max-h-[600px]">
                <Image
                  src={image.src}
                  width={500}
                  height={500}
                  className="size-full rounded-xl shadow-2xl"
                  alt={image.alt}
                />
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <div>opa</div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  );
};
