import { Link } from "react-router-dom";
import {
  useGetUserDashboardQuery,
} from "../../RTK/AuthService";

const Dashboard = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserDashboardQuery();

  const dashboardData = userData?.data;

  const similarJobs = dashboardData?.similarJobs || [];
  const thingsToUpdate = dashboardData?.thingsToUpdate || [];

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="min-w-0">

          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
            {dashboardData?.userName || "User"}! 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Here are your recommendations today.
          </p>

        </div>


        {/* ACTION BUTTONS */}

        <div className="grid grid-cols-2 gap-3 sm:flex">

          <Link
            to="/candidate/profile"
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-center
              text-sm
              font-medium
              transition
              hover:bg-slate-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:hover:bg-slate-800
            "
          >
            Edit Profile
          </Link>

          <Link
            to="/candidate/resume"
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-center
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
              sm:px-5
            "
          >
            Update Resume
          </Link>

        </div>

      </div>


      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

        {[
          {
            label: "Interviews",
            value: dashboardData?.totalInterview || 0,
          },
          {
            label: "Profile Views",
            value: dashboardData?.totalProfileView || 0,
          },
          {
            label: "Saved Jobs",
            value: dashboardData?.totalSavedJob || 0,
          },
          {
            label: "Applications",
            value: dashboardData?.totalApplication || 0,
          },
        ].map((item) => (

          <div
            key={item.label}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
              sm:p-6
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              {item.label}
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
              {item.value}
            </h2>

          </div>

        ))}

      </div>


      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-3">


        {/* =====================================================
            RECOMMENDED JOBS
        ====================================================== */}

        <section className="min-w-0 space-y-5 xl:col-span-2">

          <div className="flex items-end justify-between gap-4">

            <div className="min-w-0">

              <h2 className="text-lg font-bold sm:text-xl">
                Recommended Jobs
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Jobs matching your profile and preferences.
              </p>

            </div>

            <Link
              to="/find-job"
              className="
                shrink-0
                text-xs
                font-medium
                text-blue-600
                hover:text-blue-700
                sm:text-sm
              "
            >
              View All
            </Link>

          </div>


          {/* NO JOBS */}

          {similarJobs.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                p-8
                text-center
                dark:border-slate-700
                dark:bg-slate-900
              "
            >

              <h3 className="font-semibold">
                No recommended jobs yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Complete your profile to get better job recommendations.
              </p>

              <Link
                to="/candidate/profile"
                className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Complete Profile
              </Link>

            </div>

          ) : (

            <div className="space-y-4">

              {similarJobs.map((job) => (

                <div
                  key={job._id}
                  className="
                    flex
                    flex-col
                    gap-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    transition
                    hover:shadow-md
                    sm:p-6
                    md:flex-row
                    md:items-center
                    md:justify-between
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >

                  {/* JOB INFO */}

                  <div className="min-w-0">

                    <h3 className="truncate text-base font-semibold sm:text-lg">
                      {job.title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {job.company?.name || "Company"}
                    </p>


                    {/* TAGS */}

                    <div className="mt-3 flex flex-wrap gap-2">

                      {job.employmentType && (
                        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {job.employmentType}
                        </span>
                      )}

                      {(job.salaryRange?.min ||
                        job.salaryRange?.max) && (

                        <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">

                          ₹{job.salaryRange?.min || 0}

                          {" - "}

                          ₹{job.salaryRange?.max || 0}

                        </span>

                      )}

                    </div>

                  </div>


                  {/* VIEW JOB */}

                  <Link
                    to={`/jobs/${job._id}`}
                    className="
                      w-full
                      shrink-0
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-2.5
                      text-center
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-blue-700
                      sm:w-auto
                    "
                  >
                    View Job
                  </Link>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =====================================================
            RIGHT SIDEBAR
        ====================================================== */}

        <aside className="space-y-6">


          {/* =====================================================
              PROFILE COMPLETION
          ====================================================== */}

          <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-lg shadow-blue-600/20 sm:p-6">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                Complete Profile
              </h3>

              <span className="text-sm font-semibold">
                {dashboardData?.profileScore || 0}%
              </span>

            </div>


            {/* PROGRESS */}

            <div className="mb-5 h-2 overflow-hidden rounded-full bg-blue-400">

              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{
                  width: `${dashboardData?.profileScore || 0}%`,
                }}
              />

            </div>


            {/* THINGS TO UPDATE */}

            {thingsToUpdate.length > 0 ? (

              <div className="space-y-2">

                {thingsToUpdate.map((item) => (

                  <p
                    key={item}
                    className="text-xs text-blue-100"
                  >
                    • {item}
                  </p>

                ))}

              </div>

            ) : (

              <p className="text-sm text-blue-100">
                Your profile is complete 🎉
              </p>

            )}

          </div>


          {/* =====================================================
              RECENT ACTIVITY
          ====================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <h3 className="mb-5 font-semibold">
              Recent Activity
            </h3>

            <div className="space-y-5">

              <div>

                <p className="text-sm font-medium">
                  🔵 Application Viewed
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your application was viewed by a recruiter.
                </p>

                <span className="mt-1 block text-xs text-slate-400">
                  2 hours ago
                </span>

              </div>


              <div>

                <p className="text-sm font-medium">
                  🟢 New Job Match
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  A new job matches your profile.
                </p>

                <span className="mt-1 block text-xs text-slate-400">
                  5 hours ago
                </span>

              </div>


              <div>

                <p className="text-sm font-medium">
                  🟠 Interview Reminder
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  You have an upcoming interview.
                </p>

                <span className="mt-1 block text-xs text-slate-400">
                  1 day ago
                </span>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};

export default Dashboard;