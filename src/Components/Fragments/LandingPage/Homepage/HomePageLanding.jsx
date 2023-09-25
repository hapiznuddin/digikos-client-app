import Navbar from "../../../Layouts/LandingPageLayout/Navbar";
import HeroSection from "./HeroSection";
import "./HomePage.css";

const HomePageLanding = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bgHome w-full pb-6 h-full md:h-[500px] lg:h-screen rounded-[24px] md:rounded-[48px] m-2 md:m-6">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
};

export default HomePageLanding;
