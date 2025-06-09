import React from "react";

import type { Routes } from "./type";

export const BASE_URL = "/";
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
export const routes: Routes = [
  {
    id: "home",
    path: BASE_URL,
    element: Home,
  },
  {
    id: "about",
    path: `${BASE_URL}/about`,
    element: About,
  },
  {
    id: "404",
    path: "/*",
    element: NotFound,
  },
];
