import { DashboardLayout } from "./DashboardLayout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

export const AuthenticatedLayout = () => {
  const location = useLocation();

  return (
    <DashboardLayout>
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Your error fallback component goes here</div>}
      >
        <Suspense
          fallback={<div>Your awesome spinner component goes here</div>}
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </DashboardLayout>
  );
};
