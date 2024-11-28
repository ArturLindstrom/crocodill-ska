import { useDocumentationStore } from "@/store/documentations";
import AddStudentsForm from "./addStudentsForm";
import { useStudentsQuery } from "@/api/queries/students/useStudentQueries";
import Loader from "@/components/loader";

type AddStudentsProps = {
  nextStep: () => void;
};
const AddStudents = ({ nextStep }: AddStudentsProps) => {
  const { data, isLoading, error } = useStudentsQuery();
  const setStudentIds = useDocumentationStore((state) => state.setStudentIds);
  const setStudents = useDocumentationStore((state) => state.setStudents);
  const existingStudentIds = useDocumentationStore((state) => state.studentIds);

  const addStudents = (studentIds: number[]) => {
    const selectedStudents =
      data?.students.filter((s) => studentIds.includes(s.student_id)) || [];
    setStudents(selectedStudents);
    setStudentIds(studentIds);
    nextStep();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching students: {error.message}</div>;
  }

  return (
    <AddStudentsForm
      onSubmit={addStudents}
      students={data?.students || []}
      defaultSelectedIds={existingStudentIds}
    />
  );
};

export default AddStudents;
