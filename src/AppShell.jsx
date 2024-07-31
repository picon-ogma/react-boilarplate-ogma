import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

export const AppShell = ({ children }) => {
  return (
    <Suspense fallback={<div>Your awesome spinner component goes here</div>}>
      <ErrorBoundary
        fallback={() => <div>Your error fallback component goes here</div>}
      >
        <HelmetProvider>{children}</HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

AppShell.propTypes = {
  children: PropTypes.node,
};
