import { useEffect, useState, useCallback } from "react";
import BarChartCard from "@/components/chart/barChart";
import PieChartCard from "@/components/chart/pieChart";
import PreschoolDataForm from "@/components/forms/preschoolDataForm";
import DocumentationTable from "@/components/table/documentationTable";
import Heading from "@/components/typography/headings";
import { Card } from "@/components/ui/card";
import { DocumentationWithTeacher } from "@/types";
import { useParams } from "react-router-dom";
import { usePreschoolData } from "@/api/preschools";

const PreschoolLayout = () => {
  const [filteredDocumentations, setFilteredDocumentations] = useState<
    DocumentationWithTeacher[]
  >([]);
  const { id } = useParams();

  const { data, isLoading, error } = usePreschoolData(id);

  useEffect(() => {
    if (data?.documentations) {
      setFilteredDocumentations(data.documentations);
    }
  }, [data]);

  const handleDocumentationsFetch = useCallback(
    (docs: DocumentationWithTeacher[]) => {
      setFilteredDocumentations(docs);
    },
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {(error as Error).message}</div>;
  if (!data) return <div>No data found.</div>;

  const { preschool, departments, terms, months, countByMonth } = data;

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-4">
        <Heading.H1>{preschool?.name || "Unknown Preschool"}</Heading.H1>{" "}
        <PreschoolDataForm
          departments={departments || []}
          terms={terms}
          months={months || []}
          onDocumentationsFetch={handleDocumentationsFetch}
        />
      </div>

      <Card className="grid w-5/6 grid-cols-2 p-4">
        <BarChartCard
          countByMonth={countByMonth || {}}
          term={terms[0].term_name || ""}
        />
        <PieChartCard />
        <DocumentationTable documentations={filteredDocumentations} />
      </Card>
    </>
  );
};

export default PreschoolLayout;
