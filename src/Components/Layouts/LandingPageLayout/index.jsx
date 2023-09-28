import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const LandingPageLayout = ({ children, classNameFooter }) => {
  LandingPageLayout.propTypes = {
    children: PropTypes.node,
    classNameFooter: PropTypes.string,
  };
  return (
    <div>
      <Navbar />
      {children}
      <Footer classNameFooter={classNameFooter} />
    </div>
  );
};

export default LandingPageLayout;
