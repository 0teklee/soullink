import React, { useState } from "react";
import "swiper/css";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const FiltersList = ({
  filters,
  onClick,
  selectedFilter,
}: {
  filters: string[];
  onClick: (val: string) => void;
  selectedFilter?: string | string[];
}) => {
  const [controller, setController] = useState<SwiperCore>();

  const isSelected = (filter: string) =>
    typeof selectedFilter === "string"
      ? selectedFilter === filter
      : selectedFilter?.includes(filter);

  return (
    <div className={`relative w-full`}>
      <div className={`absolute top-0.5 -left-6 h-full cursor-pointer`}>
        <button
          onClick={() => {
            if (!controller) {
              return;
            }
            controller.slidePrev();
          }}
          aria-label={`previous filter`}
        >
          <ChevronLeftIcon className={`w-6 h-6 text-white`} />
        </button>
      </div>
      <Swiper
        slidesPerView={5}
        draggable={true}
        spaceBetween={20}
        className={`w-full`}
        modules={[Controller]}
        controller={{ control: [] }}
        onSwiper={(swiper) => {
          setController(swiper);
        }}
      >
        {filters.map((filter, index) => (
          <SwiperSlide
            style={{ width: "100%" }}
            className={`w-full overflow-hidden`}
            key={`category_${filter}_index`}
          >
            <button
              onClick={() => onClick(filter)}
              key={`category_${filter}_${index}`}
              className={`w-full px-2 py-1 text-sm text-gray-700 dark:text-gray-50 border border-gray-300 rounded overflow-hidden font-medium hover:text-primary ${
                isSelected(filter) &&
                `bg-primary text-white border-primary hover:text-white`
              }`}
            >
              <span className={`sideways-scroll`}>{filter}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`absolute top-0.5 -right-6 h-full cursor-pointer`}>
        <button
          onClick={() => {
            if (!controller) {
              return;
            }
            controller.slideNext();
          }}
          aria-label={`next filter`}
        >
          <ChevronRightIcon className={`w-6 h-6 text-white`} />
        </button>
      </div>
    </div>
  );
};

export default FiltersList;
