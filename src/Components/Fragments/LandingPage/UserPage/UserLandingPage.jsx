import { FaRegUserCircle } from "react-icons/fa"
import { CgNotes } from "react-icons/cg"
import LandingPageLayout from "../../../Layouts/LandingPageLayout"
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import PropTypes from "prop-types";

const UserLayoutPage = ({ children }) => {
  UserLayoutPage.propTypes = {
    children: PropTypes.node,
  }
  const navigate = useNavigate();
  const contactRef = useRef();
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <LandingPageLayout  classNameFooter={"mt-32 md:mt-40"} onClickHome={() => {navigate("/")}} onClickFacility={() => {navigate("/")}} onClickRoom={() => {navigate("/")}} onClickContact={() => {scrollToRef(contactRef)}}>
      <div className="flex gap-8 mt-8 lg:mt-20 w-full px-8 md:max-w-screen-lg lg:max-w-screen-xl mx-auto ">
        <div className="w-full md:w-96 lg:w-[500px] flex flex-col gap-12 ">
        <button className="btn btn-ghost normal-case justify-start rounded-full text-sm font-normal lg:text-lg lg:font-medium hover:bg-primary-50">
          <FaRegUserCircle className="text-2xl"/>
          Profil
          </button>
          <div className="divider -my-8"/>
        <button className="btn btn-ghost normal-case justify-start rounded-full text-sm font-normal lg:text-lg lg:font-medium hover:bg-primary-50">
          <CgNotes className="text-2xl lg:text-2xl"/>
          Riwayat Pengajuan Sewa
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-12 rounded-2xl border-2 border-neutral-200">
          {children}
        </div>
        </div>
        <div ref={contactRef}/>
    </LandingPageLayout>
  )
}


export default UserLayoutPage