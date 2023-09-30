import { useRoomLandingpage } from "../../../../features/landingPage/useRoomLandingpage";
import { AiFillStar } from "react-icons/ai";
import ButtonPrimary from "../../../Elements/Button";
import "aos/dist/aos.css";
import { SkeletonLandingPage } from "../../../Elements/Skeleton/SkeletonLandingPage";

const RoomSection = () => {
  const rupiahFormatter = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const { data, isLoading } = useRoomLandingpage();

  return (
    <>
      {isLoading
        ? new Array(data?.data.length || 3).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`} className="skeleton">
              <SkeletonLandingPage />
            </div>
          ))
        : data?.data.map((room) => {
            const imageRoom = `${import.meta.env.VITE_DIGIKOS_URL}${
              room.first_image_room?.path
            }`;
            return (
              <div
                key={room.id}
                className="card w-2/3 md:w-[40%] lg:w-[30%] rounded-3xl bg-base-100 shadow-xl"
                data-aos="zoom-in-up"
                data-aos-duration="900"
                data-aos-easing="ease-out-quad"
                data-aos-delay="200"
              >
                <figure className="overflow-hidden w-full">
                  <img
                    src={imageRoom}
                    alt="Foto Kamar"
                    className="bg-cover bg-center"
                  />
                </figure>
                <div className="flex flex-col w-full py-5 px-8 gap-4 ">
                  <div className="flex flex-col gap-2 w-full ">
                    <h2 className="font-bold text-xl">{room.room_name}</h2>
                    <p className="overflow-hidden max-h-12 text-xs line-clamp-3">
                      {room.room_description}
                    </p>
                  </div>
                  <div className="card-actions w-full flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-1 justify-between items-center w-full">
                      <div className="flex items-center">
                        <p className="text-neutral-800 font-bold md:text-xl">
                          {rupiahFormatter(room.room_price)}
                        </p>
                        <p className="text-sm font-regular text-neutral-700">
                          /bulan
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <p className="text-neutral-800 md:text-lg font-semibold">
                          4.5
                        </p>
                        <AiFillStar size={24} className="text-secondary-500" />
                      </div>
                    </div>
                    <ButtonPrimary className="w-">Lihat Kamar</ButtonPrimary>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default RoomSection;
