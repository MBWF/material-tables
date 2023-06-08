/* eslint-disable @typescript-eslint/naming-convention */

import { Route, Routes as AllRoutes } from "react-router-dom";
import { StudentPage } from "../page/Student";

export function Routes() {
  return (
    <AllRoutes>
      <Route path="aluno" element={<StudentPage />} />
    </AllRoutes>
  );
}
