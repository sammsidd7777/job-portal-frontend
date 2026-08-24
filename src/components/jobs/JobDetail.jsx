import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  ArrowUpRight,
  ArrowLeft,
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Building2,
  Tag,
  CalendarClock,
} from "lucide-react";
import getPostedTime from "./getPostedTime";

/**
 * JobDetail
 *
 * Full detail view for a single job, fed by GET /jobs/:id.
 * Reads fields straight off the `job` object (title, description,
 * location, employmentType, salaryRange, skills, jobCategory, jobType,
 * source, externalApplyUrl, uploadedByRole, companyLogo, isActive,
 * expiresAt, createdAt) — matching the Job model in the backend.
 */
const JobDetail = ({ job, isSaved = false, onSave, onApply, onBack, isSaving = false }) => {
  if (!job) return null;

  const isExternal = job.jobType === "external";
  const companyName =
    job.companyName || job.company?.companyName || job.source || "Company";
  const companyLogo = job.companyLogo || job.company?.companyLogo;
  const isExpired = job.isActive === false;

  return (
    <div className="w-full">
      {/* BACK */}
      <button
        onClick={onBack}
        className="
          mb-6 inline-flex items-center gap-1.5
          text-sm font-medium text-slate-500
          transition-colors duration-200
          hover:text-slate-900

          dark:text-slate-400 dark:hover:text-white
        "
      >
        <ArrowLeft size={15} strokeWidth={2} />
        Back to jobs
      </button>

      <article
        className="
          group relative overflow-hidden rounded-[20px]
          border border-slate-200/70 bg-white p-8
          shadow-[0_1px_2px_rgba(15,23,42,0.04)]
          transition-all duration-500 ease-out
          sm:p-10

          dark:border-white/[0.08] dark:bg-[#0B0D12]
        "
      >
        {/* ambient corner glow — same signature flourish as the card */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -right-20 -top-20 h-56 w-56
            rounded-full bg-slate-300/15 blur-3xl
            dark:bg-white/[0.05]
          "
        />

        {/* CLOSED NOTICE */}
        {isExpired && (
          <div
            className="
              relative mb-6 rounded-xl border border-rose-200 bg-rose-50
              px-4 py-3 text-[13px] font-medium text-rose-700

              dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400
            "
          >
            This listing has closed. Applications are no longer being accepted.
          </div>
        )}

        {/* HEADER */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-16 w-16 shrink-0
                items-center justify-center
                overflow-hidden rounded-2xl
                border border-slate-200/80
                bg-gradient-to-b from-slate-50 to-white
                text-lg font-semibold tracking-tight text-slate-500
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]

                dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02] dark:text-slate-400
              "
            >
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                companyName?.charAt(0)?.toUpperCase() || "J"
              )}
            </div>

            <div>
              <h1
                className="
                  font-serif text-[1.6rem] font-medium leading-tight
                  tracking-[-0.01em] text-slate-900
                  sm:text-[1.9rem]

                  dark:text-white
                "
              >
                {job.title}
              </h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Building2 size={14} strokeWidth={1.75} />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {companyName}
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span>{job.location || "Remote"}</span>
              </p>
            </div>
          </div>

          {/* SAVE */}
          <button
            onClick={() => onSave?.(job._id)}
            disabled={isSaving}
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
            className="
              shrink-0 rounded-full p-2.5
              text-slate-300
              transition-colors duration-200

              hover:bg-slate-50 hover:text-slate-700

              dark:text-slate-600
              dark:hover:bg-white/[0.06] dark:hover:text-slate-200
            "
          >
            {isSaved ? (
              <BookmarkCheck size={20} className="text-slate-900 dark:text-white" />
            ) : (
              <Bookmark size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>

        {/* TRUST BADGE */}
        <div className="relative mt-5">
          {job.uploadedByRole === "admin" ? (
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-blue-200 bg-blue-50
                px-2.5 py-1 text-[11px] font-semibold
                uppercase tracking-wide text-blue-700

                dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400
              "
            >
              <BadgeCheck size={13} strokeWidth={2.5} />
              Verified & Secure
            </span>
          ) : (
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-emerald-200 bg-emerald-50
                px-2.5 py-1 text-[11px] font-semibold
                uppercase tracking-wide text-emerald-700

                dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400
              "
            >
              <ShieldCheck size={13} strokeWidth={2.5} />
              Trusted Listing
            </span>
          )}
        </div>

        {/* META STRIP */}
        <div
          className="
            relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-2
            rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4
            text-[13px] text-slate-600

            dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-300
          "
        >
          <span className="flex items-center gap-1.5">
            <BriefcaseBusiness size={14} strokeWidth={1.75} />
            {job.employmentType}
          </span>
          <span className="hidden h-3 w-px bg-slate-200 dark:bg-white/10 sm:block" />
          <span className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={1.75} />
            {job.location || "Remote"}
          </span>
          {(job.salaryRange?.min || job.salaryRange?.max) && (
            <>
              <span className="hidden h-3 w-px bg-slate-200 dark:bg-white/10 sm:block" />
              <span className="flex items-center gap-1.5">
                <Wallet size={14} strokeWidth={1.75} />
                ₹{job.salaryRange?.min || "Negotiable"}
                {job.salaryRange?.max && <> – ₹{job.salaryRange.max}</>}
              </span>
            </>
          )}
          {job.jobCategory && (
            <>
              <span className="hidden h-3 w-px bg-slate-200 dark:bg-white/10 sm:block" />
              <span className="flex items-center gap-1.5">
                <Tag size={14} strokeWidth={1.75} />
                {job.jobCategory}
              </span>
            </>
          )}
          <span className="hidden h-3 w-px bg-slate-200 dark:bg-white/10 sm:block" />
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} strokeWidth={1.75} />
            {getPostedTime(job.createdAt)}
          </span>
          {job.expiresAt && (
            <>
              <span className="hidden h-3 w-px bg-slate-200 dark:bg-white/10 sm:block" />
              <span className="flex items-center gap-1.5">
                <CalendarClock size={14} strokeWidth={1.75} />
                Apply by {new Date(job.expiresAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>

        {/* DESCRIPTION */}
        {job.description && (
          <div className="relative mt-8">
            <h2 className="font-serif text-lg font-medium tracking-[-0.01em] text-slate-900 dark:text-white">
              About the role
            </h2>
            <p className="mt-3 whitespace-pre-line text-[14px] leading-7 text-slate-600 dark:text-slate-300">
              {job.description}
            </p>
          </div>
        )}

        {/* SKILLS */}
        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="relative mt-8">
            <h2 className="font-serif text-lg font-medium tracking-[-0.01em] text-slate-900 dark:text-white">
              Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="
                    rounded-full border border-slate-200 bg-slate-50
                    px-3 py-1 text-[12.5px] font-medium text-slate-600

                    dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* DIVIDER */}
        <div className="relative mt-9 border-t border-slate-100 dark:border-white/[0.08]" />

        {/* APPLY BAR */}
        <div className="relative mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Annual salary
            </p>
            <p className="mt-1 font-serif text-[1.5rem] font-medium tracking-tight text-slate-900 dark:text-white">
              ₹{job.salaryRange?.min || "Negotiable"}
              {job.salaryRange?.max && (
                <span className="font-sans text-base font-normal text-slate-400">
                  {" "}
                  – ₹{job.salaryRange.max}
                </span>
              )}
            </p>
          </div>

          {isExternal ? (
            <button
              onClick={() => {
                if (job.externalApplyUrl) {
                  window.open(job.externalApplyUrl, "_blank", "noopener,noreferrer");
                }
              }}
              disabled={isExpired}
              className="
                flex items-center justify-center gap-2
                rounded-xl border border-slate-900
                bg-slate-900 px-8 py-3.5
                text-sm font-semibold tracking-tight text-white
                transition-all duration-200

                hover:bg-slate-800 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)]
                disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:shadow-none

                dark:border-white dark:bg-white dark:text-slate-900
                dark:hover:bg-slate-100
              "
            >
              Apply on company site
              <ArrowUpRight size={16} strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={() => onApply?.(job)}
              disabled={isExpired}
              className="
                flex items-center justify-center gap-2
                rounded-xl border border-slate-900
                bg-slate-900 px-8 py-3.5
                text-sm font-semibold tracking-tight text-white
                transition-all duration-200

                hover:bg-slate-800 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)]
                disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:shadow-none

                dark:border-white dark:bg-white dark:text-slate-900
                dark:hover:bg-slate-100
              "
            >
              Apply now
              <ArrowUpRight size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default JobDetail;
