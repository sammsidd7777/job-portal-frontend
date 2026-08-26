import { Link, NavLink } from "react-router-dom";

// =====================================================
// FUTURE AUTH IMPORTS
// Keep these commented for now
// =====================================================

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { IoMdLogIn } from "react-icons/io";
// import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";

// import {
//   Bookmark,
//   User,
//   LogIn,
//   LogOut,
//   LayoutDashboard,
// } from "lucide-react";

// import AuthPage from "../Auth/AuthPage";

// import { logout } from "../../redux/authSlice";
// import { useLogoutUserMutation } from "../../RTK/AuthService";

// =====================================================
// ACTIVE IMPORTS
// =====================================================

import navLogo from "../../../public/favicon.png";

import {
  Home,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

const Header = () => {

  // =====================================================
  // FUTURE AUTH STATE
  // Uncomment when Login / Candidate system is enabled
  // =====================================================

  /*
  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] =
    useLogoutUserMutation();
  */

  // =====================================================
  // FUTURE LOGOUT
  // =====================================================

  /*
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
  */

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
  // MOBILE NAVIGATION
  // PUBLIC VERSION
  // =====================================================

  const mobileNavLinks = [
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

    /*
    // ===================================================
    // FUTURE USER NAVIGATION
    // ===================================================

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

    */
  ];

  return (
    <>
      {/* =====================================================
          FIXED TOP HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/90">

        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">

          {/* =====================================================
              LOGO
          ====================================================== */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-blue-500/10 transition duration-300 group-hover:scale-105 group-hover:shadow-blue-500/20 dark:border-slate-700 dark:bg-slate-900 sm:h-11 sm:w-11 lg:h-12 lg:w-12">

              <img
                src={navLogo}
                alt="JobHunter"
                className="h-full w-full object-cover"
              />

            </div>

            <div className="hidden sm:block">

             <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">

                Job

                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                  Hunter

                </span>

              </div>

           <p className="text-xs font-medium tracking-wide text-slate-400">
  Find your future
</p>

            </div>

          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
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

                  <Icon
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  {item.name}

                </NavLink>
              );

            })}

          </div>

          {/* =====================================================
              DESKTOP RIGHT SIDE
              PUBLIC TEMPORARY UI
          ====================================================== */}

          <div className="hidden items-center lg:flex">

          <div className="flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-50" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500 dark:bg-slate-400" />
  </span>

  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
    More features coming soon
  </span>
</div>

          </div>

          {/* =====================================================
              FUTURE LOGIN / PROFILE AREA
              =====================================================

          <div className="hidden items-center gap-3 lg:flex">

            {user ? (

              <div className="relative">

                <button
                  onClick={() =>
                    setIsProfileOpen(!isProfileOpen)
                  }
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">

                    <FaRegUserCircle size={18} />

                  </div>

                  <div className="hidden text-left xl:block">

                    <p className="max-w-[120px] truncate text-sm font-bold text-slate-800 dark:text-white">

                      {user?.name || "Candidate"}

                    </p>

                    <p className="text-[10px] text-slate-400">

                      Candidate

                    </p>

                  </div>

                  <FaChevronDown
                    size={11}
                    className={`text-slate-400 transition-transform duration-300 ${
                      isProfileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {isProfileOpen && (

                  <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                    <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">

                      <p className="truncate font-semibold text-slate-900 dark:text-white">

                        {user?.name || "Candidate"}

                      </p>

                      <p className="truncate text-xs text-slate-500">

                        {user?.email}

                      </p>

                    </div>

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

          </div>

          */}

        </nav>

      </header>

      {/* =====================================================
          MOBILE + TABLET BOTTOM NAVIGATION
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200/80 bg-white/95 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">

        <div className="mx-auto grid h-[68px] max-w-lg grid-cols-3">

          {mobileNavLinks.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >

                {({ isActive }) => (
                  <>

                    <div
                      className={`
                        flex h-8 w-11 items-center justify-center
                        rounded-xl
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-50 shadow-sm shadow-blue-500/10 dark:bg-blue-950/40"
                            : ""
                        }
                      `}
                    >

                      <Icon
                        size={21}
                        strokeWidth={isActive ? 2.5 : 2}
                      />

                    </div>

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
          FUTURE AUTH MODAL
      ====================================================== */}

      {/*
      
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

      */}

    </>
  );
};

export default Header;