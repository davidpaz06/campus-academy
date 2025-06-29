import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "@/routes/publicRoutes";
import { privateRoutes } from "@/routes/privateRoutes";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import Navbar from "@/components/layout/Navbar";

const AppRouter = () => (
  <BrowserRouter>
    <MainLayout>
      <Navbar />
      <Routes>
        {publicRoutes.map(({ path, element: Element, props }) => (
          <Route
            key={path}
            path={path}
            element={props ? <Element {...props} /> : <Element />}
          />
        ))}
        {privateRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default AppRouter;
