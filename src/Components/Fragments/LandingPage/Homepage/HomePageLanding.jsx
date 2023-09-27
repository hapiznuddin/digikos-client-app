import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import HeroSection from "./HeroSection";
import FacilitySection from "./FacilitySection";
import RoomSection from "./RoomSection";
import "./HomePage.css";
import "aos/dist/aos.css";

const HomePageLanding = () => {
  return (
    <LandingPageLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="bgHome  pb-6 h-full md:h-[500px] lg:h-[935px] rounded-[24px] md:rounded-[48px] m-2 -mt-[70px] md:m-4 md:-mt-24 lg:-mt-24">
          <HeroSection />
        </div>
        <FacilitySection />
        <div className="bgFacility mt-20 h-[190px] w-full" />
        <div className="bgRoom mt-8 h-[1000px] w-full">
          <div className="w-full flex flex-col justify-center items-center h-full gap-24">
            <h1
              className="text-neutral-900 text-3xl md:text-4xl lg:text-5xl font-semibold"
              data-aos="fade-down"
              data-aos-duration="900"
              data-aos-easing="ease-out-quad"
            >
              Pilihan Kamar
            </h1>
            <div className="w-full flex flex-wrap gap-10 justify-center items-center">
              <RoomSection />
            </div>
          </div>
        </div>
        <div className="w-full h-5 bg-[#FAF8FB]" />
      </div>
    </LandingPageLayout>
  );
};

export default HomePageLanding;
