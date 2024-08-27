import Preschool from "@/routes/preSchool";
import Root from "@/routes/root";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/förskolor/:name", element: <Preschool /> }],
  },
]);
