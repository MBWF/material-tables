/* eslint-disable @typescript-eslint/naming-convention */

import { Route, Routes as AllRoutes } from "react-router-dom";
import { StudentPage } from "../page/Student";
import { AdressPage } from "../page/Edress";

export function Routes() {
  return (
    <>
      <AllRoutes>
        <Route path="alunos" element={<StudentPage />} />
        <Route path="enderecos" element={<AdressPage />} />
      </AllRoutes>
    </>
  );
}
