import { HTMLProps } from "react";

type TextProps = HTMLProps<HTMLHeadingElement>;

const H1 = ({ children, className }: TextProps) => {
  return (
    <h1
      className={`text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl pt-4 ${className}`}
    >
      {children}
    </h1>
  );
};

const H2 = ({ children, className }: TextProps) => {
  return (
    <h2
      className={`pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
};
const H3 = ({ children, className }: TextProps) => {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};
const H4 = ({ children, className }: TextProps) => {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
};

const Heading = { H1, H2, H3, H4 };
export default Heading;
