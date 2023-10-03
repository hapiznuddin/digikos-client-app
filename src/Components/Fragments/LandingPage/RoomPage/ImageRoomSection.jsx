/* eslint-disable react/display-name */
import { Link } from "react-router-dom";
import { useImageRoomPage } from "../../../../features/landingPage/roomPage/useImageRoomPage";
import { forwardRef, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import "./imageSection.css";

const ImageRoomSection = forwardRef((props, ref) => {
  const id = ref.current;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { data: image, isLoading: loadingImage } = useImageRoomPage({
    id,
    onError: (image) => {
      console.log(image);
    },
  });

  const imagePath0 = image?.data[0].path;
  const imageurl0 = `${import.meta.env.VITE_DIGIKOS_URL}${imagePath0}`;
  const imagePath1 = image?.data[1].path;
  const imageurl1 = `${import.meta.env.VITE_DIGIKOS_URL}${imagePath1}`;
  const imagePath2 = image?.data[2].path;
  const imageurl2 = `${import.meta.env.VITE_DIGIKOS_URL}${imagePath2}`;
  return (
    <>
      {loadingImage ? (
        <div className="flex gap-4 justify-center items-center h-[550px] w-full mt-8 overflow-hidden ">
          <Skeleton className="w-3/4 h-full rounded-2xl">
            <Link>
              <img
                src={imageurl0}
                className="w-full h-full rounded-2xl bg-cover bg-center"
              />
            </Link>
          </Skeleton>
          <div className="flex flex-col w-1/3 gap-4 h-full">
            <Skeleton className="h-full">
              <img
                src={imageurl1}
                className=" h-full rounded-2xl bg-cover bg-center"
              />
            </Skeleton>
            <Skeleton className="h-full">
              <img
                src={imageurl2}
                className=" h-full rounded-2xl bg-cover bg-center"
              />
            </Skeleton>
          </div>
        </div>
      ) : (
        <div className="relative md:flex gap-4 justify-center items-center md:h-[400px] lg:h-[550px] w-full mt-8 overflow-hidden">
          <div className="md:w-3/4 md:h-full rounded-2xl">
            <Link
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <img
                src={imageurl0}
                className="w-full h-full rounded-2xl bg-cover bg-center"
              />
            <div className="absolute bottom-4 right-4 z-10 bg-neutral-25 py-1 px-2 rounded-full text-xs font-medium md:hidden">
              Lihat Gambar
            </div>
            </Link>
          </div>
          <div className="hidden md:flex flex-col w-1/3 gap-4 md:h-full lg:h-full">
            <Link className="h-full" onClick={() => document.getElementById("my_modal_3").showModal()}>
              <img
                src={imageurl1}
                className=" h-full rounded-2xl bg-cover bg-center"
              />
            </Link>
            <Link className="h-full" onClick={() => document.getElementById("my_modal_3").showModal()}>
              <img
                src={imageurl2}
                className=" h-full rounded-2xl bg-cover bg-center"
              />
              <div className="absolute bottom-4 right-4 z-10 bg-neutral-25 py-1 px-2 rounded-full text-lg shadow-md font-medium">
              Lihat Gambar
            </div>
            </Link>
          </div>
        </div>
      )}
      {/* //* popup dialog galeri */}
      <dialog id="my_modal_3" className="modal mx-auto">
        <div className="modal-box h-[70%] md:h-[85%] md:max-w-screen-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <AiOutlineClose size={24} />
            </button>
          </form>
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            spaceBetween={16}
            navigation={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 mt-2 w-full h-[80%] md:h-[650px]"
          >
            {image?.data.map((image, index) => {
              const imagePath = `${import.meta.env.VITE_DIGIKOS_URL}${
                image.path
              }`;
              return (
                <SwiperSlide className=" md:px-10" key={index}>
                  <img
                    src={imagePath}
                    className="w-full h-full md:h-full aspect-video object-cover object-bottom rounded-xl"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onClick={setThumbsSwiper}
            spaceBetween={16}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4 w-full h-20 md:h-32 px-10"
          >
            {image?.data.map((image, index) => {
              const imagePath = `${import.meta.env.VITE_DIGIKOS_URL}${
                image.path
              }`;
              return (
                <SwiperSlide key={index}>
                  <img
                    src={imagePath}
                    className={`w-full h-full aspect-video object-cover object-bottom rounded-xl ${
                      activeSlide === index ? "opacity-100" : "opacity-40"
                    }`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </dialog>
    </>
  );
});

export default ImageRoomSection;
