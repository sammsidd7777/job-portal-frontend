import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";
import getPostedTime from "./getPostedTime";

const JobCard = ({
  job,
  isSaved = false,
  onSave,
  onApply,
  isSaving = false,
  jobType,
  companyLogo,
  uploadedByRole,
  featured = false,
}) => {
  // =====================================================
  // COMPANY
  // =====================================================

  const isExternal =
    jobType === "external" || job?.jobType === "external";

  const companyName = isExternal
    ? job?.companyName || "Company"
    : job?.company?.companyName ||
      job?.companyName ||
      "Company";

  const resolvedLogo =
    companyLogo ||
    job?.companyLogo ||
    job?.company?.companyLogo ||
    "";

  // =====================================================
  // APPLY METHOD
  // =====================================================

  const applyMethod = job?.applyMethod;

  // =====================================================
  // WHATSAPP APPLY
  // =====================================================

  const handleWhatsAppApply = () => {
    if (!job?.whatsappNumber) return;

    const number = String(job.whatsappNumber).replace(/\D/g, "");

    if (!number) return;

    const message =
      job?.whatsappMessage ||
      `Hi, I am interested in the ${job?.title || "job"} position at ${companyName}.`;

    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // WEBSITE APPLY
  // =====================================================

  const handleWebsiteApply = () => {
    if (!job?.externalApplyUrl) return;

    window.open(
      job.externalApplyUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // INTERNAL APPLY
  // =====================================================

  const handleInternalApply = () => {
    if (!job?._id) return;

    onApply?.(job);
  };

  // =====================================================
  // APPLY BUTTON
  // =====================================================

  const renderApplyButton = () => {
    // ---------------------------------------------------
    // WHATSAPP
    // ---------------------------------------------------

    if (
      applyMethod === "whatsapp" &&
      job?.whatsappNumber
    ) {
      return (
        <button
          type="button"
          onClick={handleWhatsAppApply}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-emerald-700
            hover:shadow-md
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-[#0f1117]
          "
        >
          Apply via WhatsApp
          <MessageCircle
            size={14}
            strokeWidth={2.2}
          />
        </button>
      );
    }

    // ---------------------------------------------------
    // WEBSITE
    // ---------------------------------------------------

    if (
      applyMethod === "website" &&
      job?.externalApplyUrl
    ) {
      return (
        <button
          type="button"
          onClick={handleWebsiteApply}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-slate-800
            hover:shadow-md
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-500
            focus-visible:ring-offset-2
            dark:bg-white
            dark:text-slate-950
            dark:hover:bg-slate-100
            dark:focus-visible:ring-offset-[#0f1117]
          "
        >
          Apply now
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
          />
        </button>
      );
    }

    // ---------------------------------------------------
    // EXTERNAL FALLBACK
    // ---------------------------------------------------

    if (
      isExternal &&
      job?.externalApplyUrl
    ) {
      return (
        <button
          type="button"
          onClick={handleWebsiteApply}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-slate-800
            hover:shadow-md
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-500
            focus-visible:ring-offset-2
            dark:bg-white
            dark:text-slate-950
            dark:hover:bg-slate-100
            dark:focus-visible:ring-offset-[#0f1117]
          "
        >
          Apply now
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
          />
        </button>
      );
    }

    // ---------------------------------------------------
    // INTERNAL
    // ---------------------------------------------------

    if (
      !isExternal &&
      (applyMethod === "internal" || !applyMethod)
    ) {
      return (
        <button
          type="button"
          onClick={handleInternalApply}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-slate-800
            hover:shadow-md
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-500
            focus-visible:ring-offset-2
            dark:bg-white
            dark:text-slate-950
            dark:hover:bg-slate-100
            dark:focus-visible:ring-offset-[#0f1117]
          "
        >
          Apply now
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
          />
        </button>
      );
    }

    // ---------------------------------------------------
    // UNAVAILABLE
    // ---------------------------------------------------

    return (
      <button
        type="button"
        disabled
        className="
          inline-flex
          cursor-not-allowed
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          px-4
          py-2.5
          text-xs
          font-semibold
          text-slate-400
          dark:bg-white/[0.06]
          dark:text-slate-500
        "
      >
        Apply unavailable
      </button>
    );
  };

  // =====================================================
  // LOCATION
  // =====================================================

  const location = job?.location || "Remote";

  // =====================================================
  // REMOTE
  // =====================================================

  const isRemote =
    location
      .toLowerCase()
      .includes("remote") ||
    location
      .toLowerCase()
      .includes("work from home") ||
    location
      .toLowerCase()
      .includes("wfh");

  // =====================================================
  // SALARY
  // =====================================================

  const salaryMin = job?.salaryRange?.min;
  const salaryMax = job?.salaryRange?.max;

  const hasSalary =
    salaryMin !== null &&
    salaryMin !== undefined &&
    salaryMin !== "";

  const hasSalaryMax =
    salaryMax !== null &&
    salaryMax !== undefined &&
    salaryMax !== "";

  const formatSalary = (value) => {
    if (!value) return "";

    return new Intl.NumberFormat("en-IN").format(
      Number(value)
    );
  };

  // =====================================================
  // POSTED TIME
  // =====================================================

  const postedTime = job?.createdAt
    ? getPostedTime(job.createdAt)
    : "Recently";

  // =====================================================
  // JOB CATEGORY
  // =====================================================

  const category =
    job?.jobCategory ||
    job?.category ||
    "";

  // =====================================================
  // EXPERIENCE
  // =====================================================

  const experience =
    job?.experienceLevel ||
    job?.experience ||
    "";

  // =====================================================
  // CARD
  // =====================================================

  return (
    <article
      className={`
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        bg-white
        p-5
        transition-all
        duration-300
        dark:bg-[#0f1117]

        ${
          featured
            ? `
              border-amber-200
              shadow-[0_2px_10px_rgba(245,158,11,0.08)]
              hover:-translate-y-1
              hover:border-amber-300
              hover:shadow-[0_18px_40px_-20px_rgba(245,158,11,0.35)]

              dark:border-amber-500/20
              dark:hover:border-amber-500/35
            `
            : `
              border-slate-200/80
              shadow-[0_2px_8px_rgba(15,23,42,0.04)]
              hover:-translate-y-1
              hover:border-slate-300
              hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.20)]

              dark:border-white/[0.08]
              dark:hover:border-white/[0.14]
            `
        }
      `}
    >
      {/* =================================================
          FEATURED INDICATOR
      ================================================= */}

      {featured && (
        <div
          className="
            absolute
            right-5
            top-5
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-amber-50
            px-2
            py-1
            text-[10px]
            font-semibold
            text-amber-600
            dark:bg-amber-500/10
            dark:text-amber-400
          "
        >
          <Sparkles size={11} />
          Featured
        </div>
      )}

      {/* =================================================
          TOP ROW
      ================================================= */}

      <div className="flex items-start justify-between gap-3">
        {/* COMPANY LOGO */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-[14px]
            border
            border-slate-200
            bg-white
            text-sm
            font-bold
            text-slate-500
            shadow-sm

            dark:border-white/10
            dark:bg-white/[0.04]
            dark:text-slate-400
          "
        >
          {resolvedLogo ? (
            <img
              src={resolvedLogo}
              alt={`${companyName} logo`}
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            companyName
              ?.charAt(0)
              ?.toUpperCase() || "J"
          )}
        </div>

        {/* SAVE */}

        <button
          type="button"
          onClick={() => onSave?.(job?._id)}
          disabled={isSaving || !job?._id}
          aria-label={
            isSaved
              ? `Remove ${job?.title || "job"} from saved jobs`
              : `Save ${job?.title || "job"}`
          }
          aria-pressed={isSaved}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            border
            border-slate-200
            bg-white
            px-2.5
            py-2
            text-xs
            font-medium
            text-slate-500
            transition-all
            duration-200

            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-900

            disabled:cursor-not-allowed
            disabled:opacity-50

            dark:border-white/10
            dark:bg-white/[0.03]
            dark:text-slate-400
            dark:hover:border-white/20
            dark:hover:bg-white/[0.06]
            dark:hover:text-white
          "
        >
          {isSaved ? (
            <BookmarkCheck
              size={14}
              strokeWidth={2.2}
              className="text-blue-600 dark:text-blue-400"
            />
          ) : (
            <Bookmark
              size={14}
              strokeWidth={1.9}
            />
          )}

          <span className="hidden sm:inline">
            {isSaved ? "Saved" : "Save"}
          </span>
        </button>
      </div>

      {/* =================================================
          COMPANY + POSTED
      ================================================= */}

      <div className="mt-4 flex min-w-0 items-center gap-2">
        <span
          className="
            max-w-[65%]
            truncate
            text-sm
            font-semibold
            text-slate-800
            dark:text-slate-200
          "
        >
          {companyName}
        </span>

        <span className="text-slate-300 dark:text-slate-600">
          ·
        </span>

        <span
          className="
            flex
            shrink-0
            items-center
            gap-1
            text-xs
            text-slate-400
          "
        >
          <Clock3 size={12} />
          {postedTime}
        </span>
      </div>

      {/* =================================================
          JOB TITLE
      ================================================= */}

      <Link
        to={`/jobs/${job?._id}`}
        className="
          mt-2
          block
          rounded-md
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-[#0f1117]
        "
      >
        <h3
          className="
            line-clamp-2
            min-h-[3.25rem]
            text-[1.35rem]
            font-semibold
            leading-[1.25]
            tracking-[-0.025em]
            text-slate-950
            transition-colors
            duration-200
            group-hover:text-slate-700

            dark:text-white
            dark:group-hover:text-slate-200
          "
        >
          {job?.title || "Job Opportunity"}
        </h3>
      </Link>

      {/* =================================================
          TAGS
      ================================================= */}

      <div className="mt-4 flex min-h-[30px] flex-wrap gap-2">
        {/* EMPLOYMENT TYPE */}

        {job?.employmentType && (
          <span
            className="
              inline-flex
              items-center
              rounded-lg
              bg-slate-100
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-slate-700

              dark:bg-white/[0.07]
              dark:text-slate-300
            "
          >
            {job.employmentType}
          </span>
        )}

        {/* REMOTE */}

        {isRemote && (
          <span
            className="
              inline-flex
              items-center
              rounded-lg
              bg-blue-50
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-blue-700

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            Remote
          </span>
        )}

        {/* CATEGORY */}

        {!isRemote && category && (
          <span
            className="
              inline-flex
              max-w-[140px]
              items-center
              truncate
              rounded-lg
              bg-slate-100
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-slate-700

              dark:bg-white/[0.07]
              dark:text-slate-300
            "
          >
            {category}
          </span>
        )}

        {/* EXPERIENCE */}

        {experience && (
          <span
            className="
              inline-flex
              max-w-[130px]
              items-center
              truncate
              rounded-lg
              bg-slate-100
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-slate-700

              dark:bg-white/[0.07]
              dark:text-slate-300
            "
          >
            {experience}
          </span>
        )}
      </div>

      {/* =================================================
          TRUST
      ================================================= */}

      <div className="mt-3 min-h-[20px]">
        {uploadedByRole === "admin" ? (
          <span
            className="
              inline-flex
              items-center
              gap-1
              text-[10px]
              font-semibold
              text-blue-600
              dark:text-blue-400
            "
          >
            <ShieldCheck
              size={12}
              strokeWidth={2.3}
            />
            Verified listing
          </span>
        ) : (
          <span
            className="
              inline-flex
              items-center
              gap-1
              text-[10px]
              font-semibold
              text-emerald-600
              dark:text-emerald-400
            "
          >
            <ShieldCheck
              size={12}
              strokeWidth={2.3}
            />
            Trusted listing
          </span>
        )}
      </div>

      {/* =================================================
          SPACER
      ================================================= */}

      <div className="flex-1" />

      {/* =================================================
          DIVIDER
      ================================================= */}

      <div
        className="
          mt-5
          border-t
          border-slate-100
          dark:border-white/[0.08]
        "
      />

      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="mt-4 flex items-end justify-between gap-3">
        {/* SALARY + LOCATION */}

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="
                text-[15px]
                font-bold
                tracking-tight
                text-slate-950
                dark:text-white
              "
            >
              {hasSalary
                ? `₹${formatSalary(salaryMin)}`
                : "Negotiable"}
            </span>

            {hasSalaryMax && (
              <span
                className="
                  text-[13px]
                  font-medium
                  text-slate-400
                "
              >
                – ₹{formatSalary(salaryMax)}
              </span>
            )}
          </div>

          <div
            className="
              mt-1.5
              flex
              max-w-[170px]
              items-center
              gap-1.5
              truncate
              text-[11px]
              text-slate-400
            "
            title={location}
          >
            <MapPin
              size={12}
              strokeWidth={1.9}
              className="shrink-0"
            />

            <span className="truncate">
              {location}
            </span>
          </div>
        </div>

        {/* APPLY */}

        <div className="shrink-0">
          {renderApplyButton()}
        </div>
      </div>
    </article>
  );
};

export default JobCard;