import { getAllPreschools } from "@/api/preschools";
import Preschool from "@/routes/preSchool";
import Root from "@/routes/root";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: getAllPreschools,
    children: [
      {
        path: "förskolor/:id",
        element: <Preschool />,
      },
    ],
  },
]);
