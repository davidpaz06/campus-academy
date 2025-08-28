import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/public/Dashboard";
import InternalLayout from "./layouts/InternalLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import AcademyMain from "./pages/academy/AcademyMain";
import CreateInstitution from "./pages/public/CreateInstitution";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
      <Route element={<PublicLayout background={1} options={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={<PublicLayout background={2} stripe={2} options={false} />}
      >
        <Route path="/create-institution" element={<CreateInstitution />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<InternalLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/academy" element={<AcademyMain />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
