import { preschoolLoader } from "@/api/loaders";
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
        loader: ({ params }) => {
          const { id } = params;
          if (!id) {
            throw new Error("Preschool ID is required.");
          }
          return preschoolLoader(id);
        },
      },
    ],
  },
]);
