import Footer from "../../Layouts/LandingPageLayout/Footer";
import Navbar from "../../Layouts/LandingPageLayout/Navbar";
import ErrorSection from "./ErrorSection";
import "./Footer.css";

const NotFoundPage = () => {
  return (
    <div>
      <Navbar />
      <ErrorSection />
      <Footer/>
    </div>
  );
};

export default NotFoundPage;
