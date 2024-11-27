import Combobox from "@/components/comboBox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Term } from "@/types";

type AddMonthFormProps = {
  terms: Term[];
  onSubmit: (
    monthId: number,
    monthName: string,
    termId: number,
    termName: string
  ) => void;
};

const AddMonthForm = ({ terms, onSubmit }: AddMonthFormProps) => {
  const FormSchema = z.object({
    term: z.number({
      required_error: "Välj en termin",
    }),
    month: z.number({
      required_error: "Välj en månad",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: undefined,
      month: undefined,
    },
  });

  const termOptions = terms
    .filter((term): term is Term & { term_name: string } =>
      Boolean(term.term_name)
    )
    .map((term) => ({
      value: term.term_id.toString(),
      label: term.term_name,
    }));

  const selectedTermId = form.watch("term");
  const selectedTerm = terms.find((t) => t.term_id === selectedTermId);
  const monthOptions = selectedTerm?.month_term
    ? selectedTerm.month_term
        .filter((mt) => mt.months && mt.months.month_name)
        .map((mt) => ({
          value: mt.months!.month_id.toString(),
          label: mt.months!.month_name as string,
        }))
    : [];

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    if (values.term && values.month) {
      const term = terms.find((t) => t.term_id === values.term);
      const monthEntry = term?.month_term.find(
        (mt) => mt.months?.month_id === values.month
      );

      if (term && monthEntry?.months?.month_name && term.term_name) {
        onSubmit(
          monthEntry.months.month_id,
          monthEntry.months.month_name,
          term.term_id,
          term.term_name
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center space-y-6 "
      >
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Välj Termin</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Termin"
                  options={termOptions}
                  value={field.value?.toString()}
                  onSelect={(value) => {
                    const numericValue = value
                      ? parseInt(value, 10)
                      : undefined;
                    field.onChange(numericValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedTermId ? (
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Välj Månad</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Månad"
                    options={monthOptions}
                    value={field.value?.toString()}
                    onSelect={(value) => {
                      const numericValue = value
                        ? parseInt(value, 10)
                        : undefined;
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <Button type="submit">Nästa</Button>
      </form>
    </Form>
  );
};

export default AddMonthForm;
