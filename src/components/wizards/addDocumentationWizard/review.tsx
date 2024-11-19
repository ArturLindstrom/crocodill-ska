import { useCreateDocumentation } from "@/api/documentations/mutations";
import { Button } from "@/components/ui/button";
import { useDocumentationStore } from "@/store/documentations";

type AddReviewProps = {
  nextStep: () => void;
};

const AddReview = ({ nextStep }: AddReviewProps) => {
  const {
    documentationName,
    students,
    institution,
    selectedAreasWithCriteria,
    teacher,
  } = useDocumentationStore();

  const createDocumentation = useCreateDocumentation();

  const handleSubmit = () => {
    createDocumentation.mutate();
    nextStep();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Documentation Review
        </h2>

        <div className="space-y-6">
          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Documentation Name
            </h3>
            <p className="text-xl text-gray-800">{documentationName}</p>
          </div>

          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Selected Students
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {students.map((student) => (
                <li key={student.student_id} className="text-gray-800">
                  {student.first_name}
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Areas and Criteria
            </h3>
            {selectedAreasWithCriteria.map((area) => (
              <div key={area.areaId} className="mb-4">
                <p className="mb-2 font-medium text-gray-800">
                  {area.areaName}
                </p>
                <ul className="ml-4 space-y-1">
                  {area.criteria.map((criterion) => (
                    <li
                      key={criterion.criteriaId}
                      className="flex items-center text-gray-600"
                    >
                      <span className="w-2 h-2 mr-2 bg-gray-400 rounded-full"></span>
                      {criterion.criteriaName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Institution Details
            </h3>
            <div className="space-y-1">
              <p className="text-gray-800">
                Preschool:{" "}
                <span className="text-gray-600">
                  {institution.preschoolName}
                </span>
              </p>
              <p className="text-gray-800">
                Department:{" "}
                <span className="text-gray-600">
                  {institution.departmentName}
                </span>
              </p>
            </div>
          </div>

          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Teacher
            </h3>
            <p className="text-gray-800">{teacher.name}</p>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={handleSubmit} className="px-8 py-2">
              Create Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;