import { useCallback } from "react";

export const useAuthorization = () => {
  const user = null; // Replace with proper user data source

  if (!user?.data) {
    throw Error("User does not exist!");
  }

  const checkAccess = useCallback(
    ({ allowedRoles }) => {
      if (allowedRoles?.length > 0 && user.role) {
        return allowedRoles.includes(user.role);
      }

      return true;
    },
    [user]
  );

  return { checkAccess, role: user.role };
};
