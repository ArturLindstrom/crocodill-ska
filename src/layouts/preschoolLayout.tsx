import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BarChartCard from "@/components/chart/barChart";
import PieChartCard from "@/components/chart/pieChart";
import PreschoolDataForm from "@/components/forms/preschoolDataForm";
import DocumentationTable from "@/components/table/documentationTable";
import Heading from "@/components/typography/headings";
import { Card } from "@/components/ui/card";
import { DocumentationWithTeacher, PreschoolLoader } from "@/types";

const PreschoolLayout = () => {
  const [filteredDocumentations, setFilteredDocumentations] = useState<
    DocumentationWithTeacher[]
  >([]);
  const { preschool, terms, departments, months, documentations } =
    useLoaderData() as PreschoolLoader;

  // Use useEffect to set the filteredDocumentations initially to the documentations from the loader
  useEffect(() => {
    setFilteredDocumentations(documentations);
  }, [documentations]);

  const handleDocumentationsFetch = (data: DocumentationWithTeacher[]) => {
    setFilteredDocumentations(data);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-4">
        <Heading.H1>{preschool.name}</Heading.H1>
        <PreschoolDataForm
          departments={departments}
          terms={terms}
          months={months}
          onDocumentationsFetch={handleDocumentationsFetch}
        />
      </div>

      <Card className="grid w-5/6 grid-cols-2 p-4">
        <BarChartCard />
        <PieChartCard />
        <DocumentationTable documentations={filteredDocumentations} />
      </Card>
    </>
  );
};

export default PreschoolLayout;
