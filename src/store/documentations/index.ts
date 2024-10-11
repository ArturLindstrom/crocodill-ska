import { DocumentationWithTeacher } from "@/types";
import { create } from "zustand";

interface DocumentationState {
  documentations: DocumentationWithTeacher[];
  setDocumentations: (docs: DocumentationWithTeacher[]) => void;
  resetDocumentations: () => void;
}

export const useDocumentationStore = create<DocumentationState>((set) => ({
  documentations: [],
  setDocumentations: (docs) => set({ documentations: docs }),
  resetDocumentations: () => set({ documentations: [] }),
}));
