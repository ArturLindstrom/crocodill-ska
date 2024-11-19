import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Student } from "@/types";

const FormSchema = z.object({
  students: z.array(z.number()).min(1, "Välj minst en student"),
});

type AddStudentsFormProps = {
  onSubmit: (studentIds: number[]) => void;
  students: Student[];
  defaultSelectedIds?: number[];
};

const AddStudentsForm = ({
  onSubmit,
  students,
  defaultSelectedIds = [],
}: AddStudentsFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      students: defaultSelectedIds,
    },
  });

  function submit(data: z.infer<typeof FormSchema>) {
    console.log("data", data.students);
    onSubmit(data.students);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <FormField
          control={form.control}
          name="students"
          render={() => (
            <FormItem>
              <FormLabel>Välj studenter</FormLabel>
              <div className="space-y-4">
                {students.map((student) => (
                  <FormField
                    key={student.student_id}
                    control={form.control}
                    name="students"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={student.student_id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(
                                student.student_id
                              )}
                              onCheckedChange={(checked) => {
                                const value = field.value || [];
                                return checked
                                  ? field.onChange([
                                      ...value,
                                      student.student_id,
                                    ])
                                  : field.onChange(
                                      value.filter(
                                        (val) => val !== student.student_id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {student.first_name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
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

export default AddStudentsForm;
