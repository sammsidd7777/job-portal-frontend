import { Link } from "react-router-dom";
import { jobPosts } from "../../Data/Data.js";
import { SlHeart } from "react-icons/sl";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";
import { useState } from "react";

const FeaturedJobs = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-16 dark:bg-[#080b14]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
              Featured opportunities
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] dark:text-white">
              Jobs worth{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                exploring
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
              Explore hand-picked opportunities from companies hiring
              talented professionals right now.
            </p>
          </div>

          <Link
            to="/find-job"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
          >
            View all jobs
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =====================================================
            JOB GRID
        ===================================================== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobPosts.slice(0, 6).map((job, index) => {
            const imageKey = `${job.company}-${job.title}-${index}`;

            return (
              <article
                key={imageKey}
                className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.07] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                {/* =================================================
                    TOP ROW
                ================================================= */}
                <div className="flex items-start justify-between">
                  {/* Company logo */}
                  <div className="relative flex h-[62px] w-[62px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    {!loadedImages[imageKey] && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 animate-pulse bg-slate-100 dark:bg-slate-700"
                      />
                    )}

                    <img
                      src={job.logo || "/favicon.png"}
                      alt={`${job.company} logo`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(imageKey)}
                      onError={(e) => {
                        e.currentTarget.src = "/favicon.png";
                        handleImageLoad(imageKey);
                      }}
                      className={`h-10 w-10 object-contain transition-all duration-300 group-hover:scale-105 ${
                        loadedImages[imageKey]
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Save */}
                  <button
                    type="button"
                    aria-label={`Save ${job.title} at ${job.company}`}
                    onClick={(e) => e.preventDefault()}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                  >
                    <SlHeart
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* =================================================
                    COMPANY + DATE
                ================================================= */}
                <div className="mt-5 flex min-w-0 items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {job.company}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
                  />

                  <span className="shrink-0 text-xs font-medium text-slate-400">
                    {job.date || "Recently"}
                  </span>
                </div>

                {/* =================================================
                    JOB TITLE
                ================================================= */}
                <h4 className="mt-2 line-clamp-2 min-h-[58px] text-[22px] font-semibold leading-7 tracking-tight text-slate-950 dark:text-white">
                  {job.title}
                </h4>

                {/* =================================================
                    TAGS
                ================================================= */}
                <div className="mt-4 flex min-h-[34px] flex-wrap gap-2">
                  {job.role?.slice(0, 3).map((role, roleIndex) => (
                    <span
                      key={`${role}-${roleIndex}`}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}
                <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {job.description ||
                    "Explore this opportunity and discover how your skills can make an impact."}
                </p>

                {/* =================================================
                    SPACER
                ================================================= */}
                <div className="flex-1" />

                {/* =================================================
                    DIVIDER
                ================================================= */}
                <div
                  aria-hidden="true"
                  className="my-5 h-px bg-slate-100 dark:bg-slate-800"
                />

                {/* =================================================
                    FOOTER
                ================================================= */}
                <div className="flex items-end justify-between gap-4">
                  {/* Salary + location */}
                  <div className="min-w-0">
                    <p className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                      ${job.salary}
                      <span className="ml-1 text-xs font-medium text-slate-400">
                        /hr
                      </span>
                    </p>

                    <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs font-medium text-slate-400">
                      <MapPin
                        size={13}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      <span className="truncate">
                        {job.location || "Remote"}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/find-job"
                    className="group/btn flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    View job

                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    />
                  </Link>
                </div>

                {/* =================================================
                    HOVER DECORATION
                ================================================= */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/[0.07] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;