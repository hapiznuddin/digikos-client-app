// import { useState } from "react";
// import {FaChevronRight, FaChevronLeft} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialSection = () => {
  const testimoni = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      desctiption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?",
    },
    {
      id: 2,
      name: "Lala Doe",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      desctiption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?",
    },
    {
      id: 3,
      name: "Yaya Doe",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      desctiption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?",
    },
    {
      id: 4,
      name: "Lulu Doe",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      desctiption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?",
    },
  ];

  return (
    <div
      className="mx-auto w-96  md:w-[620px] lg:w-[830px] h-[400px] md:h-[380px] lg:h-[400px] overflow-hidden"
      data-aos="zoom-in-left"
      data-aos-duration="900"
      data-aos-easing="ease-out-quad"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        className="mySwiper h-full"
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
          modifierClasses: "swiper-pagination-custom",
        }}
        // centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {testimoni.map((testimoni, index) => (
          <SwiperSlide key={index}>
            <div className="card mx-auto w-80 md:w-full lg:min-w-[400px] h-full bg-neutral-25 shadow-xl">
              <div className="avatar flex flex-col justify-center items-center gap-4 py-4">
                <div className="w-16 rounded-full ">
                  <img src={testimoni.image} />
                </div>
                <h1 className="text-lg font-semibold">{testimoni.name}</h1>
              </div>
              <div className="card-body text-center ">
                <p>{testimoni.desctiption}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
