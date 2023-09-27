import { RiMenu3Fill } from "react-icons/ri";
import ButtonPrimary from "../../Elements/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `sticky ${isSticky ? 'bg-neutral-25 shadow-sm' : ''} top-0 navbar flex justify-between py-4 px-4 mx-auto md:px-10 lg:px-24 md:mt-6 z-10`;
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
      <div className="flex justify-center items-center">
        <div className=" gap-2 hidden  md:flex">
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
        <div className="dropdown dropdown-end text-right w-full">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <RiMenu3Fill size={24} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
          </label>
          <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-60 mt-4">
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
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;


