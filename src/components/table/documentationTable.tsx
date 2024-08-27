import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TEST_DATA = [
  {
    documentationName: "Dokumentation 1",
    date: "2021-10-10",
    pedagog: "Pedagog 1",
  },
  {
    documentationName: "Dokumentation 2",
    date: "2021-10-11",
    pedagog: "Pedagog 2",
  },
  {
    documentationName: "Dokumentation 3",
    date: "2021-10-12",
    pedagog: "Pedagog 3",
  },
  {
    documentationName: "Dokumentation 4",
    date: "2021-10-13",
    pedagog: "Pedagog 4",
  },
  {
    documentationName: "Dokumentation 5",
    date: "2021-10-14",
    pedagog: "Pedagog 5",
  },
  {
    documentationName: "Dokumentation 6",
    date: "2021-10-15",
    pedagog: "Pedagog 6",
  },
  {
    documentationName: "Dokumentation 7",
    date: "2021-10-16",
    pedagog: "Pedagog 7",
  },
  {
    documentationName: "Dokumentation 8",
    date: "2021-10-17",
    pedagog: "Pedagog 8",
  },
  {
    documentationName: "Dokumentation 9",
    date: "2021-10-18",
    pedagog: "Pedagog 9",
  },
  {
    documentationName: "Dokumentation 10",
    date: "2021-10-19",
    pedagog: "Pedagog 10",
  },
];

const DocumentationTable = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Dokumentationer</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Dokumentation</TableHead>
              <TableHead className="text-center">Datum</TableHead>
              <TableHead className="text-center">Pedagog</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEST_DATA.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={""}>{data.documentationName}</Link>
                </TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>
                  <Link to={""}>{data.pedagog}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentationTable;
