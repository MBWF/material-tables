import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { baseTheme } from "./styles/baseTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StudentPage } from "./page/Student/index.tsx";
import { AdressPage } from "./page/Adress/index.tsx";
import { TeacherPage } from "./page/Teacher/index.tsx";
import { ProjectPage } from "./page/Projects/index.tsx";

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
    path: "/professores",
    element: <TeacherPage />,
  },
  {
    path: "/projetos",
    element: <ProjectPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={baseTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
