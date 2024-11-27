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
import { Department, Preschool } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddPreschoolFormProps = {
  preschools: (Preschool & { departments: Department[] })[];
  onSubmit: (
    preschoolId: number,
    preschoolName: string,
    departmentId: number,
    departmentName: string
  ) => void;
};

const AddPreschoolForm = ({ preschools, onSubmit }: AddPreschoolFormProps) => {
  const FormSchema = z.object({
    preschool: z.number({
      required_error: "Välj en förskola",
    }),
    department: z.number({
      required_error: "Välj en avdelning",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preschool: undefined,
      department: undefined,
    },
  });

  const preschoolOptions = preschools.map((preschool) => ({
    value: preschool.preschool_id.toString(),
    label: preschool.name,
  }));

  const selectedPreschoolId = form.watch("preschool");
  const selectedPreschool = preschools.find(
    (p) => p.preschool_id === selectedPreschoolId
  );
  const departmentOptions =
    selectedPreschool?.departments.map((department) => ({
      value: department.department_id.toString(),
      label: department.name,
    })) ?? [];

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    if (values.preschool && values.department) {
      const preschool = preschools.find(
        (p) => p.preschool_id === values.preschool
      );
      const department = preschool?.departments.find(
        (d) => d.department_id === values.department
      );

      if (preschool && department) {
        onSubmit(
          preschool.preschool_id,
          preschool.name,
          department.department_id,
          department.name
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center space-y-6"
      >
        <FormField
          control={form.control}
          name="preschool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Välj Förskola</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Förskola"
                  options={preschoolOptions}
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

        {selectedPreschoolId ? (
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Välj Avdelning</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Avdelning"
                    options={departmentOptions}
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

export default AddPreschoolForm;
