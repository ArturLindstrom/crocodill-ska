import Heading from "@/components/typography/headings";
import AddDocumentationWizard from "@/components/wizards/addDocumentationWizard/addDoucmentationWizard";

const AddDocumentation = () => {
  return (
    // <Loader />
    <>
      <Heading.H1>Lägg till dokumentation</Heading.H1>
      <AddDocumentationWizard />
    </>
  );
};

export default AddDocumentation;
