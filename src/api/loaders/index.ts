import { getPreschoolAndDepartmentsById } from "@/api/preschools";
import { getAllTerms } from "../terms";
import { getAllMonths } from "../months";

export const preschoolLoader = async (id: string) => {
  const { preschool, departments } = await getPreschoolAndDepartmentsById(id);
  const { terms, documentations } = await getAllTerms();
  const { months } = await getAllMonths();

  return { preschool, departments, terms, months, documentations };
};
