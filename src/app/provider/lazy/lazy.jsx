import { lazy } from "react";

export const Layout = lazy(() => import("../layout/layout.jsx"));
export const Login = lazy(() => import("../pages/login/login.jsx"));
export const AddBalance = lazy(() =>
  import("../pages/addBalance/addBalance.jsx")
);
