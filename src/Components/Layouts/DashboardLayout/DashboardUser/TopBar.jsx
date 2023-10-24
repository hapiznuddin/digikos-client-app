import { BiMenu } from "react-icons/bi";
import { Menu } from "@headlessui/react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useGetProfilePic } from "../../../../services/landingPage/userPage/useGetProfilePic";
// import { DataNameEmailApi } from "../../../services/authApi.services";
// import { useEffect, useState } from "react";


export default function TopBar({ showNav, setShowNav, title }) {
  // const [name, setName] = useState({});
  const name = Cookies.get("name");
  const token = Cookies.get("token");

  TopBar.propTypes = {
    showNav: PropTypes.bool,
    setShowNav : PropTypes.func,
    title: PropTypes.string
  };
  
  const { data } = useGetProfilePic({
    token,
    onSuccess: () => {},
    onError: (data) => {
      console.log(data);
    },
  });

  const imgProfilePic = `${import.meta.env.VITE_DIGIKOS_URL}${data?.data.path}`;

  return (
    <>
    <div
      className={`fixed w-full bg-slate-50/30 backdrop-blur shadow-sm h-16 flex justify-between items-center transition-all duration-[400ms] z-10 ${
        showNav ? "pl-56" : ""
      }`}
    ></div>
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all z-10 duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="flex items-center gap-4 pl-4 md:pl-12 ">
        <BiMenu
          className="h-8 w-8 text-gray-700 cursor-pointer rounded-full hover:bg-blue-100"
          onClick={() => setShowNav(!showNav)}
        />
        <h1 className="md:text-xl font-semibold text-gray-600">{title}</h1>
      </div>
      <div className="flex items-center pr-4 md:pr-12">
        <Menu as="div" className="relative inline-block text-left pr-3">
          <div>
            <div className="inline-flex w-full justify-center gap-4 items-center">
            <div className="avatar">
                      <div className="w-9 rounded-full">
                        <img
                          src= {imgProfilePic ? imgProfilePic : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
                        />
                      </div>
                    </div>
                
              <span className="hidden md:block text-lg font-medium text-gray-800 ">
              {name}
              </span>
              {/* <AiOutlineUser className="ml-2 h-4 w-4 text-gray-700" /> */}
            </div>
          </div>
        </Menu>
      </div>
    </div>
    </>
  );
}