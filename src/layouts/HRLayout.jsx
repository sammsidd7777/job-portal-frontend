import React from "react";
import { Outlet } from "react-router-dom";

import { useLogoutUserMutation } from "../RTK/AuthService";

import HRSidebar from "../components/hr/HRSidebar";

const HRLayout = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const  handleLogout  = ""

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* SIDEBAR */}
      <HRSidebar
        handleLogout={handleLogout}
        isLoading={isLoading}
      />

      {/* MAIN CONTENT */}
      <main className="
        flex-1
        bg-gray-50
        dark:bg-gray-950
        p-6
        overflow-x-hidden
        overflow-y-auto
      ">
        <Outlet />
      </main>

    </div>
  );
};

export default HRLayout;