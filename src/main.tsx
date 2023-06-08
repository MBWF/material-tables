import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";

import { baseTheme } from "./styles/baseTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StudentPage } from "./page/Student/index.tsx";

const router = createBrowserRouter([
  {
    path: "/aluno",
    element: <StudentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={baseTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
