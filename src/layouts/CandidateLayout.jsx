import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  Bell,
  UserRound,
  LogOut,
} from "lucide-react";

import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../RTK/AuthService";

import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import navLogo from "../assets/hero.png";

const navigationItems = [

    {
    name: "",
    path: "/candidate/dashboard",
    icon: LayoutDashboard,
  },,
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

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* SIDEBAR */}

      <aside className="flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-900">

        {/* LOGO */}

        <Link
          to="/"
          className="mb-10 flex items-center gap-3"
        >
          <img
            src={navLogo}
            alt="JobHunter"
            className="h-11 w-11 rounded-xl object-cover"
          />

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Job<span className="text-blue-600">Hunter</span>
            </h1>

            <p className="text-xs text-slate-500">
              Career Dashboard
            </p>
          </div>
        </Link>


        {/* USER PROFILE */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">

              <p className="truncate font-semibold">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 space-y-1">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {navigationItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={navClass}
              >
                <span className="flex items-center gap-3">

                  <Icon size={18} />

                  {item.name}

                </span>

              </NavLink>
            );
          })}

        </nav>


        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
        >

          <LogOut size={18} />

          {isLoggingOut
            ? "Logging out..."
            : "Logout"}

        </button>

      </aside>


      {/* MAIN CONTENT */}

      <main className="min-w-0 flex-1 overflow-y-auto p-6 lg:p-8">

        <Outlet />

      </main>

    </div>
  );
};


const navClass = ({ isActive }) => {

  return `
    flex items-center justify-between rounded-xl px-4 py-3 text-sm transition
    ${
      isActive
        ? "bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }
  `;
};


export default CandidateLayout;