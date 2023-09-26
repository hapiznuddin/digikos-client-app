import AOS from "aos"
import 'aos/dist/aos.css';
import { useEffect } from "react"
import { BiCheckShield } from "react-icons/bi"
import { FaWifi } from "react-icons/fa"
import { LiaBathSolid } from "react-icons/lia"
import { MdOutlineDryCleaning } from "react-icons/md"
import { TbAirConditioning } from "react-icons/tb"

const FacilitySection = () => {
  useEffect(() => {
    AOS.init({once: true});
  }, [])
  return (
    <div className="flex flex-col justify-center items-center mt-20 lg:mt-36 gap-8 md:gap-10 lg:gap-14 w-full md:w-10/12 lg:w-6/12">
    <div >
      <h1 className="text-neutral-900 text-3xl md:text-4xl lg:text-5xl font-semibold"
      data-aos="fade-down" data-aos-duration="500" data-aos-easing="ease-out-quad"
      >
        Fasilitas Kost
      </h1>
    </div>
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-right" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="400"
      >
        <LiaBathSolid size={32} />
        Kamar Mandi Luar/Dalam
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-right" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="200"
      >
        <BiCheckShield size={32} />
        Keamanan 24 Jam
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-left" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="200"
      
      >
        <MdOutlineDryCleaning size={32} />
        Ruang Jemur
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-right" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="700"
      
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
            <path
              fill="currentColor"
              d="M18.41 3.287a1 1 0 0 1-.233 1.395l-2.101 1.501a1.965 1.965 0 0 0-.762 2.089l3.343-3.343a1 1 0 1 1 1.414 1.414l-3.343 3.343a1.965 1.965 0 0 0 2.089-.762l1.501-2.101a1 1 0 0 1 1.627 1.162l-1.5 2.102a3.967 3.967 0 0 1-5.234 1.116L12.914 13.5l4.157 4.157a1 1 0 0 1-1.414 1.414L11.5 14.914l-4.157 4.157a1 1 0 1 1-1.414-1.414l4.157-4.157l-1.61-1.61c-.463.25-1.017.44-1.606.509a3.891 3.891 0 0 1-3.278-1.15C2.663 10.319 2.132 9.15 2 8.027c-.13-1.105.12-2.289.93-3.098c.809-.81 1.992-1.06 3.097-.93c1.123.133 2.293.664 3.222 1.593a3.891 3.891 0 0 1 1.15 3.278a4.503 4.503 0 0 1-.51 1.605l1.611 1.61l2.297-2.296a3.967 3.967 0 0 1 1.116-5.233l2.102-1.501a1 1 0 0 1 1.395.232ZM3.986 7.793c.08.68.411 1.433 1.02 2.041c.522.522 1.099.64 1.631.578c.58-.068 1.056-.348 1.242-.533c.186-.186.465-.662.533-1.242c.063-.533-.055-1.11-.577-1.631c-.61-.609-1.362-.94-2.042-1.02c-.698-.082-1.199.106-1.45.357c-.25.251-.439.751-.357 1.45Z"
            ></path>
          </g>
        </svg>
        Kantin
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-right" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="600"
      >
        <FaWifi size={32} />
        WiFi
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-left" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="600"
      
      >
        <TbAirConditioning size={32} />
        AC
      </div>
      <div className="badge badge-lg py-6 px-8 bg-primary-400 text-neutral-25 text-lg font-medium gap-3"
      data-aos="fade-left" data-aos-duration="900" data-aos-easing="ease-out-quad" data-aos-delay="800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 20 20"
        >
          <g fill="currentColor">
            <path d="M12.75 12.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-3.5 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"></path>
            <path
              fillRule="evenodd"
              d="M10 8a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7Zm0-5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z"
              clipRule="evenodd"
            ></path>
            <path d="M10 14a2 2 0 0 1 2 2v1.5a2 2 0 1 1-4 0V16a2 2 0 0 1 2-2Z"></path>
            <path
              fillRule="evenodd"
              d="M15 11a5 5 0 0 0-10 0v2.5A2.5 2.5 0 0 0 7.5 16h5a2.5 2.5 0 0 0 2.5-2.5V11Zm-8 0a3 3 0 0 1 6 0v2.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V11Z"
              clipRule="evenodd"
            ></path>
            <path d="M15.5 4.5a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2h-2Zm-13 0a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2h-2Z"></path>
            <path d="m3.41 4.046l.476-1.455l4.524.863l-.477 1.456l-4.523-.864Zm8.18-.592l.477 1.456l4.523-.864l-.476-1.455l-4.524.863Z"></path>
          </g>
        </svg>
        Parkir
      </div>
    </div>
  </div>
  )
}

export default FacilitySection