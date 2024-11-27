import AddDocumentation from "@/routes/addDocumentation";
import Preschool from "@/routes/preSchool";
import Root from "@/routes/root";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "preschool/:id",
        element: <Preschool />,
      },
      { path: "add-documentation", element: <AddDocumentation /> },
    ],
  },
]);
