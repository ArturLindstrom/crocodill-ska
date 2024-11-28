export const ERROR_MESSAGES = {
  MISSING_FIELDS: "Missing required fields",
  DUPLICATE_NAME: "A documentation with this name already exists",
  STUDENT_LINK_FAILED: "Failed to link students to documentation",
  CRITERIA_LINK_FAILED: "Failed to link criteria to documentation",
  GENERAL_ERROR: "Failed to create documentation",
} as const;

export class DocumentationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "DocumentationError";
  }
}
