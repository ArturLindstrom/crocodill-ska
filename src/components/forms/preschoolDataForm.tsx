import { useEffect, useState } from "react";
import { Department, DocumentationWithTeacher, Month, Term } from "@/types";
import CheckboxWithText from "@/components/checkbox";
import Combobox from "@/components/comboBox";
import { transformMonths, transformTerms } from "@/helpers";
import { getDocumentationsByTermMonthAndDepartment } from "@/api/queries/documentations";
import { Button } from "../ui/button";
import * as yup from "yup";
import { useLocation } from "react-router-dom";

type PreschoolDataFormProps = {
  departments: Department[];
  terms: Term[];
  months: Month[];
  onDocumentationsFetch: (data: DocumentationWithTeacher[]) => void; // Pass the fetched data to parent
};

// Define Yup validation schema
const validationSchema = yup.object().shape({
  selectedTermId: yup.string().required("Du måste välja en termin"),
  selectedMonthId: yup.string().required("Du måste välja en månad"),
  selectedDepartments: yup.array().min(1, "Du måste välja minst en avdelning"),
});

const PreschoolDataForm = ({
  departments,
  terms,
  months,
  onDocumentationsFetch,
}: PreschoolDataFormProps) => {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    setSelectedTermId(null);
    setSelectedMonthId(null);
    setSelectedDepartments([]);
    setError(null);
  }, [location.pathname]);

  const transformedMonths = transformMonths(months);
  const transformedTerms = transformTerms(terms);

  const handleTermSelect = (id: string | null) => {
    setSelectedTermId(id);
    setError(null);
  };

  const handleMonthSelect = (id: string | null) => {
    setSelectedMonthId(id);
    setError(null);
  };

  const handleDepartmentSelect = (id: number, checked: boolean) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      const newSelection = checked
        ? [...prevSelectedDepartments, id]
        : prevSelectedDepartments.filter((deptId) => deptId !== id);
      return newSelection;
    });
  };

  const fetchData = async () => {
    try {
      await validationSchema.validate(
        {
          selectedTermId,
          selectedMonthId,
          selectedDepartments,
        },
        { abortEarly: false }
      );

      setError(null);

      const data = await getDocumentationsByTermMonthAndDepartment({
        selectedTermId: selectedTermId!,
        selectedMonthId: selectedMonthId!,
        selectedDepartments,
      });

      // Emit documentations to the parent via the callback function
      onDocumentationsFetch(data);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.errors.join(", "));
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        {departments.map((department: Department) => (
          <CheckboxWithText
            key={department.department_id}
            id={department.department_id.toString()}
            label={department.name}
            checked={selectedDepartments.includes(department.department_id)}
            onChange={(checked) =>
              handleDepartmentSelect(department.department_id, checked)
            }
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Combobox
          placeholder="termin"
          options={transformedTerms}
          value={selectedTermId}
          onSelect={handleTermSelect}
        />
        <Combobox
          placeholder="månad"
          options={transformedMonths}
          value={selectedMonthId}
          onSelect={handleMonthSelect}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="button" onClick={fetchData}>
        Hämta dokumentationer
      </Button>
    </div>
  );
};

export default PreschoolDataForm;
