import Form from "@/components/forms/form";
import Heading from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocumentationStore } from "@/store/documentations";
import * as yup from "yup";

export interface DocumentationNameFormFields {
  documentationName: string;
}

type DocumentationNameFormProps = {
  onSubmit: (fields: DocumentationNameFormFields) => void;
};
const DocumentationNameForm = ({ onSubmit }: DocumentationNameFormProps) => {
  const documentationName = useDocumentationStore(
    (state) => state.documentationName
  );

  const defaultValues: DocumentationNameFormFields = {
    documentationName: documentationName,
  };

  const validationSchema = yup.object().shape({
    documentationName: yup.string().required("Required"),
  });

  const submit = ({ documentationName }: DocumentationNameFormFields) => {
    console.log(documentationName);
    onSubmit({ documentationName });
  };
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      <Heading.H3>Dokumentationens namn</Heading.H3>
      <Input name="documentationName" placeholder="Namn" />
      <Button type="submit">Nästa</Button>
    </Form>
  );
};

export default DocumentationNameForm;
