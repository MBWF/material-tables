import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { baseTheme } from "./styles/baseTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StudentPage } from "./page/Student/index.tsx";
import { AdressPage } from "./page/Adress/index.tsx";

const router = createBrowserRouter([
  {
    path: "/alunos",
    element: <StudentPage />,
  },
  {
    path: "/enderecos",
    element: <AdressPage />,
  },
  {
    path: "/projetos",
    element: <AdressPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={baseTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
