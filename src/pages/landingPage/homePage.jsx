import {HelmetProvider } from "react-helmet-async";
import HomePageLanding from "../../Components/Fragments/LandingPage/Homepage/HomePageLanding";
import HeadMetaData from "../../Components/HeadMetaData";

const HomePage = () => {
  return (
    <HelmetProvider>
        <HeadMetaData title="Beranda"/>
      <div>
        <HomePageLanding />
      </div>
    </HelmetProvider>
  );
}

export default HomePage