import type { ReactElement } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Children, createElement } from "react";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

type ChildrenProp = {
  children?: ReactElement[];
  name?: string;
};

type FormProps<T extends FieldValues, C extends yup.AnyObjectSchema> = {
  defaultValues: DeepPartial<T>;
  children: ReactElement<ChildrenProp>[];
  onSubmit: (fields: T) => void;
  className?: string;
  validationSchema: C;
};

export type FormRegister<T extends FieldValues = FieldValues> =
  UseFormRegister<T>;

export type { FieldError } from "react-hook-form";

const Form = <T extends FieldValues, C extends yup.AnyObjectSchema>({
  defaultValues,
  children,
  className,
  onSubmit,
  validationSchema,
}: FormProps<T, C>) => {
  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver,
    shouldUnregister: true,
  });

  const submit: SubmitHandler<T> = (data: T) => onSubmit(data);

  const createInputHandler = (element: ReactElement) => {
    const inputProps = element.props.name
      ? { ...element.props, ...register(element.props.name) }
      : element.props;

    return createElement(element.type, {
      ...inputProps,
      error: element.props.error || errors[element.props.name],
      key: element.props.key || element.props.name,
    });
  };

  const addInputHandlers: (e: ReactElement[]) => ReactElement[] = (
    elements: ReactElement[]
  ) =>
    Children.map(elements, (child: ReactElement) => {
      if (!child.props || (!child.props.name && !child.props.children)) {
        return child;
      }
      if (child.props.children) {
        return createElement(
          child.type,
          {
            ...child.props,
          },
          addInputHandlers(child.props.children)
        );
      }
      return createInputHandler(child);
    });

  return (
    <form onSubmit={handleSubmit(submit)} className={className}>
      {addInputHandlers(children)}
    </form>
  );
};

export default Form;
