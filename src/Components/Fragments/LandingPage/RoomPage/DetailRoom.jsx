/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Skeleton } from "@chakra-ui/react";
import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import { useDetailRoomPage } from "../../../../features/landingPage/roomPage/useDetailRoomPage";
import ImageRoomSection from "./ImageRoomSection";
import { PiCubeLight } from "react-icons/pi";
import FacilityRoomSection from "./FacilityRoomSection";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import InputPengajuan from "./InputPengajuan";
import { useNavigate } from "react-router-dom";

const DetailRoom = forwardRef((props, ref) => {
  const id = ref.current;
  const navigate = useNavigate();
  const contactRef = useRef();
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const rupiahFormatter = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const { data: room, isLoading: loadingRoom } = useDetailRoomPage({
    id,
    onError: (room) => {
      console.log(room);
    },
  });

  return (
    <LandingPageLayout classNameFooter={"mt-32 md:mt-40"} onClickHome={() => {navigate("/")}} onClickFacility={() => {navigate("/")}} onClickRoom={() => {navigate("/")}} onClickContact={() => {scrollToRef(contactRef)}}>
      <div className=" flex flex-col gap-2 mt-8 lg:mt-20 w-full px-8 md:max-w-screen-md lg:max-w-screen-xl mx-auto ">
        <div className="flex justify-between items-center">
          {loadingRoom ? (
            <Skeleton w={"200px"} h={"30px"}/>
          ) : (
            <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold">
              {room?.data.room_name}
            </h1>
          )}
          <div className="flex gap-1 items-center justify-center">
            <p className="text-neutral-800 md:text-2xl font-semibold">4.5</p>
            <AiFillStar className="text-secondary-500 text-2xl lg:text-3xl" />
            <p className="text-neutral-800 md:text-xl font-semibold">(12)</p>
          </div>
        </div>
        <ImageRoomSection ref={ref} />
        <div className="flex mt-12 gap-8 w-full">
          <div className="flex flex-col gap-6 w-full lg:w-3/5">
            <div className="flex flex-col gap-6">
              <h1 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">
                Deskripsi Kamar
              </h1>
              <p className="text-neutral-600 text-sm lg:text-base">
                {room?.data.room_description}
              </p>
            </div>
            <div className="divider " />
            <div className="flex flex-col gap-10">
              <h1 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">
                Spesifikasi tipe kamar
              </h1>
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <PiCubeLight size={32} />
                  <p className="text-neutral-700 text-lg lg:text-xl">
                    {room?.data.room_size}
                  </p>
                </div>
                <div className="flex gap-4">
                  {PepiconsPencilElectricityCircleOff()}
                  <p className="text-neutral-700 text-lg lg:text-xl">
                    Tidak termasuk listrik
                  </p>
                </div>
              </div>
            </div>
            <div className="divider " />
            <FacilityRoomSection ref={ref} />
            <div className="divider " />
            <div className="flex flex-col gap-10">
              <h1 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">
                Peraturan Kamar
              </h1>
              <div className="flex flex-col gap-8">
                <div className="flex gap-4 items-center">
                  <PiCubeLight size={32} />
                  <p className="text-neutral-700 text-lg lg:text-xl">
                    Kamar ini diisi maksimal 2 orang
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                      <FaRegMoneyBillAlt size={32} />
                      <p className="text-neutral-700 font-semibold text-lg lg:text-xl">
                        Deposit
                      </p>
                    </div>
                    <p className="text-neutral-700 font-semibold text-lg lg:text-xl">
                      {rupiahFormatter(room?.data.room_deposite)}
                    </p>
                  </div>
                  <p className="text-neutral-600 text-sm md:text-base pl-12">
                    Dikembalikan diakhir periode sewa jika tidak ditemukan
                    kerusakan pada kamar.
                  </p>
                </div>
              </div>
            </div>
            <div className="divider " />
            <div className="flex flex-col gap-10 mb-32">
              <div className="flex gap-4 items-center justify-start">
                <div className="flex gap-1 items-center justify-start">
                  <AiFillStar className="text-secondary-500 text-3xl md:text-4xl" />
                  <p className="text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-semibold">
                    4.5
                  </p>
                </div>
                <p className="text-neutral-800 text-xl  lg:text-3xl font-semibold">
                  (12 review)
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full bg-neutral-200">
                        <IoPersonCircleOutline
                          size={64}
                          className="text-neutral-600"
                        />
                        {/* <img src="" className="bg-primary-100" /> */}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h1 className="text-neutral-800 text-xl font-semibold">
                        Reviewer
                      </h1>
                      <p className="text-neutral-600 text-sm">Lantai 1 no 10</p>
                      <p className="text-neutral-600 text-xs">6/10/2023</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-start">
                    <AiFillStar className="text-secondary-500 text-2xl " />
                    <p className="text-secondary-500 text-2xl font-semibold">
                      4.5
                    </p>
                  </div>
                </div>
                <div className="flex text-sm md:text-base text-neutral-600">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, velit. At nisi rem consequuntur vel consectetur sunt rerum omnis cupiditate ea vitae ab facere</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full bg-neutral-200">
                        <IoPersonCircleOutline
                          size={64}
                          className="text-neutral-600"
                        />
                        {/* <img src="" className="bg-primary-100" /> */}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h1 className="text-neutral-800 text-xl font-semibold">
                        Reviewer
                      </h1>
                      <p className="text-neutral-600 text-sm">Lantai 1 no 10</p>
                      <p className="text-neutral-600 text-xs">6/10/2023</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center justify-start">
                    <AiFillStar className="text-secondary-500 text-2xl " />
                    <p className="text-secondary-500 text-2xl font-semibold">
                      4.5
                    </p>
                  </div>
                </div>
                <div className="flex text-sm md:text-base text-neutral-600">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, velit. At nisi rem consequuntur vel consectetur sunt rerum omnis cupiditate ea vitae ab facere</p>
                </div>
              </div>
            </div>
          </div>

          {/* //* Form Booking */}
          <InputPengajuan hargaKamar={room?.data.room_price} idKamar={room?.data.id}/>
        </div>
      </div>
      <div ref={contactRef}/>
    </LandingPageLayout>
  );
});

export default DetailRoom;

export function PepiconsPencilElectricityCircleOff(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 26 26"
      {...props}
    >
      <g fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 11.5h-3.813l2.273-5.303A.5.5 0 0 0 16 5.5h-5a.5.5 0 0 0-.46.303l-3 7A.5.5 0 0 0 8 13.5h2.474l-2.938 7.314c-.2.497.417.918.807.55l5.024-4.743l4.958-4.241A.5.5 0 0 0 18 11.5Zm-4.571 1h3.217l-3.948 3.378l-3.385 3.195l2.365-5.887a.5.5 0 0 0-.464-.686H8.758l2.572-6h3.912l-2.273 5.303a.5.5 0 0 0 .46.697Z"
          clipRule="evenodd"
        ></path>
        <path d="M4.15 4.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727L4.151 4.878Z"></path>
        <path
          fillRule="evenodd"
          d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5Zm0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5Z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}
