import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedAdminRouteProps {
  children?: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-qc-base flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-widest text-qc-body uppercase">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated visitors to /admin/login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
