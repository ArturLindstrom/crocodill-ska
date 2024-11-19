import {
  useGetAreas,
  useGetCriteriasByAreaId,
} from "@/api/documentations/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDocumentationStore } from "@/store/documentations";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Loader from "../loader";

const FormSchema = z.object({
  selectedCriteria: z
    .array(
      z.object({
        areaId: z.string(),
        areaName: z.string(),
        criteriaName: z.string(),
      })
    )
    .min(1, "Välj minst ett kriterium"),
});

type DocumentationFormProps = {
  onSubmit: (
    selectedCriteria: z.infer<typeof FormSchema>["selectedCriteria"]
  ) => void;
};

const DocumentationForm = ({ onSubmit }: DocumentationFormProps) => {
  const { selectedAreasWithCriteria } = useDocumentationStore();
  const { data: areasData, isLoading: isAreasLoading } = useGetAreas();

  // Fetch criteria for all areas
  const criteriaQueries =
    areasData?.map((area) => useGetCriteriasByAreaId(area.area_id)) ?? [];

  const isLoading =
    isAreasLoading || criteriaQueries.some((query) => query.isLoading);
  const hasAllData = areasData && criteriaQueries.every((query) => query.data);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedCriteria: selectedAreasWithCriteria.flatMap((area) =>
        area.criteria.map((criteriaName) => ({
          areaId: area.areaId,
          areaName: area.areaName,
          criteriaName,
        }))
      ),
    },
  });

  function submit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.selectedCriteria);
  }

  if (isLoading) return <Loader />;
  if (!hasAllData) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          control={form.control}
          name="selectedCriteria"
          render={() => (
            <FormItem>
              <FormLabel>Välj kriterier per område</FormLabel>
              <div className="space-y-6">
                {areasData.map((area, index) => (
                  <div key={area.area_id} className="space-y-4">
                    <FormLabel>{area.area_name}</FormLabel>
                    {criteriaQueries[index].data?.map((criteria) => (
                      <FormField
                        key={criteria.criteria_id}
                        control={form.control}
                        name="selectedCriteria"
                        render={({ field }) => {
                          const criteriaEntry = {
                            areaId: area.area_id,
                            areaName: area.area_name,
                            criteriaName: criteria.criteria_name,
                          };
                          const isChecked = field.value?.some(
                            (item) =>
                              item.areaId === criteriaEntry.areaId &&
                              item.criteriaName === criteriaEntry.criteriaName
                          );

                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    const value = field.value || [];
                                    return checked
                                      ? field.onChange([
                                          ...value,
                                          criteriaEntry,
                                        ])
                                      : field.onChange(
                                          value.filter(
                                            (item) =>
                                              !(
                                                item.areaId ===
                                                  criteriaEntry.areaId &&
                                                item.criteriaName ===
                                                  criteriaEntry.criteriaName
                                              )
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {criteria.criteria_name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                ))}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DocumentationForm;
