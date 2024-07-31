import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthRedirect = () => {
  const location = useLocation();
  const user = null; // Replace with proper user data source

  if (user?.data) {
    return <Navigate to="/app" replace />;
  }

  return (
    <ErrorBoundary
      key={location.pathname}
      fallback={<div>Your error fallback component goes here</div>}
    >
      <Suspense fallback={<div>Your awesome spinner component goes here</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
};
