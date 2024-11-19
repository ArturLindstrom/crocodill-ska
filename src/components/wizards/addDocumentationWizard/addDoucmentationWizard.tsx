import { useState } from "react";
import Bullets from "@/components/bullets";
import WizardSwitch from "./wizardSwitch";

const AddDocumentationWizard = () => {
  const FIRST_PAGE = 1;
  const LAST_PAGE = 7;
  const [currentStep, setCurrentStep] = useState(FIRST_PAGE);

  const handleNext = () => {
    if (currentStep < LAST_PAGE) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > FIRST_PAGE) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <WizardSwitch
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        isFirstStep={currentStep === FIRST_PAGE}
        isLastStep={currentStep === LAST_PAGE}
      />
      <Bullets currentStep={currentStep} amount={LAST_PAGE} />
    </div>
  );
};

export default AddDocumentationWizard;
