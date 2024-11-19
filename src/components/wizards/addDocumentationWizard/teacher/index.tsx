import { useTeachersQuery } from "@/api/teachers/teacherQueries";
import { useDocumentationStore } from "@/store/documentations";
import AddTeacherForm from "./addTeacherForm";
import Loader from "@/components/loader";

type AddTeacherProps = {
  nextStep: () => void;
};

const AddTeacher = ({ nextStep }: AddTeacherProps) => {
  const { data: teachers, isLoading, error } = useTeachersQuery();
  const setTeacher = useDocumentationStore((state) => state.setTeacher);

  const handleSubmit = (teacherId: number, teacherName: string) => {
    // teacherId is actually teacher_id from the Teacher type,
    // but store expects it as id
    setTeacher(teacherId, teacherName);
    nextStep();
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error fetching teachers: {error.message}</div>;
  }
  if (!teachers) {
    return <div>No teachers found</div>;
  }

  return <AddTeacherForm onSubmit={handleSubmit} teachers={teachers} />;
};

export default AddTeacher;
