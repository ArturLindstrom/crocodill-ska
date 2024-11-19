import { useDocumentationStore } from "@/store/documentations";
import DocumentationNameForm from "./documentationNameForm";

type AddDocumentationNameProps = {
  nextStep: () => void;
};
const AddDocumentationName = ({ nextStep }: AddDocumentationNameProps) => {
  const setDocumentationName = useDocumentationStore(
    (state) => state.setDocumentationName
  );

  const addDocumentationName = (documentationName: string) => {
    setDocumentationName(documentationName);
    nextStep();
  };

  return <DocumentationNameForm onSubmit={addDocumentationName} />;
};

export default AddDocumentationName;
