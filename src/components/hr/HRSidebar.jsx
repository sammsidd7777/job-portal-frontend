import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  BriefcaseBusiness,
  Users,
  MessageCircle,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

import logo from "../../../public/favicon.png";
import { useLogoutUserMutation } from "../../RTK/AuthService";

const HRSidebar = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const  handleLogout =()=>{

  } 

  const menuItems = [
    {
      path: "/hr/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/hr/add-job",
      label: "Add Job",
      icon: Plus,
    },
    {
      path: "/hr/manage-jobs",
      label: "Manage Jobs",
      icon: BriefcaseBusiness,
    },
    {
      path: "/hr/applicants",
      label: "Applicants",
      icon: Users,
    },
    {
      path: "/hr/messages",
      label: "Messages",
      icon: MessageCircle,
    },
    {
      path: "/hr/company",
      label: "Company Profile",
      icon: Building2,
    },
    {
      path: "/hr/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="
        hidden md:flex
        w-72 shrink-0 h-screen
        flex-col
        bg-gradient-to-b
        from-purple-600
        via-purple-500
        to-indigo-600
        px-5 py-6
      "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 rounded-2xl bg-purple-800/80 px-5 py-4 mb-8">
        <img
          src={logo}
          alt="Job Hunter"
          className="w-12 h-12 object-contain"
        />

        <div>
          <h1 className="text-xl font-bold text-white">
            Job Hunter
          </h1>

          <p className="text-sm text-purple-200">
            HR Portal
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4
                rounded-2xl px-5 py-4
                transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-purple-700 shadow-lg"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="
          flex items-center gap-4
          rounded-2xl
          px-5 py-4
          text-white
          transition-all duration-300
          hover:bg-white/15
          disabled:opacity-60
        "
      >
        <LogOut size={21} />

        <span className="font-medium">
          {isLoading ? "Logging out..." : "Logout"}
        </span>
      </button>
    </aside>
  );
};

export default HRSidebar;