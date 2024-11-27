import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDocumentationStore } from "@/store/documentations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Criteria } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

type AddCriteriasFormProps = {
  onSubmit: () => void;
  criterias: Criteria[];
  defaultSelectedIds?: number[];
  selectedAreaId: number;
  areaName: string;
};

const FormSchema = z.object({
  selectedCriterias: z.array(z.number()).min(1, "Välj minst ett kriterium"),
});

const AddCriteriasForm = ({
  onSubmit,
  criterias,
  defaultSelectedIds = [],
  selectedAreaId,
  areaName,
}: AddCriteriasFormProps) => {
  const setAreaCriteria = useDocumentationStore(
    (state) => state.setAreaCriteria
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedCriterias: defaultSelectedIds,
    },
  });

  function submit() {
    onSubmit();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col items-center space-y-6"
      >
        <FormField
          control={form.control}
          name="selectedCriterias"
          render={() => (
            <FormItem>
              <FormLabel>Välj kriterier</FormLabel>
              <div className="space-y-2">
                {criterias.map((criteria) => (
                  <FormField
                    key={criteria.criteria_id}
                    control={form.control}
                    name="selectedCriterias"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(
                              criteria.criteria_id
                            )}
                            onCheckedChange={(checked) => {
                              const value = field.value || [];
                              if (checked) {
                                field.onChange([
                                  ...value,
                                  criteria.criteria_id,
                                ]);
                                setAreaCriteria(
                                  selectedAreaId,
                                  areaName,
                                  criteria,
                                  true
                                );
                              } else {
                                field.onChange(
                                  value.filter(
                                    (id) => id !== criteria.criteria_id
                                  )
                                );
                                setAreaCriteria(
                                  selectedAreaId,
                                  areaName,
                                  criteria,
                                  false
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {criteria.criteria_name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Nästa</Button>
      </form>
    </Form>
  );
};

export default AddCriteriasForm;
