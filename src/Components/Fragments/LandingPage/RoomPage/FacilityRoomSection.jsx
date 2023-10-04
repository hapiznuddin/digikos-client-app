/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { MdOutlineDesk } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { useFacilityPage } from "../../../../features/landingPage/roomPage/useFacilityPage";

const FacilityRoomSection = forwardRef((props, ref) => {
const id = ref.current
  const {data} = useFacilityPage({
    id,
    onError: (data) => {
      console.log(data);
    }
  })
  
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">Fasilitas</h1>
      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-48 lg:gap-56">
        <div className="flex flex-col gap-8">
          {data?.data.ac === 1 ? (
            <div className="flex gap-4">
              <TbAirConditioning size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">AC</p>
            </div>
          ) : null}
          {data?.data.kasur === 1 ? (
            <div className="flex gap-4">
              <IoBedOutline size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">Kasur</p>
            </div>
          ) : null}
          {data?.data.lemari === 1 ? (
            <div className="flex gap-4">
              {LemariIcon()}
              <p className="text-neutral-700 text-lg lg:text-xl">Lemari</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-8">
          {data?.data.wifi === 1 ? (
            <div className="flex gap-4">
              <FaWifi size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">WiFi</p>
            </div>
          ) : null}
          {data?.data.meja === 1 ? (
            <div className="flex gap-4">
              <MdOutlineDesk size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">Meja</p>
            </div>
          ) : null}
          {data?.data.km_luar === 1 ? (
            <div className="flex gap-4">
              <LiaBathSolid size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">Kamar Mandi Luar</p>
            </div>
          ) : null}
          {data?.data.km_dalam === 1 ? (
            <div className="flex gap-4">
              <LiaBathSolid size={32} />
              <p className="text-neutral-700 text-lg lg:text-xl">Kamar Mandi Dalam</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
})
export default FacilityRoomSection;

export function LemariIcon() {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1783_15156)">
        <path
          d="M23.9987 3.16797C24.6715 3.16776 25.3195 3.42184 25.8128 3.8793C26.3061 4.33675 26.6082 4.96376 26.6587 5.63464L26.6654 5.83464V27.168C26.6656 27.8407 26.4115 28.4887 25.954 28.982C25.4966 29.4753 24.8696 29.7775 24.1987 29.828L23.9987 29.8346H7.9987C7.32593 29.8348 6.67794 29.5808 6.18463 29.1233C5.69133 28.6659 5.38916 28.0388 5.3387 27.368L5.33203 27.168V5.83464C5.33182 5.16187 5.58591 4.51388 6.04336 4.02057C6.50081 3.52726 7.12782 3.22509 7.7987 3.17464L7.9987 3.16797H23.9987ZM23.9987 23.8346H17.332V27.168H23.9987V23.8346ZM14.6654 5.83464H7.9987V27.168H14.6654V5.83464ZM23.9987 17.8346H17.332V21.168H23.9987V17.8346ZM11.9987 15.168C12.3385 15.1683 12.6654 15.2985 12.9125 15.5318C13.1596 15.7651 13.3083 16.0839 13.3283 16.4232C13.3482 16.7624 13.2378 17.0965 13.0197 17.3571C12.8016 17.6177 12.4922 17.7852 12.1547 17.8253L11.9987 17.8346H10.6654C10.3255 17.8343 9.99865 17.7041 9.75154 17.4708C9.50443 17.2375 9.35572 16.9187 9.3358 16.5794C9.31589 16.2402 9.42626 15.9061 9.64438 15.6455C9.8625 15.3849 10.1719 15.2174 10.5094 15.1773L10.6654 15.168H11.9987ZM23.9987 11.8346H17.332V15.168H23.9987V11.8346ZM23.9987 5.83464H17.332V9.16797H23.9987V5.83464Z"
          fill="#121926"
        />
      </g>
      <defs>
        <clipPath id="clip0_1783_15156">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
