import Footer from "./Footer"
import Navbar from "./Navbar"
import PropTypes from "prop-types";


const LandingPageLayout = ({children}) => {
  LandingPageLayout.propTypes = {
    children: PropTypes.node
  }
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default LandingPageLayout