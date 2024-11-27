import { useDocumentationStore } from "@/store/documentations";
import Loader from "@/components/loader";
import AddMonthForm from "./addMonthForm";
import { useGetTermsWithMonths } from "@/api/terms/termQueries";

type AddMonthProps = {
  nextStep: () => void;
};

const AddMonth = ({ nextStep }: AddMonthProps) => {
  const { data, error, isLoading } = useGetTermsWithMonths();

  const setMonth = useDocumentationStore((state) => state.setMonth);
  const setTerm = useDocumentationStore((state) => state.setTerm);

  const handleSubmit = (
    monthId: number,
    monthName: string,
    termId: number,
    termName: string
  ) => {
    setMonth({
      monthId,
      monthName,
    });
    setTerm({
      termId,
      termName,
    });
    nextStep();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error fetching months: {error.message}</div>;
  }
  if (!data?.data) {
    return <div>No terms found</div>;
  }

  return <AddMonthForm onSubmit={handleSubmit} terms={data.data} />;
};

export default AddMonth;
