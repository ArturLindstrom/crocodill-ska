import { Checkbox } from "@/components/ui/checkbox";

type CheckboxWithTextProps = {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void; // New onChange prop to handle changes
};

const CheckboxWithText = ({
  id,
  label,
  checked,
  onChange,
}: CheckboxWithTextProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked} // Control the checked state
        onCheckedChange={onChange} // Radix UI prop for handling changes
        aria-labelledby={`${id}-label`} // Accessible label linking
      />
      <label
        id={`${id}-label`} // ID to link the label with the checkbox
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxWithText;
