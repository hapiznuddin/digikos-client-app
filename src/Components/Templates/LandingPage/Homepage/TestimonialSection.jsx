// import { useState } from "react";
// import {FaChevronRight, FaChevronLeft} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BiSolidQuoteAltRight, BiSolidQuoteAltLeft } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetTestimoniRandom } from "../../../../services/landingPage/roomPage/useGetTestimoni";

const TestimonialSection = () => {

  const {data} = useGetTestimoniRandom({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  })

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
        {data?.data?.map((testimoni, index) => {
          const image = `${import.meta.env.VITE_DIGIKOS_URL}${testimoni.profile_pic}`
          return(
          <SwiperSlide key={index}>
            <div className="card mx-auto w-80 md:w-full lg:min-w-[400px] h-full bg-neutral-25 shadow-xl">
              <div className="avatar flex flex-col justify-center items-center gap-4 py-4">
                <div className="w-16 rounded-full ">
                  <img src={testimoni.profile_pic === null ? "https://cdn-icons-png.flaticon.com/512/1144/1144760.png" : image} />
                </div>
                <h1 className="text-lg font-semibold">{testimoni.name}</h1>
              </div>
              <div className="card-body text-center -mt-6">
                <div className="flex flex-col justify-center items-center gap-4 ">
                <BiSolidQuoteAltLeft size={24}/>
                <p>{testimoni.review}</p>
                <BiSolidQuoteAltRight size={24}/>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )})}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
