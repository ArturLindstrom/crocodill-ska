import BarChartCard from "@/components/chart/barChart";
import PieChartCard from "@/components/chart/pieChart";
import DocumentationTable from "@/components/table/documentationTable";
import { Card } from "@/components/ui/card";
const PreschoolLayout = () => {
  return (
    <Card className="grid items-center w-5/6 grid-cols-2 gap-4 p-4 m-10">
      <BarChartCard />
      <PieChartCard />
      <DocumentationTable />
    </Card>
  );
};

export default PreschoolLayout;
