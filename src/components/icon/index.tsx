import moonIcon from "@/assets/icons/Moon.svg";
import sunIcon from "@/assets/icons/Sun.svg";

type IconProps = {
  icon: "moon" | "sun";
};

const Icon = ({ icon }: IconProps) => {
  const iconsMap = {
    moon: moonIcon,
    sun: sunIcon,
  };

  return (
    <div>
      <img src={iconsMap[icon]} alt={`${icon} icon`} />
    </div>
  );
};

export default Icon;
