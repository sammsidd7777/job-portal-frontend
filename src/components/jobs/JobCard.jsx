import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const JobCard = ({
  job,
  isSaved = false,
  onSave,
  onApply,
  isSaving = false,
}) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">

      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        {/* COMPANY LOGO */}

        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg">
          {job.company?.logo ? (
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="h-full w-full object-cover"
            />
          ) : (
            job.company?.name?.charAt(0) || "J"
          )}
        </div>

        {/* SAVE */}

        <button
          onClick={() => onSave?.(job._id)}
          disabled={isSaving}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:hover:bg-blue-950/30"
        >
          {isSaved ? (
            <BookmarkCheck
              size={20}
              className="text-blue-600"
            />
          ) : (
            <Bookmark size={20} />
          )}
        </button>

      </div>

      {/* JOB TITLE */}

      <div className="mt-5">

        <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition group-hover:text-blue-600 dark:text-white">
          {job.title}
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          {job.company?.name || "Company"}
        </p>

      </div>

      {/* META */}

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <BriefcaseBusiness size={13} />
          {job.employmentType || "Full-time"}
        </span>

        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <MapPin size={13} />
          {job.location || "Remote"}
        </span>

      </div>

      {/* DESCRIPTION */}

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {job.description || "Explore this exciting career opportunity and take the next step in your professional journey."}
      </p>

      {/* BOTTOM */}

      <div className="mt-auto pt-6">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-400">
              Salary
            </p>

            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              ₹{job.salaryRange?.min || "Negotiable"}
              {job.salaryRange?.max && (
                <> – ₹{job.salaryRange.max}</>
              )}
            </p>

          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock3 size={14} />
            Recently posted
          </div>

        </div>

        {/* APPLY */}

        <button
          onClick={() => onApply?.(job)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Apply Now
          <ArrowUpRight size={18} />
        </button>

      </div>

    </article>
  );
};

export default JobCard;