/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { forwardRef, useRef, useState } from "react";
import LandingPageLayout from "../../../Layouts/LandingPageLayout";
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
import OccupantInformation from "./OccupantInformation";
import ButtonPrimary from "../../../Elements/Button";
import InputField from "../../../Elements/Input";
import { AiOutlineInfoCircle } from "react-icons/ai";
import RequirementDocument from "./RequirementDocument";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { axiosInstance } from "../../../../lib/axios";

const steps = [
  { description: "Ajukan sewa" },
  { description: "Pemilik menyetujui" },
  { description: "Bayar sewa pertama" },
  { description: "Check-in" },
];

const RentApplication = forwardRef((props, ref) => {
  const token = Cookies.get("token");
  const id = ref.current;
  const navigate = useNavigate();
  const contactRef = useRef();
  const [priceRoom, setPriceRoom] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [tambahanPenyewa, setTambahanPenyewa] = useState(1);

  const { data } = useQuery({
    queryKey: ["getRent", id],
    queryFn: async () => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
      const getRent = await axiosInstance.get(`/rent-stage-1?id=${id}`, {
        headers: headers
      })
      return getRent
    },
    onSuccess: (data) => {
      console.log(data?.data)
      setPriceRoom(data?.data.total_payment)
      setDeposit(data?.data.classroom?.deposit)
    },
    onError: (data) => {
      console.log(data)
    }
  })

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  const totalPayment = () => {
    if(tambahanPenyewa === 2){
      return priceRoom + deposit + 300000
    } else {
      return priceRoom + deposit
    }
  }


  return (
    <LandingPageLayout classNameFooter={"mt-32 md:mt-40"} onClickHome={() => {navigate("/")}} onClickFacility={() => {navigate("/")}} onClickRoom={() => {navigate("/")}} onClickContact={() => {scrollToRef(contactRef)}}>
      <div className="flex flex-col gap-12 mt-8 lg:mt-20 w-full px-8 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5 flex flex-col gap-12">
          <div className="flex flex-col gap-10">
            <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold">
              Pengajuan Sewa
            </h1>
            <div className="flex justify-start items-start w-full">
              {statusSteps()}
            </div>
          </div>
          <OccupantInformation />
          <div className="divider -my-3" />
          <div className="flex flex-col gap-6">
            <h1 className="text-neutral-800 text-lg md:text-xl lg:text-2xl font-semibold">
              Jumlah Penyewa
            </h1>
            <div className="flex gap-4">
              <ButtonPrimary
                className={`w-32 text-base  ${
                  tambahanPenyewa === 1
                    ? " "
                    : "bg-primary-50 text-primary-500 hover:bg-primary-300 hover:text-primary-50 active:text-neutral-25 active:bg-primary-400"
                }`}
                onClick={() => setTambahanPenyewa(1)}
              >
                1 Orang
              </ButtonPrimary>
              <ButtonPrimary
                className={`w-32 text-base  ${
                  tambahanPenyewa === 2
                    ? " "
                    : "bg-primary-50 text-primary-500 hover:bg-primary-300 hover:text-primary-50 active:text-neutral-25 active:bg-primary-400"
                }`}
                onClick={() => setTambahanPenyewa(2)}
              >
                2 Orang
              </ButtonPrimary>
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                type="text"
                disabled={tambahanPenyewa === 1 ? true : false}
                label="Nama penyewa tambahan"
                name="additional_occupant"
                classNameLabel="md:text-lg"
                placeholder="Masukkan nama penyewa tambahan"
              />
            </div>
            <div className="flex gap-4">
              <AiOutlineInfoCircle size={24} className="text-info-600" />
              <p className="text-neutral-600 text-base">
                Menambah orang dapat dikenakan biaya tambahan{" "}
                <span className="text-neutral-800 font-semibold">
                  Rp 300.000
                </span>
              </p>
            </div>
          </div>
          <div className="divider -my-3" />
          <RequirementDocument/>
          <div className="divider -my-3" />
        </div>

        {/* Detail Harga */}
        <div className="lg:sticky lg:top-28 top-12 w-full lg:w-2/5 lg:flex flex-col h-full border border-neutral-100 rounded-3xl bg-neutral-25 shadow-lg py-6 px-6">
          <div className="flex w-full gap-4">
            <div className="w-2/5 h-28 bg-cover bg-center rounded-xl overflow-hidden bg-primary-50">
            <img src="https://informa.co.id/files/uploads/inspirationarticle/thumb_image/2020/Apr/20/5e9d566c1a263/kamar-tidur-nyaman0-770x770.jpg" className="h-full w-full aspect-video object-cover object-center rounded-xl" />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-neutral-800 text-lg font-semibold">{data?.data.classroom?.name}</h1>
              <p className="text-neutral-600 text-base">ukuran</p>
              <p className="text-neutral-600 text-base">lantai {data?.data.room?.floor} nomor {data?.data.room?.number_room}</p>
            </div>
          </div>
          <div className="divider" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-neutral-800 font-semibold">Tanggal mulai kos</h1>
              <p className="text-neutral-700 font-medium">{data?.data.start_date}</p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-neutral-800 font-semibold">Jangka pembayaran</h1>
              <p className="text-neutral-700 font-medium">{data?.data.payment_term}</p>
            </div>
            <h1 className="text-neutral-800 text-lg font-semibold mt-4 mb-2">Rincian pembayaran pertama</h1>
            <div className="flex justify-between">
              <h1 className="text-neutral-700 font-medium">Biaya sewa kos</h1>
              <p className="text-neutral-800 text-lg font-semibold">{rupiahFormatter(data?.data.total_payment)}</p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-neutral-700 font-medium">Deposit</h1>
              <p className="text-neutral-800 text-lg font-semibold">{rupiahFormatter(data?.data.classroom?.deposit)}</p>
            </div>
            {tambahanPenyewa === 2 ? (<div className="flex justify-between">
              <h1 className="text-neutral-700 font-medium">Tambahan penghuni</h1>
              <p className="text-neutral-800 text-lg font-semibold">{rupiahFormatter(300000)}</p>
            </div>): null}
          </div>
          <div className="divider" />
            <div className="flex justify-between">
              <h1 className="text-neutral-700 text-lg font-medium">Total pembayaran</h1>
              <p className="text-neutral-800 text-xl font-semibold">{rupiahFormatter(totalPayment())}</p>
            </div>
        </div>
      </div>
          <ButtonPrimary className="text-lg font-medium w-full lg:w-[58%] ">Ajukan Sewa</ButtonPrimary>
      </div>
      <div ref={contactRef}/>
    </LandingPageLayout>
  );
});

function statusSteps() {
  const { activeStep } = useSteps({
    index: 1,
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
        {steps.map((step, index) => (
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

export default RentApplication;
