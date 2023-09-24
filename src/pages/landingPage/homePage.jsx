import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import HomePageLanding from "../../Components/Fragments/LandingPage/Homepage/HomePageLanding";

const HomePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Beranda | Digikos</title>
      </Helmet>
      <div>
        <HomePageLanding />
      </div>
    </HelmetProvider>
  );
}

export default HomePage