import React from "react";

import type { Routes } from "./type";

export const BASE_URL = "/";
const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
export const routes: Routes = [
  {
    id: "home",
    path: BASE_URL,
    element: Home,
  },
  {
    id: "404",
    path: "/*",
    element: NotFound,
  },
];
