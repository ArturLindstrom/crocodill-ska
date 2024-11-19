import { Card } from "@/components/ui/card";
import AddDocumentationName from "./documentationName";
import AddCriterias from "./criterias";
import AddStudents from "./students";
import AddTeacher from "./teacher";
import AddPreschool from "./preschool";
import AddReview from "./review";
import AddMonth from "./month";
import { Button } from "@/components/ui/button";

type WizardSwitchProps = {
  currentStep: number;
  handleNext: () => void;
  handlePrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const WizardSwitch = ({
  currentStep,
  handleNext,
  handlePrevious,
  isFirstStep,
  isLastStep,
}: WizardSwitchProps) => {
  const renderSwitch = () => {
    switch (currentStep) {
      case 1:
        return <AddDocumentationName nextStep={handleNext} />;
      case 2:
        return <AddMonth nextStep={handleNext} />;
      case 3:
        return <AddStudents nextStep={handleNext} />;
      case 4:
        return <AddCriterias nextStep={handleNext} />;
      case 5:
        return <AddTeacher nextStep={handleNext} />;
      case 6:
        return <AddPreschool nextStep={handleNext} />;
      case 7:
        return <AddReview nextStep={handleNext} />;
      default:
        return <></>;
    }
  };

  return (
    <Card className="flex flex-col items-center p-20">
      <div className="flex justify-between w-full mt-4">
        <Button onClick={handlePrevious} disabled={isFirstStep}>
          Previous
        </Button>
        {renderSwitch()}
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </Card>
  );
};

export default WizardSwitch;
