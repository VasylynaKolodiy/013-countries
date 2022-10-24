import React from "react";
import Countries from "../pages/Countries/Countries";
import CountryDetailPage from "../pages/CountryDetailPage/CountryDetailPage";

export const privateRoutes = [
  {
    path: "/countries",
    component: <Countries/>,
    exact: true,
  },

  {
    path: "/",
    component: <Countries/>,
    exact: true,
  },

  {
    path: "/countries/:name",
    component: <CountryDetailPage/>,
    exact: true,
  },

]