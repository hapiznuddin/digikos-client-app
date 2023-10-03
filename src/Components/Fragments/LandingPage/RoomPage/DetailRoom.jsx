/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { Skeleton } from "@chakra-ui/react";
import LandingPageLayout from "../../../Layouts/LandingPageLayout";
import { useDetailRoomPage } from "../../../../features/landingPage/roomPage/useDetailRoomPage";
import ImageRoomSection from "./ImageRoomSection";

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
      <div className=" flex flex-col gap-2 mt-20 w-full px-8 md:max-w-screen-md lg:max-w-screen-xl mx-auto ">
        <div className="flex justify-between items-center">
          {loadingRoom ? (
            <Skeleton>
              <h1 className="text-neutral-800 text-3xl font-semibold">
                {room?.data.room_name}
              </h1>
            </Skeleton>
          ) : (
            <h1 className="text-neutral-800 text-3xl font-semibold">
              {room?.data.room_name}
            </h1>
          )}
          <div className="flex gap-1">
            <p className="text-neutral-800 md:text-2xl font-semibold">4.5</p>
            <AiFillStar size={32} className="text-secondary-500" />
            <p className="text-neutral-800 md:text-xl font-semibold">(120)</p>
          </div>
        </div>
          <ImageRoomSection ref={ref}/>
      </div>
    </LandingPageLayout>
  );
});

export default DetailRoom;
