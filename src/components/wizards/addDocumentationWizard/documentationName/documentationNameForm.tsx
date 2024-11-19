"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDocumentationStore } from "@/store/documentations";
type DocumentationNameFormProps = {
  onSubmit: (name: string) => void;
};

const FormSchema = z.object({
  name: z.string().nonempty("Ange ett namn på dokumentationen"),
});

const DocumentationNameForm = ({ onSubmit }: DocumentationNameFormProps) => {
  const documentationName = useDocumentationStore(
    (state) => state.documentationName
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: documentationName,
    },
  });

  const submit = (data: z.infer<typeof FormSchema>) => {
    onSubmit(data.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dokumentationens namn</FormLabel>
              <FormControl>
                <Input placeholder="Namn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DocumentationNameForm;
