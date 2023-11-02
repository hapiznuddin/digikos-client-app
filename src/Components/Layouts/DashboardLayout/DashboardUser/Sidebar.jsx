/* eslint-disable no-unused-vars */
import {  forwardRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
// import './UserLayout.css';
import { useLogout } from "../../../../services/auth/useLogout";
import { TbMail, TbTable } from "react-icons/tb";


const SideBar = forwardRef(({showNav}, ref) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const location = useLocation();
  
  SideBar.propTypes = {
    showNav: PropTypes.bool,
  };
  
  const {mutate} = useLogout({
    token,
    onSuccess: (data) => {
      console.log(data?.data.message);
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("name");
      navigate("/");
    },
  })

  const logout = () => {
    mutate();
  }


  return (
    <div ref={ref} className="fixed w-60 h-full bg-neutral-25 drop-shadow-md z-10">
      <div className="flex justify-center mt-6 mb-14">
        <img src="/digikos.png" className="w-32" />
      </div>

      <div className="flex flex-col h-[85%] justify-between">
        <div className="flex flex-col gap-1 h-full">
          <h1 className="text-neutral-800 text-lg font-medium px-4 mb-2">Main Menu</h1>
        <button>
        <Link to="/user/dashboard">
          <div
            className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-2 flex items-center transition-colors ${
              location.pathname == "/user/dashboard"
                ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600 "
            }`}
          >
            <div className="mr-2">
              <AiOutlineUser size={24} />
            </div>
            <div>
              <p>Profil</p>
            </div>
          </div>
        </Link>
        </button>
        <button>
        <Link to="/dashboard/">
          <div
            className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname == "/dashboard/"
              ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
            }`}
          >
            <div className="mr-2">
              <TbTable size={24}  />
            </div>
            <div>
              <p>Data Penghuni</p>
            </div>
          </div>
        </Link>
        </button>
        <button>
        <Link to="/dashboard/">
          <div
            className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname == "/dashboard/"
              ? "bg-primary-500 text-neutral-25 shadow-md border-2 border-neutral-25"
                : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
            }`}
          >
            <div className="mr-2">
              <TbMail size={24} />
            </div>
            <div>
              <p>Kirim Pesan</p>
            </div>
          </div>
        </Link>
        </button>
        </div>
          <button onClick={logout}>
          <div
            className={`px-3 py-3 mx-3 text-base font-medium rounded-full cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname == "/login"
              ? "bg-primary-500 text-neutral-25"
                : "text-neutral-800 hover:bg-primary-500 hover:text-neutral-25 active:bg-primary-600"
            }`}
          >
            <div className="mr-2">
              <FiLogOut size={24} />
            </div>
            <div>
              <p>Logout</p>
            </div>
          </div>
          </button>
      </div>
          <p className="text-gray-700 text-xs mx-5 mt-4 font-light">
              
            </p>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;