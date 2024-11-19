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
import { Teacher } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddTeacherFormProps = {
  teachers: Teacher[];
  onSubmit: (teacherId: number, teacherName: string) => void;
};

const AddTeacherForm = ({ teachers, onSubmit }: AddTeacherFormProps) => {
  const FormSchema = z.object({
    teacher: z.number({
      required_error: "Välj en pedagog",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: undefined,
    },
  });

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.teacher_id.toString(),
    label: teacher.name,
  }));

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    if (values.teacher) {
      const selectedTeacher = teachers.find(
        (t) => t.teacher_id === values.teacher
      );
      if (selectedTeacher) {
        onSubmit(Number(selectedTeacher.teacher_id), selectedTeacher.name);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Välj Lärare</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Lärare"
                  options={teacherOptions}
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
        <Button type="submit">Nästa</Button>
      </form>
    </Form>
  );
};

export default AddTeacherForm;
