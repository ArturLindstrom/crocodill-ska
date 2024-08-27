import Heading from "@/components/typography/headings";
import PreschoolLayout from "@/layouts/preschoolLayout";

import { useParams } from "react-router-dom";

const Preschool = () => {
  const { name } = useParams();
  const nameAggregated = () => {
    switch (name) {
      case "ilcrocodill":
        return "Il Crocodill";
      case "entillcrocodill":
        return "Entill Crocodill";
      case "lillcrocodill":
        return "Lill Crocodill";
      case "afcrocodill":
        return "Af Crocodill";
      default:
        return "Unknown";
    }
  };
  return (
    <>
      <Heading.H1>{nameAggregated()}</Heading.H1>
      <PreschoolLayout />
    </>
  );
};

export default Preschool;
