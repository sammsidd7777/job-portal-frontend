import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import React, { react } from "react";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  Bell,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../RTK/AuthService";

import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import navLogo from "../assets/hero.png";
import Loader from "../helper/Loader ";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/candidate/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    path: "/candidate/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: "Saved Jobs",
    path: "/candidate/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "Notifications",
    path: "/candidate/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/candidate/profile",
    icon: UserRound,
  },
];

const CandidateLayout = () => {
  const {
    data: user,
    isLoading,
  } = useGetProfileQuery();

  const [
    logoutUser,
    { isLoading: isLoggingOut },
  ] = useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Drawer state
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());

      setIsSidebarOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =====================================================
  // CLOSE SIDEBAR
  // =====================================================

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (isLoading) {
    return <Loader message="Loading dashboard" />;
  }

 return (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

    {/* ================= MOBILE OVERLAY ================= */}

    {isSidebarOpen && (
      <div
        onClick={closeSidebar}
        className="
          fixed inset-0 z-[90]
          bg-black/50
          backdrop-blur-sm
          lg:hidden
        "
      />
    )}

    {/* ================= MOBILE TOP BAR ================= */}

 <header
  className="
    sticky top-0 z-40
    flex h-16 items-center
    border-b border-slate-200
    bg-white/95 px-4
    backdrop-blur-xl
    dark:border-slate-800
    dark:bg-slate-900/95
    lg:hidden
  "
>
  {/* LOGO - LEFT */}

  <Link
    to="/"
    className="flex items-center gap-2"
  >
    <img
      src={navLogo}
      alt="JobHunter"
      className="h-9 w-9 rounded-lg object-cover"
    />

    <div>
      <h1 className="text-sm font-bold">
        Job<span className="text-blue-600">Hunter</span>
      </h1>

      <p className="text-[10px] text-slate-400">
        Career Dashboard
      </p>
    </div>
  </Link>


  {/* MENU - RIGHT */}

  <button
    onClick={() => setIsSidebarOpen(true)}
    className="
      ml-auto
      flex h-10 w-10
      items-center justify-center
      rounded-xl
      border border-slate-200
      bg-white
      text-slate-700
      shadow-sm
      transition
      hover:border-blue-500
      hover:bg-blue-50
      hover:text-blue-600
      dark:border-slate-700
      dark:bg-slate-900
      dark:text-slate-200
      dark:hover:bg-slate-800
    "
    aria-label="Open menu"
  >
    <Menu size={23} />
  </button>

</header>


    {/* ================= DESKTOP + DRAWER ================= */}

    <div className="lg:flex">

      {/* SIDEBAR */}

   {/* ================= SIDEBAR ================= */}

<aside
  className={`
    fixed inset-y-0 right-0 z-[100]
    flex w-[290px] flex-col
    overflow-hidden
    border-l border-slate-200/80
    bg-white/95
    shadow-2xl shadow-slate-900/10
    backdrop-blur-xl
    transition-transform duration-300 ease-out

    dark:border-slate-800
    dark:bg-slate-950/95

    ${
      isSidebarOpen
        ? "translate-x-0"
        : "translate-x-full"
    }

    lg:sticky
    lg:top-0
    lg:h-screen
    lg:translate-x-0
    lg:border-l-0
    lg:border-r
    lg:shadow-none
  `}
>
  {/* ================= TOP SECTION ================= */}

  <div className="px-5 pt-5">

    {/* Mobile Close */}
    <div className="mb-4 flex items-center justify-between lg:hidden">

      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Menu
      </span>

      <button
        onClick={closeSidebar}
        className="
          flex h-9 w-9 items-center justify-center
          rounded-xl
          border border-slate-200
          bg-slate-50
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-900
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-300
        "
      >
        <X size={19} />
      </button>

    </div>


    {/* Logo */}

    <Link
      to="/"
      onClick={closeSidebar}
      className="
        group mb-7 flex items-center gap-3
        rounded-2xl p-2
        transition
        hover:bg-slate-50
        dark:hover:bg-slate-900
      "
    >

      <div
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          overflow-hidden
          rounded-xl
          bg-blue-600
          shadow-lg shadow-blue-600/20
        "
      >
        <img
          src={navLogo}
          alt="JobHunter"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0">

        <h1 className="text-lg font-bold tracking-tight">
          Job<span className="text-blue-600">Hunter</span>
        </h1>

        <p className="text-[11px] text-slate-400">
          Career Dashboard
        </p>

      </div>

    </Link>


    {/* ================= USER CARD ================= */}

    <div
      className="
        relative mb-7 overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-gradient-to-br from-blue-50 via-white to-slate-50
        p-4
        dark:border-slate-800
        dark:from-blue-950/30
        dark:via-slate-900
        dark:to-slate-900
      "
    >

      {/* Decorative circle */}

      <div
        className="
          absolute -right-8 -top-8
          h-20 w-20 rounded-full
          bg-blue-500/10
        "
      />

      <div className="relative flex items-center gap-3">

        {/* Avatar */}

        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-500 to-blue-700
            text-sm font-bold text-white
            shadow-md shadow-blue-600/20
          "
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>


        {/* User Info */}

        <div className="min-w-0 flex-1">

          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
            {user?.name || "User"}
          </p>

          <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
            {user?.email || "user@example.com"}
          </p>

        </div>

      </div>

    </div>

  </div>


  {/* ================= NAVIGATION ================= */}

  <div className="flex-1 overflow-y-auto px-4">

    <p
      className="
        mb-3 px-3
        text-[10px]
        font-bold
        uppercase
        tracking-[0.15em]
        text-slate-400
      "
    >
      Workspace
    </p>


    <nav className="space-y-1.5">

      {navigationItems.map((item) => {

        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) => `
              group relative
              flex items-center gap-3
              rounded-xl
              px-3.5 py-3
              text-sm font-medium
              transition-all duration-200

              ${
                isActive
                  ? `
                    bg-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                  `
                  : `
                    text-slate-600
                    hover:bg-slate-100
                    hover:text-slate-900
                    dark:text-slate-300
                    dark:hover:bg-slate-900
                    dark:hover:text-white
                  `
              }
            `}
          >

            {({ isActive }) => (
              <>
                {/* Icon */}

                <span
                  className={`
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    transition

                    ${
                      isActive
                        ? "bg-white/15"
                        : "bg-slate-100 dark:bg-slate-800"
                    }
                  `}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>


                {/* Name */}

                <span className="flex-1">
                  {item.name}
                </span>


                {/* Active Indicator */}

                {isActive && (
                  <span
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-white
                    "
                  />
                )}
              </>
            )}

          </NavLink>
        );
      })}

    </nav>

  </div>


  {/* ================= BOTTOM SECTION ================= */}

  <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">

    {/* Logout */}

    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="
        group flex w-full
        items-center gap-3
        rounded-xl
        px-3.5 py-3
        text-sm font-medium
        text-red-600
        transition
        hover:bg-red-50
        disabled:cursor-not-allowed
        disabled:opacity-60
        dark:text-red-400
        dark:hover:bg-red-950/30
      "
    >

      <span
        className="
          flex h-9 w-9
          items-center justify-center
          rounded-lg
          bg-red-50
          transition
          group-hover:bg-red-100
          dark:bg-red-950/40
          dark:group-hover:bg-red-950/60
        "
      >
        <LogOut size={18} />
      </span>

      <span>
        {isLoggingOut
          ? "Logging out..."
          : "Logout"}
      </span>

    </button>


    {/* Version */}

    <p className="mt-4 text-center text-[10px] text-slate-400">
      JobHunter • Candidate Portal
    </p>

  </div>

</aside>


      {/* ================= MAIN CONTENT ================= */}

      <main
        className="
          min-w-0
          flex-1
          p-4
          sm:p-6
          lg:p-8
        "
      >

        <Outlet />

      </main>

    </div>

  </div>
);
};


// =====================================================
// NAVIGATION CLASS
// =====================================================

const navClass = ({ isActive }) => {

  return `
    flex
    items-center
    justify-between
    rounded-xl
    px-4
    py-3
    text-sm
    transition

    ${
      isActive
        ? "bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }
  `;
};

export default CandidateLayout;