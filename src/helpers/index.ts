import { Month, Term } from "@/types";

// Transform terms data for the Combobox component
export const transformTerms = (terms: Term[]) => {
  return terms
    .filter((term) => term.term_name !== null) // Filter out terms with null names
    .map((term) => ({
      value: term.term_id.toString(), // Use term ID as value
      label: term.term_name!, // Use term name as label
    }));
};

// Transform months data for the Combobox component
export const transformMonths = (months: Month[]) => {
  return months
    .filter((month) => month.month_name !== null) // Filter out months with null names
    .map((month) => ({
      value: month.month_id.toString(), // Use month ID as value
      label: month.month_name!, // Use month name as label
    }))
    .sort((a, b) => {
      const monthOrder = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
      ];
      return monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label);
    });
};
