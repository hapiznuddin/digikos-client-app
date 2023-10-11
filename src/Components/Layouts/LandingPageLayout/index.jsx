import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const LandingPageLayout = ({ children, classNameFooter, onClickHome, onClickFacility, onClickRoom, onClickContact }) => {
  LandingPageLayout.propTypes = {
    children: PropTypes.node,
    classNameFooter: PropTypes.string,
    onClickHome: PropTypes.func,
    onClickFacility: PropTypes.func,
    onClickRoom: PropTypes.func,
    onClickContact: PropTypes.func,
  };
  return (
    <div>
      <Navbar onClickHome={onClickHome} onClickFacility={onClickFacility} onClickRoom={onClickRoom} onClickContact={onClickContact} />
      {children}
      <Footer classNameFooter={classNameFooter} />
    </div>
  );
};

export default LandingPageLayout;
