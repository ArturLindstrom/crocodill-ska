import Combobox from "@/components/comboBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Area } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AreaSelectorProps = {
  areas: Area[];
  onSubmit: (areaId: number) => void;
};

const AreaSelector = ({ areas, onSubmit }: AreaSelectorProps) => {
  const FormSchema = z.object({
    area: z.number({
      required_error: "Välj ett område",
    }),
    selectedCriterias: z.array(z.number()),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      area: undefined,
      selectedCriterias: [],
    },
  });

  const criteriaOptions = areas.map((area) => ({
    value: area.area_id.toString(),
    label: area.area_name,
  }));

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Välj Läroplansområde</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Område"
                  options={criteriaOptions}
                  value={field.value?.toString()}
                  onSelect={(value) => {
                    const numericValue = value
                      ? parseInt(value, 10)
                      : undefined;
                    field.onChange(numericValue);
                    if (numericValue) onSubmit(numericValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default AreaSelector;
