import { Link } from "react-router-dom";
import { jobPosts } from "../../Data/Data.js";
import { SlHeart } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { generateSlug } from "../../utils/index.js";
import { useState } from "react";

const FeaturedJobs = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-24 dark:bg-gray-950">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-14 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

          <div>
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <Sparkles size={18} className="text-blue-600" />

              <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                Top Opportunities
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Jobs
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-gray-500 dark:text-gray-400">
              Discover carefully selected opportunities from companies that
              are actively looking for talented professionals.
            </p>
          </div>

          <Link
            to="/find-jobs"
            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            Explore All Jobs

            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

        </div>


        {/* ================= JOB GRID ================= */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {jobPosts.slice(0, 6).map((job) => (

            <article
              key={job.company + job.title}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-gray-900"
            >

              {/* Featured Badge */}

              <div className="mb-6 flex items-center justify-between">

                <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Sparkles size={13} />
                  Featured
                </span>

                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-gray-700 dark:hover:bg-red-950/30"
                >
                  <SlHeart size={18} />
                </button>

              </div>


              {/* COMPANY */}

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-100 dark:border-gray-700 dark:from-gray-800 dark:to-gray-700">


                  <img
                    src={job.logo  || "/favicon.png"}
                    alt={job.company}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`h-10 w-10 object-contain transition duration-500 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"
                      }`}
                  />

                  {!loaded && <div className="h-10 w-10 animate-pulse bg-gray-200 rounded" />}

                </div>

                <div className="min-w-0">

                  <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {job.company}
                  </p>

                </div>

              </div>


              {/* JOB META */}

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">

                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {job.location || "Remote"}
                </span>

                <span className="h-1 w-1 self-center rounded-full bg-gray-300" />

                <span className="flex items-center gap-1.5">
                  <IoMdTime size={16} />
                  {job.date}
                </span>

              </div>


              {/* TAGS */}

              <div className="mt-5 flex flex-wrap gap-2">

                {job.role?.slice(0, 3).map((role, index) => (

                  <span
                    key={index}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {role}
                  </span>

                ))}

              </div>


              {/* DESCRIPTION */}

              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {job.description}
              </p>


              {/* DIVIDER */}

              <div className="my-6 h-px bg-gray-100 dark:bg-gray-800" />


              {/* FOOTER */}

              <div className="mt-auto flex items-center justify-between gap-4">

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Salary
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                    ${job.salary}
                    <span className="ml-1 text-sm font-medium text-gray-400">
                      /hr
                    </span>
                  </p>

                </div>


                <Link
                  to={`/find-job`}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  View Job
                  <ArrowUpRight size={16} />
                </Link>

              </div>


              {/* Hover Gradient */}

              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

            </article>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedJobs;