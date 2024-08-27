import NavBar from "@/components/navBar";

type LayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center text-center">{children}</div>
    </div>
  );
};

export default BaseLayout;
