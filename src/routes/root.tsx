import BaseLayout from "@/layouts/baseLayout";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default Root;
