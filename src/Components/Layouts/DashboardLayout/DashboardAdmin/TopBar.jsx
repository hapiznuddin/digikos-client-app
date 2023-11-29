import { BiMenu } from "react-icons/bi";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useGetProfilePic } from "../../../../services/landingPage/userPage/useGetProfilePic";
import { useEffect, useState } from "react";
import PictureProfile from "../../../Templates/LandingPage/UserPage/ProfilePage/PictureProfile";
import { useGetUser } from "../../../../services/auth/useGetUser";
import ButtonPrimary from "../../../Elements/Button";
import ChangePasswordModal from "../../../Templates/Dashboard/Admin/DahsboardHome/ChangePasswordModal";
// import { DataNameEmailApi } from "../../../services/authApi.services";
// import { useEffect, useState } from "react";

export default function TopBar({ showNav, setShowNav, title }) {
  const name = Cookies.get("name");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const [img, setImg] = useState(false);

  TopBar.propTypes = {
    showNav: PropTypes.bool,
    setShowNav: PropTypes.func,
    title: PropTypes.string,
  };

  const { data } = useGetProfilePic({
    token,
    onSuccess: () => {},
    onError: (data) => {
      console.log(data);
    },
  });

  const imgProfilePic = `${import.meta.env.VITE_DIGIKOS_URL}${data?.data.path}`;
  useEffect(() => {
    if (data?.data.path === undefined) {
      setImg(false);
    } else {
      setImg(true);
    }
  }, [data]);

  const { data: user } = useGetUser({
    token,
  });

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("id-ID", options);
  };

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
        <div className="flex items-center justify-center mr-4 md:mr-12">
          <div className="dropdown dropdown-end relative inline-block text-left pr-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost inline-flex w-full justify-center gap-4 items-center rounded-full"
            >
              <div className="avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={
                      img
                        ? imgProfilePic
                        : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                    }
                  />
                </div>
              </div>

              <span className="hidden md:block text-lg font-medium text-gray-800 ">
                {name}
              </span>
            </div>
            <div className="dropdown-content z-[1] menu flex flex-col justify-center items-center p-8 mt-2 shadow bg-base-100 rounded-box w-80">
              <PictureProfile classNameImg="w-16 h-16 lg:w-24 lg:h-24" />
              <h1 className="text-neutral-800 text-lg font-medium mt-4">
                {user?.data.name}
              </h1>
              <p className="text-neutral-700 text-sm mt-1">
                {user?.data.email}
              </p>
              <div className="flex justify-between w-full mt-4">
                <p>Terdaftar</p>
                <p>{dateFormat(user?.data.created_at)}</p>
              </div>
              <div className="divider -my-0.5" />
              <div className="flex justify-between w-full">
                <p>Role</p>
                <p>{role}</p>
              </div>
              <ButtonPrimary
                className="mt-4 btn-sm text-sm font-normal"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Ubah Password
              </ButtonPrimary>
              <dialog id="my_modal_4" className="modal">
                <ChangePasswordModal/>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
