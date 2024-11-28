import { useDocumentationStore } from "@/store/documentations";
import { useMutation } from "@tanstack/react-query";
import { createDocumentation, transformStoreDataToDocumentation } from ".";
import { DocumentationError, ERROR_MESSAGES } from "./errors";

export const useCreateDocumentation = () => {
  const { resetForm, getDocumentationData } = useDocumentationStore();

  return useMutation({
    mutationFn: async () => {
      const storeData = getDocumentationData();
      const documentationData = transformStoreDataToDocumentation(storeData);
      return createDocumentation(documentationData);
    },
    onSuccess: resetForm,
    onError: (error) => {
      console.error(
        "Documentation error:",
        error instanceof DocumentationError
          ? error.message
          : ERROR_MESSAGES.GENERAL_ERROR
      );
    },
  });
};
