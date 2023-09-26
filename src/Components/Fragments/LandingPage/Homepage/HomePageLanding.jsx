import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import HeroSection from "./HeroSection";
import FacilitySection from "./FacilitySection";
import "./HomePage.css";

const HomePageLanding = () => {
  return (
    <LandingPageLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="bgHome  pb-6 h-full md:h-[500px] lg:h-[935px] rounded-[24px] md:rounded-[48px] m-2 -mt-[70px] md:m-4 md:-mt-24 lg:-mt-24">
          <HeroSection />
        </div>
        <FacilitySection />
        <div className="bgFacility mt-20 h-[190px] w-full"/>
        <div className="bgRoom mt-8 h-[1000px] w-full" />
        <div className="w-full h-5 bg-[#FAF8FB]"/>
      </div>
    </LandingPageLayout>
  );
};

export default HomePageLanding;
