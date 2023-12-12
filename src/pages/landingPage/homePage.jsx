import {HelmetProvider } from "react-helmet-async";
import HeadMetaData from "../../Components/HeadMetaData";
import { useEffect, useState } from "react";
import ButtonPrimary from "../../Components/Elements/Button";
import { HiChevronDoubleUp } from "react-icons/hi";
import Cookies from "js-cookie";
import HomePageLanding from "../../Components/Templates/LandingPage/Homepage/HomePageLanding";

const HomePage = () => {
  const role = Cookies.get("role");
  const [onTop, setOnTop] = useState(false);
  useEffect(() => {
    // Fungsi untuk memeriksa posisi scroll
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setOnTop(true);
      } else {
        setOnTop(false);
      }
    };
    // Menambahkan event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll);
    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (role === "Admin" || role === "Owner") {
      window.location.href = "/admin/dashboard";
    }
  }, [ role ]);

  const scrollToTop = () => {
    window.scrollTo(0, 0, { behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
        <HeadMetaData title="Beranda"/>
      <div>
        <HomePageLanding />
      </div>
      <div className="fixed bottom-10 right-5 md:bottom-4 md:right-4">
        <ButtonPrimary className='px-2 shadow-2xl' onClick={scrollToTop} disabled={onTop}>
          <HiChevronDoubleUp size={32}/>
        </ButtonPrimary>
      </div>
    </HelmetProvider>
  );
}

export default HomePage