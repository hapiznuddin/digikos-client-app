/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Skeleton } from "@chakra-ui/react";
import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import { useDetailRoomPage } from "../../../../features/landingPage/roomPage/useDetailRoomPage";
import ImageRoomSection from "./ImageRoomSection";
import { PiCubeLight } from "react-icons/pi";

const DetailRoom = forwardRef((props, ref) => {
  const id = ref.current;

  const { data: room, isLoading: loadingRoom } = useDetailRoomPage({
    id,
    onError: (room) => {
      console.log(room);
    },
  });

  return (
    <LandingPageLayout>
      <div className=" flex flex-col gap-2 mt-8 lg:mt-20 w-full px-8 md:max-w-screen-md lg:max-w-screen-xl mx-auto ">
        <div className="flex justify-between items-center">
          {loadingRoom ? (
            <Skeleton>
              <h1 className="text-neutral-800 lg:text-3xl font-semibold">
                {room?.data.room_name}
              </h1>
            </Skeleton>
          ) : (
            <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold">
              {room?.data.room_name}
            </h1>
          )}
          <div className="flex gap-1 items-center justify-center">
            <p className="text-neutral-800 md:text-2xl font-semibold">4.5</p>
            <AiFillStar className="text-secondary-500 text-2xl lg:text-3xl" />
            <p className="text-neutral-800 md:text-xl font-semibold">(120)</p>
          </div>
        </div>
        <ImageRoomSection ref={ref} />
        <div className="flex mt-12 gap-8 w-full">
          <div className="flex flex-col gap-6 w-3/5">
            <div className="flex flex-col gap-6">
              <h1 className="text-neutral-800 text-3xl font-semibold">
                Deskripsi Kamar
              </h1>
              <p className="text-neutral-600 text-base">
                {room?.data.room_description}
              </p>
            </div>
            <div className="divider " />
            <div className="flex flex-col gap-10">
                <h1 className="text-neutral-800 text-3xl font-semibold">
                  Spesifikasi tipe kamar
                </h1>
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <PiCubeLight size={32} />
                  <p className="text-neutral-700 text-xl">
                    {room?.data.room_size}
                  </p>
                </div>
                <div className="flex gap-4">
                  {PepiconsPencilElectricityCircleOff()}
                  <p className="text-neutral-700 text-xl">
                    Tidak termasuk listrik
                  </p>
                </div>
              </div>
            </div>
            <div className="divider " />
            <div className="flex flex-col gap-10">
              <h1 className="text-neutral-800 text-3xl font-semibold">Fasilitas</h1>
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <PiCubeLight size={32} />
                  <p className="text-neutral-700 text-xl">
                    {room?.data.room_size}
                  </p>
                </div>
                <div className="flex gap-4">
                  {PepiconsPencilElectricityCircleOff()}
                  <p className="text-neutral-700 text-xl">
                    Tidak termasuk listrik
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* //* Form Booking */}
          <div className="flex flex-col gap-6 w-2/5 h-96 bg-primary-50"></div>
        </div>
      </div>
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
