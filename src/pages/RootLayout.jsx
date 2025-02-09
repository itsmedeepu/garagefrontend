import React from "react";
import MainLayout from "./MainLayout";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <MainLayout />
      <Outlet />
    </>
  );
}

export default RootLayout;
