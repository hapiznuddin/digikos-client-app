import { FaPhoneAlt } from "react-icons/fa"
import { HiMail } from "react-icons/hi"
import { IoLocationSharp } from "react-icons/io5"
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="mt-28 flex flex-col justify-center items-center">
        <div className="bgFooter h-[280px] w-full" />
        <div className=" bg-secondary-500 flex flex-col justify-center items-center w-full -mt-1">
          <div className="bg-secondary-500 w-full h-full justify-center items-start flex flex-col lg:flex-row py-10 lg:py-20 gap-12 lg:gap-20 px-16 ">
            <div className="flex flex-col justify-center items-center lg:items-start gap-4 lg:gap-8 w-full lg:w-96">
              <img
                src="/digikos.png"
                className="w-48 aspect-auto lg:w-[250px]"
              />
              <p className="text-lg font-medium text-center lg:text-left">
                Temukan Hunian Kost Modern, Mudah, dan Aman di Digikos!
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:gap-8 w-full lg:w-96 text-neutral-800">
              <div className="flex justify-start items-start gap-2 ">
                <IoLocationSharp size={24} className=" min-w-max " />
                <p className="text-base lg:text-lg font-medium">
                  Jl. U Raya No.9a, RT.9/RW.15, Palmerah, Kec. Palmerah, Kota
                  Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480
                </p>
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <FaPhoneAlt size={24} className=" min-w-max " />
                <p className="text-base lg:text-lg font-medium">085621157325</p>
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <HiMail size={24} className=" min-w-max " />
                <p className="text-base lg:text-lg font-medium">
                  busurrukunmandiri@gmail.com
                </p>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.80838326405126!2d106.78357289873605!3d-6.201949427382473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6c3406e2b75%3A0x6e1998b744c1ca7a!2sJl.%20U%20Raya%20No.9a%2C%20RT.9%2FRW.15%2C%20Palmerah%2C%20Kec.%20Palmerah%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011480!5e0!3m2!1sid!2sid!4v1695701454011!5m2!1sid!2sid"
                width={"100%"}
                height="320"
                style={{ border: 0, borderRadius: "16px" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
            <div className="pb-4 lg:pb-8 text-base text-neutral-800 font-medium">
              <p> ©copyright - Digikos 2023.</p>
            </div>
        </div>
      </footer>
  )
}

export default Footer