import LandingPageLayout from "../../Layouts/LandingPageLayout";
import ErrorSection from "./ErrorSection";
import "./Footer.css";

const NotFoundPage = () => {
  return (
    <LandingPageLayout>
      <ErrorSection />
    </LandingPageLayout>
  );
};

export default NotFoundPage;
