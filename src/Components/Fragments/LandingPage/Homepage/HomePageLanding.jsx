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
        <div className="mt-20">
          <img src="/bg-facility.webp" />
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default HomePageLanding;
