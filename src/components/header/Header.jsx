import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import navLogo from "../../../public/favicon.png";

// React Icons
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";

// Lucide Icons
import {
  Home,
  BriefcaseBusiness,
  Building2,
  Bookmark,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

// Components
import AuthPage from "../Auth/AuthPage";
import ThemeToggle from "../Theme/toggleTheme";

// Redux / API
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";

const Header = () => {
  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      dispatch(logout());

      setIsProfileOpen(false);

      await logoutUser().unwrap();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =====================================================
  // DESKTOP NAVIGATION
  // =====================================================

  const navLinks = [
    {
      name: "Find Jobs",
      path: "/find-job",
      icon: BriefcaseBusiness,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: Building2,
    },
  ];

  // =====================================================
  // MOBILE + TABLET BOTTOM NAVIGATION
  // =====================================================

  const mobileNavLinks = user
    ? [
        {
          name: "Home",
          path: "/",
          icon: Home,
        },
        {
          name: "Jobs",
          path: "/find-job",
          icon: BriefcaseBusiness,
        },
        {
          name: "Companies",
          path: "/companies",
          icon: Building2,
        },
        {
          name: "Saved",
          path: "/saved-jobs",
          icon: Bookmark,
        },
        {
          name: "Profile",
          path: "/candidate",
          icon: User,
        },
      ]
    : [
        {
          name: "Home",
          path: "/",
          icon: Home,
        },
        {
          name: "Jobs",
          path: "/find-job",
          icon: BriefcaseBusiness,
        },
        {
          name: "Companies",
          path: "/companies",
          icon: Building2,
        },
        {
          name: "Login",
          path: "#login",
          icon: LogIn,
        },
      ];

  return (
    <>
      {/* =====================================================
          FIXED TOP HEADER
      ====================================================== */}

     <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/90">

        {/* =====================================================
            NAVBAR
        ====================================================== */}

        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">

          {/* =====================================================
              LOGO
          ====================================================== */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            {/* Logo Image */}

            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-blue-500/10 transition duration-300 group-hover:scale-105 dark:border-slate-700 dark:bg-slate-900 sm:h-11 sm:w-11 lg:h-12 lg:w-12">

              <img
                src={navLogo}
                alt="JobHunter"
                className="h-full w-full object-cover"
              />

            </div>

            {/* Logo Text */}

            <div className="hidden sm:block">

              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">

                Job

                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                  Hunter

                </span>

              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-slate-400">

                Find your future

              </p>

            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
              ONLY 1024px+
          ====================================================== */}

          <div className="hidden items-center gap-10 lg:flex">

            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    group relative flex items-center gap-2
                    py-2 text-sm font-semibold
                    transition-all duration-300

                    ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    }

                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:h-[2px]
                    after:rounded-full
                    after:bg-gradient-to-r
                    after:from-blue-600
                    after:to-purple-600
                    after:transition-all
                    after:duration-300

                    ${
                      isActive
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {Icon && (
                    <Icon
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                  )}

                  {item.name}
                </NavLink>
              );
            })}

          </div>

          {/* =====================================================
              DESKTOP ACTIONS
          ====================================================== */}

          <div className="hidden items-center gap-3 lg:flex">

            {user ? (

              <div className="relative">

                {/* Profile Button */}

                <button
                  onClick={() =>
                    setIsProfileOpen(!isProfileOpen)
                  }
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >

                  {/* Avatar */}

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">

                    <FaRegUserCircle size={18} />

                  </div>

                  {/* User Info */}

                  <div className="hidden text-left xl:block">

                    <p className="max-w-[120px] truncate text-sm font-bold text-slate-800 dark:text-white">

                      {user?.name || "Candidate"}

                    </p>

                    <p className="text-[10px] text-slate-400">

                      Candidate

                    </p>

                  </div>

                  {/* Arrow */}

                  <FaChevronDown
                    size={11}
                    className={`text-slate-400 transition-transform duration-300 ${
                      isProfileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {/* =====================================================
                    PROFILE DROPDOWN
                ====================================================== */}

                {isProfileOpen && (

                  <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                    {/* User Information */}

                    <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">

                      <p className="truncate font-semibold text-slate-900 dark:text-white">

                        {user?.name || "Candidate"}

                      </p>

                      <p className="truncate text-xs text-slate-500">

                        {user?.email}

                      </p>

                    </div>

                    {/* Candidate Dashboard */}

                    <Link
                      to="/candidate"
                      onClick={() =>
                        setIsProfileOpen(false)
                      }
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >

                      <LayoutDashboard size={17} />

                      Candidate Dashboard

                    </Link>

                    {/* Logout */}

                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >

                      <LogOut size={17} />

                      {isLoading
                        ? "Logging out..."
                        : "Logout"}

                    </button>

                  </div>

                )}

              </div>

            ) : (

              /* LOGIN BUTTON */

              <button
                onClick={() =>
                  setIsLoginCard(true)
                }
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >

                <IoMdLogIn
                  size={19}
                  className="transition-transform group-hover:translate-x-0.5"
                />

                Login / Sign Up

              </button>

            )}

            {/* Theme Toggle */}

            <ThemeToggle />

          </div>

        

        </nav>

      </header>

      {/* =====================================================
          MOBILE + TABLET FIXED BOTTOM NAVIGATION
          < 1024px
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200/80 bg-white/95 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">

        <div
          className={`mx-auto grid h-[68px] max-w-lg ${
            user
              ? "grid-cols-5"
              : "grid-cols-4"
          }`}
        >

          {mobileNavLinks.map((item) => {

            const Icon = item.icon;

            {/* =================================================
                LOGIN BUTTON
            ================================================== */}

            if (item.name === "Login") {

              return (
                <button
                  key={item.name}
                  onClick={() =>
                    setIsLoginCard(true)
                  }
                  className="flex flex-col items-center justify-center gap-1 text-slate-500 transition active:scale-95 dark:text-slate-400"
                >

                  <div className="flex h-7 w-10 items-center justify-center">

                    <Icon size={21} />

                  </div>

                  <span className="text-[10px] font-semibold">

                    Login

                  </span>

                </button>
              );
            }

            {/* =================================================
                NORMAL NAVIGATION
            ================================================== */}

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >

                {({ isActive }) => (

                  <>

                    {/* Icon Background */}

                    <div
                      className={`flex h-7 w-10 items-center justify-center rounded-xl transition ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/40"
                          : ""
                      }`}
                    >

                      <Icon
                        size={21}
                        strokeWidth={
                          isActive
                            ? 2.5
                            : 2
                        }
                      />

                    </div>

                    {/* Label */}

                    <span className="text-[10px] font-semibold">

                      {item.name}

                    </span>

                  </>

                )}

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* =====================================================
          AUTH MODAL
      ====================================================== */}

      {isLoginCard && (

        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          onClick={() =>
            setIsLoginCard(false)
          }
        >

          <div
            className="w-full max-w-md"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <AuthPage
              onClose={() =>
                setIsLoginCard(false)
              }
            />

          </div>

        </div>

      )}

    </>
  );
};

export default Header;