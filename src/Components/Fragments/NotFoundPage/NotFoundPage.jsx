import Navbar from "../../Layouts/LandingPageLayout/Navbar";
import ErrorSection from "./ErrorSection";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import "./Footer.css";

const NotFoundPage = () => {
  return (
    <div>
      <Navbar />
      <ErrorSection />
      <footer className="mt-28 flex flex-col justify-center items-center">
        <div className="bgFooter h-[250px] w-full" />
        <div className="bg-secondary-500 w-full h-full flex py-20 px-4 md:px-10 lg:px-28">
          <div className="flex flex-col justify-center gap-8 w-1/5">
            <img src="/digikos.png" className="w-24 aspect-auto lg:w-[250px]" />
            <p className="text-lg font-medium">
              Temukan Hunian Kost Modern, Mudah, dan Aman di Digikos!
            </p>
          </div>
          <div className="flex flex-col justify-center gap-8 w-1/5">
            <div>
            <IoLocationSharp/>
            <p className="text-lg font-medium">
              Jl. U Raya No.9a, RT.9/RW.15, Palmerah, Kec. Palmerah, Kota
              Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480
            </p>
            </div>
            <div>
            <FaPhoneAlt/>
            <p className="text-lg font-medium">085621157325</p>
            </div>
            <div>
            <HiMail/>
            <p className="text-lg font-medium">busurrukunmandiri@gmail.com</p>
            </div>
          </div>
          <div></div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
