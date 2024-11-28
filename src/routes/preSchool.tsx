import { usePreschoolData } from "@/api/queries/preschools/usePreschoolQueries";
import Loader from "@/components/loader";
import Heading from "@/components/typography/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

const Preschool = () => {
  const { id } = useParams();

  const { data, isLoading, error } = usePreschoolData(id);
  console.log("data", data);

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching data: {(error as Error).message}</div>;
  if (!data) return <div>No data found.</div>;
  const { name, teachers } = data;

  return (
    <Card className="grid w-full grid-cols-2 p-4 grgap-4">
      <CardHeader className="col-span-2 text-center">
        <Heading.H1>{name}</Heading.H1>
      </CardHeader>
      <CardContent>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Pedagoger</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {teachers.map((teacher) => (
                <li key={teacher.teacher_id}>
                  {teacher.name}
                  <Label>{teacher.department.name}</Label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Preschool;
