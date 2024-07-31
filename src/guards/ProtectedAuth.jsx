import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const ProtectedAuth = ({ children }) => {
  const user = null; // Replace with proper user data source

  if (!user?.data) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

ProtectedAuth.propTypes = {
  children: PropTypes.node,
};
