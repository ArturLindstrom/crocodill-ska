import { useAllPreschools } from "@/api/preschools";
import { useDocumentationStore } from "@/store/documentations";
import Loader from "@/components/loader";
import AddPreschoolForm from "./addPreschoolForm";

type AddPreschoolProps = {
  nextStep: () => void;
};

const AddPreschool = ({ nextStep }: AddPreschoolProps) => {
  const { data, isLoading, error } = useAllPreschools();
  const setPreschoolAndDepartment = useDocumentationStore(
    (state) => state.setInstitution
  );

  const handleSubmit = (
    preschoolId: number,
    preschoolName: string,
    departmentId: number,
    departmentName: string
  ) => {
    setPreschoolAndDepartment({
      preschoolId,
      preschoolName,
      departmentId,
      departmentName,
    });
    nextStep();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error fetching preschools: {error.message}</div>;
  }
  if (!data) {
    return <div>No preschools found</div>;
  }
  return (
    <div>
      <AddPreschoolForm onSubmit={handleSubmit} preschools={data} />
    </div>
  );
};

export default AddPreschool;
