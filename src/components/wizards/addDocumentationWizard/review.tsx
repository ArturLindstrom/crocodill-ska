import { useCreateDocumentation } from "@/api/mutations/documentations/useCreateDocumentation";
import { Button } from "@/components/ui/button";
import { useDocumentationStore } from "@/store/documentations";

const AddReview = () => {
  const {
    documentationName,
    students,
    institution,
    selectedAreasWithCriteria,
    teacher,
    resetForm,
  } = useDocumentationStore();

  const createDocumentation = useCreateDocumentation();

  const handleSubmit = () => {
    createDocumentation.mutate();
    resetForm();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Dokumentationsöversikt
        </h2>

        <div className="space-y-6">
          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Dokumentationens namn
            </h3>
            <p className="text-xl text-gray-800">{documentationName}</p>
          </div>

          <div className="pb-4 border-b">
            <h3 className="mb-2 text-sm tracking-wider text-gray-600 uppercase">
              Valda barn
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
              Områden och mål
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
            <div className="space-y-1">
              <p className="text-gray-800">
                Förskola:{" "}
                <span className="text-gray-600">
                  {institution.preschoolName}
                </span>
              </p>
              <p className="text-gray-800">
                Avdelning:{" "}
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
            <Button
              onClick={handleSubmit}
              className="px-8 py-2 bg-secondary text-primary"
            >
              Skapa dokumentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
