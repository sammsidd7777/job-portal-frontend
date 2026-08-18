import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  ArrowUpRight,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const JobCard = ({
  job,
  isSaved = false,
  onSave,
  onApply,
  isSaving = false,
  jobType,
  logo,
  uploadedByRole,
  featured = false,
}) => {
  // External job uses companyLogo
  // Internal job uses company.logo
  const companyLogo =
    jobType === "external" ? logo || job?.companyLogo : job?.company?.logo;

  const companyName =
    jobType === "external"
      ? job?.companyName || "Company"
      : job?.company?.name || "Company";

  return (
    <article
      className={`
        group relative flex h-full flex-col
        overflow-hidden rounded-[20px]
        border bg-white p-7
        transition-all duration-500 ease-out

        dark:bg-[#0B0D12]

        ${
          featured
            ? `
              border-amber-300/60
              shadow-[0_1px_2px_rgba(15,23,42,0.06),0_0_0_1px_rgba(245,158,11,0.08)]
              hover:-translate-y-1
              hover:border-amber-400/70
              hover:shadow-[0_28px_56px_-16px_rgba(180,120,10,0.22),0_0_0_1px_rgba(245,158,11,0.18)]

              dark:border-amber-500/25
              dark:hover:border-amber-500/40
            `
            : `
              border-slate-200/70
              shadow-[0_1px_2px_rgba(15,23,42,0.04)]
              hover:-translate-y-1
              hover:border-slate-300
              hover:shadow-[0_28px_56px_-16px_rgba(15,23,42,0.20)]

              dark:border-white/[0.08]
              dark:hover:border-white/[0.16]
            `
        }
      `}
    >
      {/* ambient corner glow — the signature flourish, spent once */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute -right-16 -top-16 h-40 w-40
          rounded-full blur-3xl
          transition-opacity duration-500
          opacity-0 group-hover:opacity-100
          ${featured ? "bg-amber-300/25" : "bg-slate-300/20 dark:bg-white/[0.06]"}
        `}
      />

      {/* FEATURED RIBBON */}
      {featured && (
        <div className="mb-5 -mt-1 flex items-center gap-1.5">
          <Sparkles size={13} strokeWidth={2} className="text-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-600 dark:text-amber-400">
            Featured opportunity
          </span>
        </div>
      )}

      {/* TOP */}
      <div className="relative flex items-start justify-between gap-4">
        {/* COMPANY LOGO */}
        <div
          className="
            flex h-14 w-14 shrink-0
            items-center justify-center
            overflow-hidden rounded-2xl
            border border-slate-200/80
            bg-gradient-to-b from-slate-50 to-white
            text-base font-semibold tracking-tight text-slate-500
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

        {/* SAVE */}
        <button
          onClick={() => onSave?.(job._id)}
          disabled={isSaving}
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          className="
            rounded-full p-2
            text-slate-300
            transition-colors duration-200

            hover:bg-slate-50 hover:text-slate-700

            dark:text-slate-600
            dark:hover:bg-white/[0.06] dark:hover:text-slate-200
          "
        >
          {isSaved ? (
            <BookmarkCheck size={19} className="text-slate-900 dark:text-white" />
          ) : (
            <Bookmark size={19} strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* JOB TITLE */}
      <div className="relative mt-6">
        <h3
          className="
            line-clamp-1
            font-serif text-[1.3rem] font-medium
            tracking-[-0.01em] text-slate-900

            dark:text-white
          "
        >
          {job.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">{companyName}</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>{job.location || "Remote"}</span>
        </p>
      </div>

      {/* TRUST BADGE */}
      <div className="relative mt-4">
        {uploadedByRole === "admin" ? (
          <span
            className="
              inline-flex items-center gap-1.5
              rounded-full border border-slate-200 bg-slate-50/80
              px-2.5 py-1
              text-[11px] font-semibold uppercase tracking-wide text-slate-600

              dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300
            "
          >
            <BadgeCheck size={13} strokeWidth={2} />
            Verified & secure
          </span>
        ) : (
          <span
            className="
              inline-flex items-center gap-1.5
              rounded-full border border-slate-200 bg-slate-50/80
              px-2.5 py-1
              text-[11px] font-semibold uppercase tracking-wide text-slate-500

              dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400
            "
          >
            <ShieldCheck size={13} strokeWidth={2} />
            Trusted listing
          </span>
        )}
      </div>

      {/* META */}
      <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <BriefcaseBusiness size={14} strokeWidth={1.75} />
          {job.employmentType || "Full-time"}
        </span>
        <span className="h-3 w-px bg-slate-200 dark:bg-white/10" />
        <span className="flex items-center gap-1.5">
          <MapPin size={14} strokeWidth={1.75} />
          {job.location || "Remote"}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p
        className="
          relative mt-5 line-clamp-2
          text-[13.5px] leading-6 text-slate-500

          dark:text-slate-400
        "
      >
        {job.description ||
          "Explore this opportunity and take the next step in your professional journey."}
      </p>

      {/* DIVIDER */}
      <div className="relative mt-6 border-t border-slate-100 dark:border-white/[0.08]" />

      {/* BOTTOM */}
      <div className="relative pt-5">
        {/* SALARY */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Annual salary
            </p>
            <p className="mt-1 font-serif text-[1.4rem] font-medium tracking-tight text-slate-900 dark:text-white">
              ₹{job.salaryRange?.min || "Negotiable"}
              {job.salaryRange?.max && (
                <span className="font-sans text-base font-normal text-slate-400">
                  {" "}
                  – ₹{job.salaryRange.max}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-1 text-[12px] text-slate-400">
            <Clock3 size={13} strokeWidth={1.75} />
            Recently posted
          </div>
        </div>

        {/* APPLY */}
        {job.jobType === "external" ? (
          <button
            onClick={() => {
              if (job.externalApplyUrl) {
                window.open(job.externalApplyUrl, "_blank", "noopener,noreferrer");
              }
            }}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl border border-slate-900
              bg-slate-900 py-3.5
              text-sm font-semibold tracking-tight text-white
              transition-all duration-200

              hover:bg-slate-800 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)]

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
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl border border-slate-900
              bg-slate-900 py-3.5
              text-sm font-semibold tracking-tight text-white
              transition-all duration-200

              hover:bg-slate-800 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)]

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
  );
};

export default JobCard;