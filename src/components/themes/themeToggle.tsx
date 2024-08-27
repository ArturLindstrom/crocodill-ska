import Icon from "@/components/icon";
import { useTheme } from "./themeProvider";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isChecked, setChecked] = useState(theme === "dark");

  // Sync the local state with the theme context
  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isChecked ? "light" : "dark";
    setTheme(newTheme);
    setChecked(!isChecked);
  };

  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      <Icon icon={isChecked ? "sun" : "moon"} />
    </div>
  );
};

export default ThemeToggle;
