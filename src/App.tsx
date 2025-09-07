import "./styles/variables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import InternalLayout from "./layouts/InternalLayout";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import CreateInstitution from "./pages/CreateInstitution";

// Private Pages
import Dashboard from "./pages/dashboard/Dashboard";
import AcademyMain from "./pages/academy/AcademyMain";
// import CreateCourse from "./pages/create-course/CreateCourse";

export default function App() {
  return (
    <AuthProvider>
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

          <Route element={<PublicLayout background={2} stripe={2} options={false} />}>
            {/* <Route path="/create-institution" element={<CreateInstitution />} /> */}
          </Route>

          {/* RUTAS PRIVADAS */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<InternalLayout />}>
            <Route path="/academy" element={<AcademyMain />} />
            {/* <Route path="/create-course" element={<CreateCourse />} /> */}
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
