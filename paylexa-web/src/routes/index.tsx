import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/landing";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
