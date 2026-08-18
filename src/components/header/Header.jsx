import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import navLogo from "../../../public/favicon.png";

// React Icons
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";

// Lucide Icons
import {
  LogOut,
  LayoutDashboard,
  BriefcaseBusiness,
} from "lucide-react";

// Components
import AuthPage from "../Auth/AuthPage";
import ThemeToggle from "../Theme/toggleTheme";

// Redux / API
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // ================= LOGOUT =================

  const handleLogout = async () => {
    try {
      
      dispatch(logout());
      
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      
      await logoutUser().unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ================= NAVIGATION =================

  const navLinks = [
    {
      name: "Find Jobs",
      path: "/find-job",
      icon: BriefcaseBusiness,
    },
    {
      name: "Companies",
      path: "/companies",
    },
  ];

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">

        {/* ================= NAVBAR ================= */}

        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            {/* Logo Image */}

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-blue-500/10 transition duration-300 group-hover:scale-105 dark:border-slate-700 dark:bg-slate-900 sm:h-12 sm:w-12">

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
          ====================================================== */}

          <div className="hidden items-center gap-10 md:flex">

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

          <div className="hidden items-center gap-3 md:flex">

            {user ? (

              <div className="relative">

                {/* Profile Button */}

                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >

                  {/* Avatar */}

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">

                    <FaRegUserCircle size={18} />

                  </div>


                  {/* User Info */}

                  <div className="hidden text-left lg:block">

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
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>


                {/* ================= PROFILE DROPDOWN ================= */}

                {isProfileOpen && (

                  <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                    {/* User Info */}

                    <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">

                      <p className="truncate font-semibold text-slate-900 dark:text-white">

                        {user?.name || "Candidate"}

                      </p>

                      <p className="truncate text-xs text-slate-500">

                        {user?.email}

                      </p>

                    </div>


                    {/* Dashboard */}

                    <Link
                      to="/candidate"
                      onClick={() => setIsProfileOpen(false)}
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
                onClick={() => setIsLoginCard(true)}
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >

                <IoMdLogIn
                  size={19}
                  className="transition-transform group-hover:translate-x-0.5"
                />

                Login / Sign Up

              </button>

            )}

            {/* Theme */}

            <ThemeToggle />

          </div>


          {/* =====================================================
              MOBILE ACTIONS
          ====================================================== */}

          <div className="flex items-center gap-2 md:hidden">

            {/* Theme */}

            <ThemeToggle />


            {/* Menu Button */}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >

              {isMenuOpen ? (

                <IoClose size={24} />

              ) : (

                <IoMenuSharp size={24} />

              )}

            </button>

          </div>

        </nav>


        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        <div
          className={`
            overflow-hidden border-t border-slate-200/70
            bg-white transition-all duration-300
            dark:border-slate-800 dark:bg-slate-950
            md:hidden

            ${
              isMenuOpen
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div className="space-y-3 px-4 py-5 sm:px-6">


            {/* ================= MOBILE USER ================= */}

            {user && (

              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">

                  <FaRegUserCircle size={20} />

                </div>

                <div className="min-w-0">

                  <p className="truncate font-bold text-slate-900 dark:text-white">

                    {user?.name || "Candidate"}

                  </p>

                  <p className="truncate text-xs text-slate-500">

                    {user?.email}

                  </p>

                </div>

              </div>

            )}


            {/* ================= MOBILE LINKS ================= */}

            {navLinks.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center rounded-2xl px-4 py-3.5
                  text-sm font-semibold transition

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-900"
                  }
                `}
              >

                {item.name}

              </NavLink>

            ))}


            {/* ================= LOGGED IN ================= */}

            {user ? (

              <>

                {/* Dashboard */}

                <Link
                  to="/candidate"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20"
                >

                  <LayoutDashboard size={18} />

                  Candidate Dashboard

                </Link>


                {/* Logout */}

                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-3.5 font-bold text-red-500 transition hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50"
                >

                  <LogOut size={18} />

                  {isLoading
                    ? "Logging out..."
                    : "Logout"}

                </button>

              </>

            ) : (

              /* LOGIN */

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginCard(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20"
              >

                <IoMdLogIn size={19} />

                Login / Sign Up

              </button>

            )}

          </div>

        </div>

      </header>


      {/* =====================================================
          AUTH MODAL
      ====================================================== */}

      {isLoginCard && (

        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          onClick={() => setIsLoginCard(false)}
        >

          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >

            <AuthPage
              onClose={() => setIsLoginCard(false)}
            />

          </div>

        </div>

      )}

    </>
  );
};

export default Header;