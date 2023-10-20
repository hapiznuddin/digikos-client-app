import { Box, Step, StepIcon, StepIndicator, StepSeparator, StepStatus, Stepper, useSteps } from "@chakra-ui/react";
import PropTypes from "prop-types";

const steps = [
  { description: "Ajukan sewa" },
  { description: "Pemilik menyetujui" },
  { description: "Bayar sewa pertama" },
  { description: "Check-in" },
];

const StepperComponent = ({status}) => {
  StepperComponent.propTypes = {
    status: PropTypes.number,    
  }
  const statusId = () => {
    if (status <= 4) {
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


export default StepperComponent