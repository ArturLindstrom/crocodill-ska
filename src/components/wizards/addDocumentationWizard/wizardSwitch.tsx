import { Card, CardContent } from "@/components/ui/card";
import AddDocumentationName from "./documentationName";
import AddCriterias from "./criterias";
import AddStudents from "./students";
import AddTeacher from "./teacher";
import AddPreschool from "./preschool";
import AddReview from "./review";
import AddMonth from "./month";

type WizardSwitchProps = {
  currentStep: number;
  handleNext: () => void;
  handlePrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const WizardSwitch = ({ currentStep, handleNext }: WizardSwitchProps) => {
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
        return <AddReview />;
      default:
        return <></>;
    }
  };

  return (
    <Card className="flex flex-col items-center p-20 m-10">
      <CardContent>{renderSwitch()}</CardContent>
    </Card>
  );
};

export default WizardSwitch;
