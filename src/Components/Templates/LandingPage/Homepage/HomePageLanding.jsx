import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import HeroSection from "./HeroSection";
import FacilitySection from "./FacilitySection";
import RoomSection from "./RoomSection";
import "./HomePage.css";
import "aos/dist/aos.css";
import TestimonialSection from "./TestimonialSection";
import { useRef } from "react";

const HomePageLanding = () => {
  const homeRef = useRef();
  const facilityRef = useRef();
  const roomRef = useRef();
  const contactRef = useRef();

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <LandingPageLayout classNameFooter="-mt-80 md:-mt-80 lg:-mt-80" onClickHome={() => scrollToRef(homeRef)} onClickFacility={() => scrollToRef(facilityRef)} onClickRoom={() => scrollToRef(roomRef)} onClickContact={() => scrollToRef(contactRef)}>
      <div ref={homeRef}/>
      <div className="flex flex-col justify-center items-center">
        <div className="bgHome  pb-6 h-full  md:h-[500px] lg:h-[935px] rounded-[24px] md:rounded-[48px] m-2 -mt-[70px] md:m-4 md:-mt-24 lg:-mt-24">
          <HeroSection  />
        </div>
        <div ref={facilityRef}/>
        <FacilitySection  />
        <div className="bgFacility mt-20 h-[220px] w-full" />
        <div ref={roomRef} className="bgRoom mt-8 h-[1000px] w-full">
          <div className="w-full flex flex-col justify-center items-center h-full gap-24 mt-[500px] md:mt-56 lg:mt-4">
            <h1
              className="text-neutral-900 text-3xl md:text-4xl lg:text-5xl font-semibold"
              data-aos="fade-down"
              data-aos-duration="900"
              data-aos-easing="ease-out-quad"
            >
              Pilihan Kamar
            </h1>
            <div className="max-w-screen-xl flex flex-wrap gap-8  justify-center items-center">
              <RoomSection />
            </div>
          </div>
        </div>
        <div className="w-full h-screen md:h-[550px] lg:h-5 bg-[#FAF8FB]" />
        <div className="w-full h-[1200px] md:h-[1000px] py-80 md:py-20 lg:py-16 mb-28 bg-[#FAF8FB]">
          <h1
            className="text-neutral-900 text-3xl text-center md:text-4xl lg:text-5xl font-semibold mb-24"
            data-aos="fade-down"
            data-aos-duration="900"
            data-aos-easing="ease-out-quad"
          >
            Kata Mereka
          </h1>
          <TestimonialSection />
        </div>
      </div>
      <div ref={contactRef} className="flex flex-col justify-center items-center"/>   
    </LandingPageLayout>
  );
};

export default HomePageLanding;
