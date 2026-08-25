import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Mail,
  Phone,
  Globe,
   MapPin,
  ExternalLink,
  ShieldCheck,
  Clock3,
  LockKeyhole,
  Info,
} from "lucide-react";

import { useGetCompanyByIdQuery } from "../../RTK/CompanyService";
import Seo from "../../components/common/Seo";
import AdSlot from "../../components/common/AdSlot";
import getPostedTime from "../../components/jobs/getPostedTime";

const CompanyDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800" />

        <div className="flex-1 space-y-3">
          <div className="h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </div>

    <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
  </div>
);

/* =========================
   INFO ITEM
========================= */

const InfoItem = ({
  icon: Icon,
  label,
  value,
  href,
  privateValue = false,
}) => {
  const content = (
    <div
      className={`
        flex items-start gap-3 rounded-2xl border
        border-slate-200/80 bg-slate-50/70 p-4
        dark:border-white/[0.07] dark:bg-white/[0.03]
        ${href ? "transition hover:border-blue-300 dark:hover:border-blue-500/30" : ""}
      `}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        {privateValue ? (
          <div className="mt-1 flex items-center gap-1.5">
            <LockKeyhole size={13} className="text-slate-400" />

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Private / Not provided
            </p>
          </div>
        ) : (
          <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
            {value}
          </p>
        )}
      </div>
    </div>
  );

  if (!href || privateValue) {
    return content;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};

/* =========================
   STAT CARD
========================= */

const StatCard = ({ icon: Icon, label, value, iconClass }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">
    <div className={`mb-3 ${iconClass}`}>
      <Icon size={19} />
    </div>

    <p className="text-xs text-slate-500 dark:text-slate-400">
      {label}
    </p>

    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
      {value || "N/A"}
    </p>
  </div>
);

/* =========================
   MAIN COMPONENT
========================= */

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });

  const company = data?.company;

  const activeJobs = Array.isArray(company?.jobs)
    ? company.jobs
    : [];

  /* =========================
     COMPANY VALUES
  ========================= */

  const companyName =
    company?.companyName || "Company Profile";

  const description =
    company?.description ||
    "No company description has been provided yet.";

  const pageDescription = company?.description
    ? company.description
        .replace(/\s+/g, " ")
        .slice(0, 155)
        .trim() +
      (company.description.length > 155 ? "…" : "")
    : `Explore company information, open jobs, career opportunities and recruiter details for ${companyName}.`;

  /* =========================
     OPTIONAL CONTACT DATA
  ========================= */

  const companyEmail =
    company?.email ||
    company?.companyEmail ||
    company?.contactEmail;

  const companyPhone =
    company?.phone ||
    company?.companyPhone ||
    company?.contactPhone;

  const website =
    company?.website ||
    company?.companyWebsite;

  const linkedin =
    company?.linkedin ||
    company?.linkedinUrl;

  const location =
    company?.location ||
    company?.address ||
    company?.city;

  /* =========================
     HR / RECRUITER
  ========================= */

  const recruiter =
    company?.hr ||
    company?.recruiter ||
    company?.recruiterDetails ||
    company?.contactPerson;

  const recruiterName =
    recruiter?.name ||
    recruiter?.fullName;

  const recruiterEmail =
    recruiter?.email;

  const recruiterPhone =
    recruiter?.phone;

  /* =========================
     URLS
  ========================= */

  const normalizeUrl = (url) => {
    if (!url) return null;

    if (
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return `https://${url}`;
  };

  const websiteUrl = normalizeUrl(website);
  const linkedinUrl = normalizeUrl(linkedin);

  /* =========================
     ORGANIZATION SCHEMA
  ========================= */

  const organizationSchema = company
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyName,

        ...(company?.companyLogo
          ? {
              logo: company.companyLogo,
            }
          : {}),

        ...(company?.description
          ? {
              description: company.description,
            }
          : {}),

        ...(company?.industry
          ? {
              industry: company.industry,
            }
          : {}),

        ...(company?.founded
          ? {
              foundingDate: String(company.founded),
            }
          : {}),

        ...(location
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: location,
              },
            }
          : {}),

        ...(websiteUrl
          ? {
              url: websiteUrl,
            }
          : {}),
      }
    : null;

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 dark:bg-[#080b14] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CompanyDetailsSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-[#080b14] dark:text-white">

      {/* ================= SEO ================= */}

      <Seo
        title={`${companyName} - Company Profile & Jobs`}
        description={pageDescription}
        path={`/company/${id}`}
        image={company?.companyLogo}
      />

      {organizationSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </Helmet>
      )}

      {/* ================= TOP AD ================= */}

      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <AdSlot
          slot="5555555555"
          className="min-h-[90px] w-full"
        />
      </div>

      {/* ================= PAGE ================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* BACK */}

        <button
          onClick={() => navigate(-1)}
          className="
            mb-6 inline-flex items-center gap-2
            text-sm font-medium
            text-slate-500
            transition hover:text-blue-600
            dark:text-slate-400
            dark:hover:text-blue-400
          "
        >
          <ArrowLeft size={16} />
          Back to companies
        </button>

        {/* ERROR */}

        {isError && (
          <div className="rounded-3xl border border-red-200 bg-white p-10 text-center dark:border-red-900/40 dark:bg-slate-900">
            <Building2
              size={42}
              className="mx-auto mb-4 text-slate-300"
            />

            <h1 className="text-xl font-bold">
              {error?.status === 404
                ? "Company not found"
                : "Unable to load company"}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The company may have been removed or the link may be incorrect.
            </p>

            <Link
              to="/companies"
              className="
                mt-6 inline-flex rounded-xl
                bg-slate-900 px-5 py-3
                text-sm font-semibold text-white
                dark:bg-white dark:text-slate-900
              "
            >
              Browse Companies
            </Link>
          </div>
        )}

        {/* ================= CONTENT ================= */}

        {company && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* ================= LEFT ================= */}

            <div className="min-w-0 space-y-6">

              {/* COMPANY HEADER */}

              <article className="
                overflow-hidden rounded-3xl
                border border-slate-200
                bg-white
                shadow-sm
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
              ">

                {/* HEADER GRADIENT */}

                <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:h-40" />

                <div className="px-5 pb-7 sm:px-8">

                  {/* LOGO */}

                  <div className="-mt-12 sm:-mt-14">

                    <div className="
                      flex h-24 w-24
                      items-center justify-center
                      overflow-hidden rounded-2xl
                      border-4 border-white
                      bg-white shadow-xl
                      dark:border-[#0B0D12]
                      dark:bg-slate-900
                    ">

                      {company?.companyLogo ? (
                        <img
                          src={company.companyLogo}
                          alt={`${companyName} logo`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <Building2
                          size={38}
                          className="text-slate-400"
                        />
                      )}

                    </div>

                  </div>

                  {/* TITLE */}

                  <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h1 className="
                          text-2xl font-bold
                          tracking-tight
                          text-slate-900
                          dark:text-white
                          sm:text-3xl
                        ">
                          {companyName}
                        </h1>

                        <span className="
                          inline-flex items-center gap-1.5
                          rounded-full
                          border border-emerald-200
                          bg-emerald-50
                          px-2.5 py-1
                          text-[10px] font-bold
                          uppercase tracking-wide
                          text-emerald-700
                          dark:border-emerald-500/20
                          dark:bg-emerald-500/10
                          dark:text-emerald-400
                        ">
                          <ShieldCheck size={13} />
                          Company
                        </span>

                      </div>

                      {company?.industry && (
                        <p className="
                          mt-2 text-sm
                          text-slate-500
                          dark:text-slate-400
                        ">
                          {company.industry}
                        </p>
                      )}

                      {location && (
                        <div className="
                          mt-3 flex items-center gap-2
                          text-sm text-slate-500
                          dark:text-slate-400
                        ">
                          <MapPin size={15} />
                          {location}
                        </div>
                      )}

                    </div>

                    {websiteUrl && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex h-fit
                          items-center justify-center gap-2
                          rounded-xl border
                          border-slate-200
                          bg-white px-4 py-2.5
                          text-sm font-semibold
                          text-slate-700
                          transition
                          hover:border-blue-300
                          hover:text-blue-600
                          dark:border-white/10
                          dark:bg-white/[0.03]
                          dark:text-slate-300
                        "
                      >
                        <Globe size={16} />
                        Website
                        <ExternalLink size={14} />
                      </a>
                    )}

                  </div>

                  {/* STATS */}

                  <div className="
                    mt-7 grid gap-3
                    sm:grid-cols-3
                  ">

                    <StatCard
                      icon={Users}
                      label="Employees"
                      value={company?.employees}
                      iconClass="text-blue-500"
                    />

                    <StatCard
                      icon={CalendarDays}
                      label="Founded"
                      value={company?.founded}
                      iconClass="text-purple-500"
                    />

                    <StatCard
                      icon={BriefcaseBusiness}
                      label="Open Jobs"
                      value={activeJobs.length}
                      iconClass="text-emerald-500"
                    />

                  </div>

                </div>

              </article>

              {/* ================= ABOUT ================= */}

              <section className="
                rounded-3xl
                border border-slate-200
                bg-white p-6
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
                sm:p-8
              ">

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-8 w-1 rounded-full bg-blue-600" />

                  <div>
                    <h2 className="
                      text-xl font-bold
                      text-slate-900
                      dark:text-white
                    ">
                      About {companyName}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Company overview
                    </p>
                  </div>

                </div>

                <p className="
                  whitespace-pre-line
                  text-sm leading-7
                  text-slate-600
                  dark:text-slate-300
                ">
                  {description}
                </p>

              </section>

              {/* ================= COMPANY INFORMATION ================= */}

              <section className="
                rounded-3xl
                border border-slate-200
                bg-white p-6
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
                sm:p-8
              ">

                <div className="mb-6">

                  <h2 className="
                    text-xl font-bold
                    text-slate-900
                    dark:text-white
                  ">
                    Company Information
                  </h2>

                  <p className="
                    mt-1 text-sm
                    text-slate-500
                    dark:text-slate-400
                  ">
                    Available company and contact information
                  </p>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <InfoItem
                    icon={Mail}
                    label="Company Email"
                    value={companyEmail}
                    href={
                      companyEmail
                        ? `mailto:${companyEmail}`
                        : null
                    }
                    privateValue={!companyEmail}
                  />

                  <InfoItem
                    icon={Phone}
                    label="Company Phone"
                    value={companyPhone}
                    href={
                      companyPhone
                        ? `tel:${companyPhone}`
                        : null
                    }
                    privateValue={!companyPhone}
                  />

                  <InfoItem
                    icon={Globe}
                    label="Website"
                    value={website}
                    href={websiteUrl}
                    privateValue={!website}
                  />

                  <InfoItem
                    icon={ExternalLink }
                    label="LinkedIn"
                    value={
                      linkedin
                        ? "View company profile"
                        : null
                    }
                    href={linkedinUrl}
                    privateValue={!linkedin}
                  />

                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={location}
                    privateValue={!location}
                  />

                  <InfoItem
                    icon={BriefcaseBusiness}
                    label="Industry"
                    value={company?.industry}
                    privateValue={!company?.industry}
                  />

                </div>

              </section>

              {/* ================= HR CONTACT ================= */}

              <section className="
                rounded-3xl
                border border-slate-200
                bg-white p-6
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
                sm:p-8
              ">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="
                      text-xl font-bold
                      text-slate-900
                      dark:text-white
                    ">
                      Recruiter / HR Contact
                    </h2>

                    <p className="
                      mt-1 text-sm
                      text-slate-500
                      dark:text-slate-400
                    ">
                      Contact details shared by the company
                    </p>

                  </div>

                  <div className="
                    rounded-xl
                    bg-blue-50 p-3
                    text-blue-600
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  ">
                    <Users size={20} />
                  </div>

                </div>

                <div className="mt-6">

                  {recruiterName ? (
                    <div className="
                      rounded-2xl
                      border border-slate-200
                      bg-slate-50/70 p-5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.03]
                    ">

                      <h3 className="
                        font-semibold
                        text-slate-900
                        dark:text-white
                      ">
                        {recruiterName}
                      </h3>

                      <p className="
                        mt-1 text-xs
                        text-slate-500
                        dark:text-slate-400
                      ">
                        HR / Recruiter
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <InfoItem
                          icon={Mail}
                          label="Email"
                          value={recruiterEmail}
                          href={
                            recruiterEmail
                              ? `mailto:${recruiterEmail}`
                              : null
                          }
                          privateValue={!recruiterEmail}
                        />

                        <InfoItem
                          icon={Phone}
                          label="Phone"
                          value={recruiterPhone}
                          href={
                            recruiterPhone
                              ? `tel:${recruiterPhone}`
                              : null
                          }
                          privateValue={!recruiterPhone}
                        />

                      </div>

                    </div>
                  ) : (
                    <div className="
                      flex items-start gap-3
                      rounded-2xl border
                      border-slate-200
                      bg-slate-50/70 p-5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.03]
                    ">

                      <div className="
                        rounded-xl
                        bg-slate-200 p-2.5
                        text-slate-500
                        dark:bg-slate-800
                        dark:text-slate-400
                      ">
                        <LockKeyhole size={18} />
                      </div>

                      <div>

                        <p className="
                          font-semibold
                          text-slate-800
                          dark:text-slate-200
                        ">
                          HR contact information is private
                        </p>

                        <p className="
                          mt-1 text-sm
                          leading-6
                          text-slate-500
                          dark:text-slate-400
                        ">
                          This company has not provided public recruiter contact details.
                        </p>

                      </div>

                    </div>
                  )}

                </div>

              </section>

              {/* ================= OPEN JOBS ================= */}

              <section className="
                rounded-3xl
                border border-slate-200
                bg-white p-6
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
                sm:p-8
              ">

                <div className="
                  flex flex-col
                  justify-between gap-3
                  sm:flex-row sm:items-center
                ">

                  <div>

                    <h2 className="
                      text-xl font-bold
                      text-slate-900
                      dark:text-white
                    ">
                      Open Jobs at {companyName}
                    </h2>

                    <p className="
                      mt-1 text-sm
                      text-slate-500
                      dark:text-slate-400
                    ">
                      Current opportunities available from this company
                    </p>

                  </div>

                  <span className="
                    inline-flex w-fit
                    items-center gap-1.5
                    rounded-full
                    bg-blue-50 px-3 py-1.5
                    text-xs font-semibold
                    text-blue-600
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  ">
                    <BriefcaseBusiness size={13} />
                    {activeJobs.length} Jobs
                  </span>

                </div>

                {activeJobs.length > 0 ? (
                  <div className="mt-6 space-y-3">

                    {activeJobs.map((job) => (

                      <Link
                        key={job._id}
                        to={`/jobs/${job._id}`}
                        className="
                          group flex items-center
                          justify-between gap-4
                          rounded-2xl border
                          border-slate-200
                          bg-slate-50/50 p-4
                          transition
                          hover:border-blue-300
                          hover:bg-blue-50/30
                          dark:border-white/[0.07]
                          dark:bg-white/[0.02]
                          dark:hover:border-blue-500/30
                          dark:hover:bg-blue-500/[0.04]
                        "
                      >

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="
                              truncate
                              text-sm font-bold
                              text-slate-900
                              group-hover:text-blue-600
                              dark:text-white
                              dark:group-hover:text-blue-400
                            ">
                              {job.title}
                            </h3>

                          </div>

                          <div className="
                            mt-2 flex flex-wrap
                            items-center gap-x-3
                            gap-y-1 text-xs
                            text-slate-500
                            dark:text-slate-400
                          ">

                            <span>
                              {job.location || "Remote"}
                            </span>

                            <span>•</span>

                            <span>
                              {job.employmentType || "Full-time"}
                            </span>

                            {job.createdAt && (
                              <>
                                <span>•</span>

                                <span className="inline-flex items-center gap-1">
                                  <Clock3 size={12} />
                                  {getPostedTime(
                                    job.createdAt
                                  )}
                                </span>
                              </>
                            )}

                          </div>

                        </div>

                        <ArrowUpRight
                          size={18}
                          className="
                            shrink-0
                            text-slate-400
                            transition
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:text-blue-600
                          "
                        />

                      </Link>

                    ))}

                  </div>
                ) : (
                  <div className="
                    mt-6 rounded-2xl
                    border border-dashed
                    border-slate-300
                    p-8 text-center
                    dark:border-slate-700
                  ">

                    <BriefcaseBusiness
                      size={34}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <h3 className="
                      mt-3 font-semibold
                      text-slate-800
                      dark:text-slate-200
                    ">
                      No open jobs
                    </h3>

                    <p className="
                      mt-1 text-sm
                      text-slate-500
                    ">
                      This company currently has no active job listings.
                    </p>

                  </div>
                )}

              </section>

            </div>

            {/* ================= RIGHT SIDEBAR ================= */}

            <aside className="space-y-6">

              {/* AD */}

              <AdSlot
                slot="6666666666"
                className="min-h-[250px] w-full"
              />

              {/* QUICK INFO */}

              <div className="
                rounded-3xl
                border border-slate-200
                bg-white p-5
                dark:border-white/[0.07]
                dark:bg-[#0B0D12]
              ">

                <div className="flex items-center gap-2">

                  <Info
                    size={17}
                    className="text-blue-600"
                  />

                  <h3 className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  ">
                    Quick Information
                  </h3>

                </div>

                <div className="mt-5 space-y-4">

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Company
                    </p>

                    <p className="
                      mt-1 text-sm font-semibold
                      text-slate-800
                      dark:text-slate-200
                    ">
                      {companyName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Industry
                    </p>

                    <p className="
                      mt-1 text-sm font-semibold
                      text-slate-800
                      dark:text-slate-200
                    ">
                      {company?.industry || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="
                      mt-1 text-sm font-semibold
                      text-slate-800
                      dark:text-slate-200
                    ">
                      {location || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Open positions
                    </p>

                    <p className="
                      mt-1 text-sm font-semibold
                      text-blue-600
                      dark:text-blue-400
                    ">
                      {activeJobs.length}
                    </p>
                  </div>

                </div>

              </div>

              {/* CONTACT CTA */}

              <div className="
                overflow-hidden rounded-3xl
                bg-gradient-to-br
                from-blue-600
                via-indigo-600
                to-purple-600
                p-6 text-white
                shadow-xl shadow-blue-600/10
              ">

                <div className="
                  mb-4 flex h-11 w-11
                  items-center justify-center
                  rounded-xl bg-white/15
                ">
                  <BriefcaseBusiness size={21} />
                </div>

                <h3 className="text-lg font-bold">
                  Interested in working here?
                </h3>

                <p className="
                  mt-2 text-sm
                  leading-6 text-white/80
                ">
                  Explore current openings and find a role that matches your skills.
                </p>

                {activeJobs.length > 0 && (
                  <Link
                    to="#open-jobs"
                    className="
                      mt-5 inline-flex
                      items-center gap-2
                      rounded-xl bg-white
                      px-4 py-2.5
                      text-sm font-bold
                      text-blue-600
                    "
                  >
                    View Open Jobs
                    <ArrowUpRight size={15} />
                  </Link>
                )}

              </div>

            </aside>

          </div>
        )}

      </section>
    </main>
  );
};

export default CompanyDetails;