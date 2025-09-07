import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import InternalLayout from "./layouts/InternalLayout";
import "./styles/variables.css";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

//Register subpages
// import RegisterStudent from "./pages/auth/register/RegisterStudent";
// import RegisterTeacher from "./pages/auth/register/RegisterTeacher";
import RegisterInstitution from "./pages/auth/register/RegisterInstitution";

// Private Pages
import Dashboard from "./pages/dashboard/Dashboard";
import AcademyMain from "./pages/academy/AcademyMain";

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
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<PublicLayout background={2} stripe={2} options={false} isStatic={false} />}>
            <Route
              path="/register/institution"
              element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterInstitution />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* RUTAS PRIVADAS PROTEGIDAS */}
          <Route element={<ProtectedRoute requireAuth={true} />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<InternalLayout />}>
              <Route path="/academy" element={<AcademyMain />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
