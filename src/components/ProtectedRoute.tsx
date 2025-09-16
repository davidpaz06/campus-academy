import React, { useMemo } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  requiredProfiles?: number[]; // ✅ Nueva prop para verificar perfiles específicos
  fallbackComponent?: React.ComponentType; // ✅ Componente de fallback personalizado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
  requiredProfiles,
  fallbackComponent: FallbackComponent,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // ✅ Memoizar verificación de perfil para evitar cálculos innecesarios
  const hasRequiredProfile = useMemo(() => {
    if (!requiredProfiles || !user) return true;
    return requiredProfiles.includes(user.profileId);
  }, [requiredProfiles, user]);

  // ✅ Verificar autenticación
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // ✅ Verificar perfil específico si se requiere
  if (requireAuth && isAuthenticated && !hasRequiredProfile) {
    // Podrías redirigir a una página de "acceso denegado" o dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Redirigir usuarios autenticados de rutas públicas
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from || "/dashboard";
    return <Navigate to={from} replace />;
  }

  // ✅ Renderizar contenido
  return children ? <>{children}</> : <Outlet />;
};

// ✅ Optimizar con React.memo para evitar re-renders innecesarios
export default React.memo(ProtectedRoute);
