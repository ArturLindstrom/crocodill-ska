import { useMutation } from "@tanstack/react-query";
import { useDocumentationStore } from "@/store/documentations";
import { DocumentationData } from "../types/documentation";
import { supabase } from "@/api/supabaseClient";
import { DocumentationError, ERROR_MESSAGES } from "./errors";
import { AreaWithCriteria } from "@/store/documentations/types/shared";

const validateInput = (data: DocumentationData): void => {
  if (
    !data.dbDoc.department_id ||
    !data.dbDoc.preschool_id ||
    !data.dbDoc.teacher_id
  ) {
    throw new DocumentationError(ERROR_MESSAGES.MISSING_FIELDS);
  }
};

const transformStoreDataToDocumentation = (
  storeData: ReturnType<typeof useDocumentationStore.getState>
): DocumentationData => {
  const {
    institution,
    teacher,
    documentationName,
    month,
    term,
    studentIds,
    selectedAreasWithCriteria,
  } = storeData;

  return {
    dbDoc: {
      department_id: institution.departmentId!,
      preschool_id: institution.preschoolId!,
      teacher_id: teacher.id!,
      name: documentationName!,
      month_id: month.monthId!,
      term_id: term.termId!,
    },
    studentIds,
    selectedAreasWithCriteria,
  };
};

const createStudentRelations = async (
  documentationId: number,
  studentIds: number[]
) => {
  const { error } = await supabase.from("documentation_student").insert(
    studentIds.map((studentId) => ({
      documentation_id: documentationId,
      student_id: studentId,
    }))
  );
  if (error) throw error;
};

const createDocumentationCriteriaRelations = async (
  documentationId: number,
  selectedAreasWithCriteria: AreaWithCriteria[]
) => {
  const relations = selectedAreasWithCriteria.flatMap((areaWithCriteria) =>
    areaWithCriteria.criteria.map((criteria) => ({
      documentation_id: documentationId,
      criteria_id: criteria.criteriaId,
    }))
  );

  const { error } = await supabase
    .from("documentation_criteria")
    .insert(relations);
  if (error) throw error;
};

export const createDocumentation = async (data: DocumentationData) => {
  try {
    validateInput(data);

    const { data: newDoc, error } = await supabase
      .from("documentations")
      .insert(data.dbDoc)
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new DocumentationError(ERROR_MESSAGES.DUPLICATE_NAME);
      }
      throw error;
    }

    await createStudentRelations(newDoc.documentation_id, data.studentIds);
    await createDocumentationCriteriaRelations(
      newDoc.documentation_id,
      data.selectedAreasWithCriteria
    );

    return newDoc;
  } catch (error: unknown) {
    if (error instanceof DocumentationError) throw error;
    throw new DocumentationError(ERROR_MESSAGES.GENERAL_ERROR);
  }
};

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
