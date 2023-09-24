import Navbar from "../../../Layouts/LandingPageLayout/Navbar";
import HeroSection from "./HeroSection";
import "./HomePage.css";

const HomePageLanding = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bgHome w-full rounded-[24px] md:rounded-[48px] m-2 md:m-6">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
};

export default HomePageLanding;
