import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectScrollableProps<T> = {
  items: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  onSelect: (value: T[keyof T]) => void;
};

const SelectScrollable = <T extends object>({
  items,
  labelKey,
  valueKey,
  placeholder,
  onSelect,
}: SelectScrollableProps<T>) => {
  const handleSelect = (value: string) => {
    const selectedItem = items.find((item) => item[valueKey] === value);
    if (selectedItem) {
      onSelect(selectedItem[valueKey]);
    }
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item[valueKey] as string}
            value={item[valueKey] as string}
          >
            {item[labelKey] as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectScrollable;
