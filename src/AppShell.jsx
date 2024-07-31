import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

export const AppShell = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div>Your error fallback component goes here</div>
      )}
    >
      <HelmetProvider>
        <Suspense
          fallback={<div>Your awesome spinner component goes here</div>}
        >
          {children}
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

AppShell.propTypes = {
  children: PropTypes.node,
};
