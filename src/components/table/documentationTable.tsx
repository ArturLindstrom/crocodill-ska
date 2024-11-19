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
import { DocumentationWithTeacher } from "@/types";

type DocumentationTableProps = {
  documentations: DocumentationWithTeacher[];
};
const DocumentationTable = ({ documentations }: DocumentationTableProps) => {
  return (
    <Card className="col-span-3">
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
            {documentations.length > 0 ? (
              documentations.map((documentation, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link to={""}>{documentation.name}</Link>
                  </TableCell>
                  <TableCell>
                    {documentation.created_at?.slice(0, 10)}
                  </TableCell>
                  <TableCell>
                    <Link to={""}>
                      {documentation.teachers?.name || "Ingen pedagog"}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Inga dokumentationer hittades
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentationTable;
