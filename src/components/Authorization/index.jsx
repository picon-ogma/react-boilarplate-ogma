import PropTypes from 'prop-types';
import { useAuthorization } from '../../hooks/useAuthorization';

export const Authorization = ({
  children,
  allowedRoles,
  forbiddenFallback = null,
}) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles.length) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};

Authorization.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  forbiddenFallback: PropTypes.oneOfType([PropTypes.node, PropTypes.any]),
  children: PropTypes.node,
};
