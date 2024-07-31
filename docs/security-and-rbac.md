# 🔐 Security

For a full list of security risks, check [OWASP](https://owasp.org/www-project-top-10-client-side-security-risks/).

#### Handling user data

User information should be treated as a central piece of data accessible throughout the application. If you are already using `react-query/redux-query`, consider using it for storing user data as well. Alternatively, you can leverage React context with hooks or opt for a third-party client-side state management library to efficiently manage user state across your application.

### Authorization

Authorization is the process of verifying whether a user has permission to access a specific resource within the application.

#### RBAC (Role based access control)

[Authorization Configuration Example Code](../src/components/Authorization/index.jsx)

In a role-based authorization model, access to resources is determined by defining specific roles, permissions and associating them with permissions. For example, roles such as `USER` and `ADMIN` can be assigned different levels of access rights within the application. Users are then granted access based on their roles; for instance, restricting certain functionalities to regular users while permitting administrators to access all features and functionalities.

```jsx
<Authorization allowedRoles={[UserRoles.ADMIN]}>
  <DeleteUserAccount />
</Authorization>
```

Instead of the **Authorization** component, you can use the **useAuthorization** hook to enforce RBAC and filter/manipulate data based on user role. e.g.

```jsx
export function SomeComponent() {
  const { checkAccess } = useAuthorization();
  const navigationItems = [
    { name: 'Dashboard', to: '.' },
    { name: 'Discussions', to: './discussions' },
    checkAccess({ allowedRoles: [UserRoles.ADMIN] }) && {
      name: 'Users',
      to: './users',
    },
  ].filter(Boolean);

  return <>...</>;
}
```

## Additional Notes:

**Authorization** and **useAuthorization** are just bare-bone implementations to give you the idea. You can modify and extend the implementation according to your project requirements. But make sure to avoid if/else in every component for RBAC. You can also implement PBAC (Policy Based Access Control) using the same **Authorization** component as well. If you need any help with RBAC/PBAC, feel free to reach out to me!
