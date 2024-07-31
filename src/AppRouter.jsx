import { useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthRedirect } from "./guards/AuthRedirect";
import { ProtectedAuth } from "./guards/ProtectedAuth";
import { AuthenticatedLayout } from "./layouts/AuthenticatedLayout";

const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/auth",
      element: <AuthRedirect />,
      children: [
        {
          path: "register",
          lazy: async () => {
            const { RegisterRoute } = await import("./routes/auth/register");
            return { Component: RegisterRoute };
          },
        },
        {
          path: "login",
          lazy: async () => {
            const { LoginRoute } = await import("./routes/auth/login");
            return { Component: LoginRoute };
          },
        },
        {
          path: "",
          element: <Navigate to={"/auth/login"} replace />,
        },
      ],
    },
    {
      path: "/app",
      element: (
        <ProtectedAuth>
          <AuthenticatedLayout />
        </ProtectedAuth>
      ),
      children: [
        {
          path: "user",
          lazy: async () => {
            const { UserRoute } = await import("./routes/app/user");
            return { Component: UserRoute };
          },
        },
        {
          path: "",
          lazy: async () => {
            const { DashboardRoute } = await import("./routes/app/dashboard");
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);
};

export const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};
