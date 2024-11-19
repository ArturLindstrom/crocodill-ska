import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DocumentationActions, SetInstitutionPayload } from "./types";
import { DocumentationState } from "./types/shared";
import { updateOrAddArea, removeCriteria } from "./utils/documentationUtils";

const initialState: DocumentationState = {
  documentationName: "",
  students: [],
  studentIds: [],
  selectedAreasWithCriteria: [],
  institution: {
    preschoolId: null,
    preschoolName: null,
    departmentId: null,
    departmentName: null,
  },
  teacher: {
    id: null,
    name: null,
  },
  month: {
    monthId: null,
    monthName: null,
  },
  term: {
    termId: null,
    termName: null,
  },
};

export const useDocumentationStore = create<
  DocumentationState & DocumentationActions
>()(
  devtools((set, get) => ({
    ...initialState,

    // Actions
    setDocumentationName: (documentationName) =>
      set({ documentationName }, false, "setDocumentationName"),

    setStudents: (students) => set({ students }, false, "setStudents"),

    setInstitution: (institution: SetInstitutionPayload) =>
      set({ institution }, false, "setInstitution"),

    setTeacher: (id: number, name: string) =>
      set({ teacher: { id, name } }, false, "setTeacher"),

    setAreaCriteria: (areaId, areaName, criteria, checked) => {
      set(
        (state) => ({
          selectedAreasWithCriteria: checked
            ? updateOrAddArea(
                state.selectedAreasWithCriteria,
                areaId,
                areaName,
                criteria
              )
            : removeCriteria(
                state.selectedAreasWithCriteria,
                areaId,
                criteria.criteria_id
              ),
        }),
        false,
        "setAreaCriteria"
      );
    },

    setStudentIds: (studentIds: number[]) =>
      set({ studentIds }, false, "setStudentIds"),

    getDocumentationData: () => get(),

    setMonth: (payload) =>
      set(
        {
          month: { monthId: payload.monthId, monthName: payload.monthName },
        },
        false,
        "setMonth"
      ),

    setTerm: (payload) =>
      set(
        {
          term: { termId: payload.termId, termName: payload.termName },
        },
        false,
        "setTerm"
      ),

    resetForm: () => set(initialState, false, "resetForm"),
  }))
);
