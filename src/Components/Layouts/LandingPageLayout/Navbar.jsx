import { RiMenu3Fill } from "react-icons/ri";
import ButtonPrimary from "../../Elements/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineUser } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

// const token = Cookies.get("token");
const role = Cookies.get("role");

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (role === "User") {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
  } top-0 navbar flex justify-between py-4 px-4 mx-auto md:px-10 lg:px-24 md:mt-6 z-10`;
  return (
    <motion.div
      className={navbarClasses}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "circOut" }}
    >
      <div className="w-fit">
        <img src="/digikos.png" className="w-24 aspect-auto lg:w-[200px]" />
      </div>
      <div className="hidden md:flex justify-center items-center w-full">
        <ul className="menu menu-horizontal text-base lg:text-xl text-neutral-800 font-medium">
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">
              Beranda
            </a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">
              Fasilitas
            </a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">
              Kamar
            </a>
          </li>
          <li>
            <a className="rounded-full hover:bg-primary-50 hover:text-primary-500">
              Kontak
            </a>
          </li>
          {/* <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
      <div className="flex justify-center items-center w-64 ">
        {isLogin ? (
          <div className="dropdown dropdown-end">
            <div className="hidden md:flex gap-2 justify-center items-center w-full px-2 ">
              <button
                className="btn btn-ghost  m-1 rounded-full text-base font-medium normal-case  hover:bg-primary-50/50"
                tabIndex={0}
              >
                <div className="avatar">
                  <div className="w-9 rounded-full">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
                  </div>
                </div>
                <p className="text-base font-medium">Nama User</p>
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 gap-2 shadow-md bg-neutral-25 rounded-box w-64 flex flex-col justify-between"
            >
              <li className="text-base">
                <a>
                  <AiOutlineUser size={24} />
                  <p>Profil</p>
                </a>
              </li>
              <li className="text-base">
                <a>
                  <RxDashboard size={24} />
                  <p>Dashboard</p>
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className=" gap-2 hidden md:flex bg-primary-600">
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
        <div className="dropdown dropdown-end text-right w-full md:hidden">
          <label tabIndex={0} className="btn m-1 btn-ghost md:hidden">
            <RiMenu3Fill size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-60 mt-4"
          >
            <li>
              <a className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500">
                Beranda
              </a>
            </li>
            <li>
              <a className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500">
                Fasilitas
              </a>
            </li>
            <li>
              <a className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500">
                Kamar
              </a>
            </li>
            <li>
              <a className="rounded-full text-base font-medium hover:bg-primary-50 hover:text-primary-500">
                Kontak
              </a>
            </li>
            <div className="divider w-full -my-1"></div>
            {isLogin ? (
              <ul className="menu w-full rounded-box flex">
                <li>
                  <details open>
                    <summary className="rounded-full">
                      <div className=" m-1 rounded-full flex gap-2 justify-start items-center text-base font-medium normal-case w-full">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img src="https:images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
                          </div>
                        </div>
                        <p className="text-base font-medium">Nama User</p>
                      </div>
                    </summary>
                    <ul>
                      <li className="text-base">
                        <a>
                          <AiOutlineUser size={24} />
                          <p>Profil</p>
                        </a>
                      </li>
                      <li className="text-base">
                        <a>
                          <RxDashboard size={24} />
                          <p>Dashboard</p>
                        </a>
                      </li>
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
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
