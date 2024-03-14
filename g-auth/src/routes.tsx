import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/login";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
            <>
              <Home />
            </>
          ),
        },
        { path: "/login", element: <Login /> },
      ],
    },

    {
      path: "dashboard",
      children: [
        {
          element: <Navigate to={"/dashboard/user"} replace />,
          index: true,
        },
        {
          path: "user",
          element: (
            <>
              <User />
            </>
          ),
        },
      ],
    },
  ]);
}
