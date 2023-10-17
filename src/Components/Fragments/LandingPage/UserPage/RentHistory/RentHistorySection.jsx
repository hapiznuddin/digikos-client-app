/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import UserLayoutPage from "../UserLandingPage";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ButtonPrimary from "../../../../Elements/Button";
import Cookies from "js-cookie";
import { useGetRentHistory } from "../../../../../services/landingPage/userPage/useGetRentHistory";

const steps = [
  { description: "Ajukan sewa" },
  { description: "Pemilik menyetujui" },
  { description: "Bayar sewa pertama" },
  { description: "Check-in" },
];

const RentHistorySection = () => {
  const token = Cookies.get("token");
  const [collapsed, setCollapsed] = useState(true);

  const {data} = useGetRentHistory({
    token,    
    onError:  (data) => {
      console.log(data)
    }
  })

  // Fungsi untuk mengubah format tanggal
function formatDate(inputDate) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dateParts = inputDate.split('-');
  if (dateParts.length === 3) {
    const [year, month, day] = dateParts;
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  }
  return inputDate; // Kembalikan format asli jika tidak valid
}

const rupiahFormatter = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}


  return (
    <UserLayoutPage>
      <div className="w-full  mx-auto flex flex-col gap-8 py-8 px-4">
        <h1 className="text-neutral-800 text-lg  lg:text-xl font-semibold">
          Riwayat Pengajuan Sewa
        </h1>
        {data?.data.map((rent, index) => {
          const imgRoom = `${import.meta.env.VITE_DIGIKOS_URL}${rent.room_image?.path}`
          const dateString = rent.start_date; // rent.start_date adalah tanggal dalam format "yyyy-mm-dd"
          const formattedDate = formatDate(dateString);
        return (
        <div key={index} className="flex flex-col gap-8 border rounded-xl shadow-md p-4 md:p-6">
          <div className="flex flex-col">
            <div className="badge bg-warning-200 text-warning-700">{rent.status}</div>
            <div className="divider" />
            <div className="flex flex-col md:flex-row w-full gap-4 ">
              <div className="w-full h-32 md:w-60 lg:w-60 md:h-32 bg-cover bg-center rounded-xl overflow-hidden">
                <img
                  src={imgRoom}
                  className="h-full w-full aspect-video object-cover object-center rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-neutral-800 text-base md:text-lg font-semibold">
                  {rent.classroom?.name}
                </h1>
                <p className="text-neutral-600 text-sm md:text-base">{rent.classroom?.size}</p>
                <p className="text-neutral-600 text-sm md:text-base">
                  lantai {rent.room?.floor} nomor {rent.room?.number_room}
                </p>
                <p className="text-neutral-600 text-sm md:text-base">
                  Tanggal masuk{" "}
                  <span className="text-neutral-800 font-medium">
                    {formattedDate}
                  </span>
                </p>
                <p className="text-neutral-600 text-sm md:text-base">
                  <span className="text-neutral-800 font-semibold">
                    {rupiahFormatter(rent.total_price)}
                  </span>
                  /{rent.payment_term}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start w-full">
            {statusSteps(rent.status_id)}
          </div>
          <div className={`flex flex-col gap-6 overflow-hidden transition-max-h duration-500 ease-in-out ${collapsed ? 'max-h-0' : 'max-h-screen'}`}>
            <div className="divider -my-2" />
            <div className="flex flex-col">
              <h1 className="text-neutral-800 lg:text-lg font-semibold mb-5">
                Data Penyewa
              </h1>
              <div className="flex justify-between mb-4">
                <p className="text-neutral-600 text-sm md:text-base">Nama</p>
                <p className="text-neutral-700 text-sm md:text-base font-medium">
                {rent.occupant?.name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-neutral-600 text-sm md:text-base">
                  No Handphone
                </p>
                <p className="text-neutral-700 text-sm md:text-base font-medium">
                {rent.occupant?.phone}
                </p>
              </div>
              {rent.additional_occupant ? (<div className="flex justify-between mt-4">
                <p className="text-neutral-600 text-sm md:text-base">
                  Tambahan penghuni
                </p>
                <p className="text-neutral-700 text-sm md:text-base font-medium">
                {rent.additional_occupant}
                </p>
              </div>) : null}
            </div>
            <div className="divider -my-2" />
            <div className="flex flex-col">
              <h1 className="text-neutral-800 lg:text-lg font-semibold mb-5">
                Rincian pembayaran pertama
              </h1>
              <div className="flex justify-between mb-4">
                <p className="text-neutral-600 text-sm md:text-base">
                  Biaya sewa kos
                </p>
                <p className="text-neutral-800 text-sm md:text-base font-semibold">
                {rupiahFormatter(rent.total_price)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-neutral-600 text-sm md:text-base">Deposit</p>
                <p className="text-neutral-800 text-sm md:text-base font-semibold">
                {rupiahFormatter(rent.classroom?.deposit)}
                </p>
              </div>
              {rent.additional_occupant ? (<div className="flex justify-between mt-4">
                <p className="text-neutral-600 text-sm md:text-base">
                  Tambahan penghuni
                </p>
                <p className="text-neutral-800 text-sm md:text-base font-semibold">
                {rupiahFormatter(300000)}
                </p>
              </div>):null}
            </div>
            <div className="divider -my-2" />
            <div className="flex justify-between">
              <p className="text-neutral-800 text-sm md:text-base lg:text-lg font-semibold">
                Total Pembayaran
              </p>
              <p className="text-neutral-800 text-base md:text-lg lg:text-xl font-semibold">
              {rupiahFormatter(rent.total_payment)}
              </p>
            </div>
            </div>
            <div className="divider -my-4" />
              <div className="flex gap-1 justify-center w-full hover:underline text-primary-500">
              <button onClick={() => setCollapsed(!collapsed)} className="font-medium text-sm md:text-base">{collapsed ? "Lihat lebih banyak" : "Lihat lebih sedikit"}</button>
              {collapsed ? (<BiChevronDown size={24} />) : (<BiChevronUp size={24} />)}
              </div>
            <div className="divider -my-4" />
            <ButtonPrimary className="text-sm md:text-lg font-medium" disabled={`${rent.status_id === 2 ? 'disabled': ''}`} >Bayar Sekarang</ButtonPrimary>
        </div>)})}
      </div>
    </UserLayoutPage>
  );
};

function statusSteps(status) {
  const statusId = () => {
    if (status < 4) {
      return status - 1
    } else {
      return status
    }
  }
  const { activeStep } = useSteps({
    index: statusId,
    count: steps.length,
  });

  return (
    <Box className="w-full lg:px-4">
      <Stepper
        index={activeStep}
        gap="0"
        colorScheme="purple"
        className="md:px-4 lg:px-8 mb-2"
      >
        {steps.map((index) => (
          <Step key={index} gap="0">
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index}>
            <p className="text-neutral-700 text-xs lg:text-base">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default RentHistorySection;
