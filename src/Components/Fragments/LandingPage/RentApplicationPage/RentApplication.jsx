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

const steps = [
  { description: "Ajukan sewa" },
  { description: "Pemilik menyetujui" },
  { description: "Bayar sewa pertama" },
  { description: "Check-in" },
];

const RentApplication = forwardRef((props, ref) => {
  const id = ref.current;
  const navigate = useNavigate();
  const contactRef = useRef();
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [tambahanPenyewa, setTambahanPenyewa] = useState(1);


  return (
    <LandingPageLayout classNameFooter={"mt-32 md:mt-40"} onClickHome={() => {navigate("/")}} onClickFacility={() => {navigate("/")}} onClickRoom={() => {navigate("/")}} onClickContact={() => {scrollToRef(contactRef)}}>
      <div className="flex gap-12 mt-8 lg:mt-20 w-full px-8 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
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
                  Rp300.000
                </span>
              </p>
            </div>
          </div>
          <div className="divider -my-3" />
          <RequirementDocument/>
          <div className="divider -my-3" />
          <ButtonPrimary className="text-lg font-medium">Ajukan Sewa</ButtonPrimary>
        </div>

        {/* Detail Harga */}
        <div className="lg:sticky lg:top-28 top-12 w-2/5 hidden lg:flex flex-col h-96 bg-primary-300"></div>
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
