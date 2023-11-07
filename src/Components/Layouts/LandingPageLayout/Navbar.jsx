import { RiMenu3Fill } from "react-icons/ri";
import ButtonPrimary from "../../Elements/Button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { useGetProfilePic } from "../../../services/landingPage/userPage/useGetProfilePic";
import { useLogout } from "../../../services/auth/useLogout";
import { useGetRentHistory } from "../../../services/landingPage/userPage/useGetRentHistory";
import Swal from "sweetalert2";

const Navbar = ({
  onClickHome,
  onClickFacility,
  onClickRoom,
  onClickContact,
}) => {
  Navbar.propTypes = {
    onClickHome: PropTypes.func,
    onClickFacility: PropTypes.func,
    onClickRoom: PropTypes.func,
    onClickContact: PropTypes.func,
  };

  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const name = Cookies.get("name");
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [img, setImg] = useState(false);
  // const [status, setStatus] = useState(null);

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

  const { mutate, isLoading, isSuccess } = useLogout({
    token,
    onSuccess: (data) => {
      console.log(data?.data.message);
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("name");
      navigate("/");
    },
    onError: (data) => {
      // Cookies.remove("token");
      // Cookies.remove("role");
      // Cookies.remove("name");
      setIsLogin(false);
      navigate("/");
      console.log(data);
    },
  });
  const logout = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsLogin(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (role === "User") {
      setIsLogin(true);
    }
  }, [role]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `sticky ${
    isSticky ? "bg-neutral-25 shadow-sm" : ""
  } top-0 navbar flex justify-between py-4 px-4 mx-auto md:px-10 lg:px-24 md:mt-6 z-20`;

  const { data: statusData } = useGetRentHistory({
    token,
    onError: (data) => {
      console.log(data);
    },
  });

  return (
    <motion.div
      className={navbarClasses}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "circOut" }}
    >
      <div className="w-fit">
        <Link to={"/"}>
          <img
            src="/digikos.png"
            className="w-24 aspect-auto md:w-48 lg:w-[200px]"
          />
        </Link>
      </div>
      <div className="hidden md:flex justify-center items-center w-full">
        <ul className="menu menu-horizontal text-base lg:text-xl text-neutral-800 font-medium">
          <li>
            <a
              onClick={onClickHome}
              className="rounded-full hover:bg-primary-50 hover:text-primary-500"
            >
              Beranda
            </a>
          </li>
          <li>
            <a
              onClick={onClickFacility}
              className="rounded-full hover:bg-primary-50 hover:text-primary-500"
            >
              Fasilitas
            </a>
          </li>
          <li>
            <a
              onClick={onClickRoom}
              className="rounded-full hover:bg-primary-50 hover:text-primary-500"
            >
              Kamar
            </a>
          </li>
          <li>
            <a
              onClick={onClickContact}
              className="rounded-full hover:bg-primary-50 hover:text-primary-500"
            >
              Kontak
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center w-64 ">
        {isLoading ? (
          <div className="hidden md:flex gap-2 items-center">
            {/* <Skeleton w={"40"} h={"12"} /> */}

            <span className="loading loading-infinity w-14 bg-primary-500"></span>
          </div>
        ) : (
          <>
            {isLogin ? (
              <div className="dropdown dropdown-end">
                <div className="hidden md:flex gap-2 justify-center items-center w-full px-2 ">
                  <button
                    className="btn btn-ghost  m-1 rounded-full text-base font-medium normal-case  hover:bg-primary-50/50"
                    tabIndex={0}
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
                    <p className="text-base font-medium">{name}</p>
                  </button>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 gap-2 shadow-md bg-neutral-25 rounded-box w-64 flex flex-col justify-between"
                >
                  <li className="text-base font-medium">
                    <Link to={"/user/profil"}>
                      <AiOutlineUser size={24} />
                      <p>Profil</p>
                    </Link>
                  </li>
                  <li className="text-base font-medium">
                    {statusData?.data[0]?.status_id === 5  ? (
                      <Link to={"/user/dashboard"}>
                        <RxDashboard size={24} />
                        <p>Dashboard</p>
                      </Link>
                    ) : (
                      <button onClick={() => Swal.fire({
                        title: 'Gagal',
                        text: "Silahkan Selesaikan Pembayaran dan Check In Dahulu Untuk Buka Dashboard",
                        icon: 'error',
                        showConfirmButton: true
                      })}>
                        <RxDashboard size={24} />
                        <p>Dashboard</p>
                      </button>
                    )}
                  </li>
                  <div className="divider w-full my-1 px-2" />
                  <button
                    className="btn flex gap-2 justify-center items-center rounded-full normal-case hover:bg-primary-100 hover:text-primary-500 text-base"
                    onClick={logout}
                  >
                    <FiLogOut size={24} />
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              <div className=" gap-2 hidden md:flex">
                <ButtonPrimary
                  onClick={() => navigate("/login")}
                  className="w-20 text-sm lg:w-24 lg:text-lg bg-primary-50 text-primary-500 shadow-none hover:bg-primary-100 active:bg-primary-100"
                >
                  Login
                </ButtonPrimary>
                <ButtonPrimary
                  onClick={() => navigate("/register")}
                  className="w-20 text-sm lg:w-24 lg:text-lg shadow-none"
                >
                  Daftar
                </ButtonPrimary>
              </div>
            )}
          </>
        )}
        <div className="dropdown dropdown-end text-right w-full md:hidden">
          <label tabIndex={0} className="btn m-1 btn-ghost md:hidden">
            <RiMenu3Fill size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-60 mt-4"
          >
            <li>
              <a
                onClick={onClickHome}
                className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                onClick={onClickFacility}
                className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500"
              >
                Fasilitas
              </a>
            </li>
            <li>
              <a
                onClick={onClickRoom}
                className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500"
              >
                Kamar
              </a>
            </li>
            <li>
              <a
                onClick={onClickContact}
                className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500"
              >
                Kontak
              </a>
            </li>
            <div className="divider w-full my-1 px-4" />
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <SkeletonCircle size="10" w={10} />
                <Skeleton w={"20"} h={"5"} />
              </div>
            ) : (
              <>
                {isLogin ? (
                  <ul className="menu w-full rounded-box flex">
                    <li>
                      <details>
                        <summary className="rounded-full">
                          <div className=" m-1 rounded-full flex gap-2 justify-start items-center text-base font-medium normal-case w-full">
                            <div className="avatar">
                              <div className="w-8 rounded-full">
                                <img
                                  src={
                                    img
                                      ? imgProfilePic
                                      : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                                  }
                                />
                              </div>
                            </div>
                            <p className="text-base font-medium">{name}</p>
                          </div>
                        </summary>
                        <ul>
                          <li className="text-base">
                            <Link to={"/user/profil"}>
                              <AiOutlineUser size={24} />
                              <p>Profil</p>
                            </Link>
                          </li>
                          <li className="text-base">
                            {statusData?.data[0]?.status_id === 5 ? (
                              <Link to={"/user/dashboard"}>
                                <RxDashboard size={24} />
                                <p>Dashboard</p>
                              </Link>
                            ) : (
                              <button onClick={() => Swal.fire({
                                title: 'Gagal',
                                text: "Silahkan Selesaikan Pembayaran dan Check In Dahulu Untuk Buka Dashboard",
                                icon: 'error',
                                showConfirmButton: true
                              })}>
                                <RxDashboard size={24} />
                                <p>Dashboard</p>
                              </button>
                            )}
                          </li>
                          <div className="divider w-full my-1 px-2" />
                          <button className="btn flex gap-2 justify-center w-full items-center rounded-full normal-case hover:bg-primary-100 hover:text-primary-500 text-base">
                            <FiLogOut size={24} />
                            Logout
                          </button>
                        </ul>
                      </details>
                    </li>
                  </ul>
                ) : (
                  <div className="flex justify-between gap-1 w-full mt-4">
                    <ButtonPrimary
                      onClick={() => navigate("/login")}
                      className="w-[110px] text-base btn- bg-primary-50 text-primary-500 shadow-none hover:bg-primary-100 active:bg-primary-100"
                    >
                      Login
                    </ButtonPrimary>
                    <ButtonPrimary
                      onClick={() => navigate("/register")}
                      className="w-[110px] text-base btn- shadow-none"
                    >
                      Daftar
                    </ButtonPrimary>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
