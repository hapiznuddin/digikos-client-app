import { useState, useEffect, Fragment} from "react";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import SideBar from "./Sidebar";
import TopBar from "./TopBar";


export default function AdminLayout({ children, classNameBG, title }) {
  AdminLayout.propTypes = {
    title: PropTypes.string,
    classNameBG : PropTypes.string,
    children: PropTypes.node
  };

  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 840) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <div className="bg-neutral-50 h-screen">
      <TopBar showNav={showNav} setShowNav={setShowNav} title={title} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav}/>
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className={`px-4 md:px-12 pb-12 pt-8 ${classNameBG}`}>
            {children}
        </div>
      </main>
    </div>
  );
}