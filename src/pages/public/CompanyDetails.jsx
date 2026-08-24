import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { useGetCompanyByIdQuery } from "../../RTK/CompanyService";
import Seo from "../../components/common/Seo";
import AdSlot from "../../components/common/AdSlot";
import getPostedTime from "../../components/jobs/getPostedTime";

const SITE_URL = "https://jobhunt.example.com"; // TODO: replace with your real production domain

const CompanyDetailsSkeleton = () => (
  <div className="animate-pulse rounded-[20px] border border-slate-200/70 bg-white p-8 dark:border-white/[0.08] dark:bg-[#0B0D12] sm:p-10">
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
      <div className="flex-1 space-y-3">
        <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
    <div className="mt-8 h-20 rounded-2xl bg-slate-100 dark:bg-white/[0.04]" />
  </div>
);

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });

  const company = data?.company;
  const activeJobs = company?.jobs || [];

  const pageDescription = company?.description
    ? company.description.slice(0, 155).trim() + (company.description.length > 155 ? "…" : "")
    : `Explore open roles and company information for ${company?.companyName || "this company"}.`;

  // Organization structured data — helps Google understand and
  // potentially surface this as a knowledge panel / rich result.
  const organizationSchema = company
    ? {
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: company.companyName,
        ...(company.companyLogo ? { logo: company.companyLogo } : {}),
        ...(company.description ? { description: company.description } : {}),
        ...(company.industry ? { industry: company.industry } : {}),
        ...(company.founded ? { foundingDate: String(company.founded) } : {}),
      }
    : null;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#080b14] dark:text-white">
      <Seo
        title={company ? company.companyName : "Company profile"}
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

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdSlot slot="5555555555" className="min-h-[90px] w-full" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Back to companies
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {isLoading && <CompanyDetailsSkeleton />}

            {isError && (
              <div className="rounded-[20px] border border-slate-200/70 bg-white p-10 text-center dark:border-white/[0.08] dark:bg-[#0B0D12]">
                <Building2 size={36} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                <h1 className="font-serif text-xl font-medium text-slate-900 dark:text-white">
                  {error?.status === 404 ? "This company was not found" : "Something went wrong"}
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  It may have been removed, or the link is incorrect.
                </p>
                <Link
                  to="/companies"
                  className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
                >
                  Browse companies
                </Link>
              </div>
            )}

            {company && (
              <article className="rounded-[20px] border border-slate-200/70 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-white/[0.08] dark:bg-[#0B0D12] sm:p-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white text-lg font-semibold text-slate-500 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02] dark:text-slate-400">
                    {company.companyLogo ? (
                      <img
                        src={company.companyLogo}
                        alt={company.companyName}
                        className="h-full w-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    ) : (
                      company.companyName?.charAt(0)?.toUpperCase() || "C"
                    )}
                  </div>
                  <div>
                    <h1 className="font-serif text-[1.6rem] font-medium tracking-[-0.01em] text-slate-900 dark:text-white sm:text-[1.9rem]">
                      {company.companyName}
                    </h1>
                    {company.industry && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{company.industry}</p>
                    )}
                  </div>
                </div>

                {company.description && (
                  <p className="mt-6 whitespace-pre-line text-[14px] leading-7 text-slate-600 dark:text-slate-300">
                    {company.description}
                  </p>
                )}

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 dark:border-white/[0.08]">
                  <div className="text-center">
                    <Users size={18} className="mx-auto mb-1 text-blue-500" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Employees</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {company.employees || "N/A"}
                    </p>
                  </div>
                  <div className="text-center">
                    <CalendarDays size={18} className="mx-auto mb-1 text-purple-500" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Founded</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {company.founded || "N/A"}
                    </p>
                  </div>
                  <div className="text-center">
                    <BriefcaseBusiness size={18} className="mx-auto mb-1 text-green-500" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Open jobs</p>
                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {activeJobs.length}
                    </p>
                  </div>
                </div>

                {/* OPEN JOBS AT THIS COMPANY — real internal links, and
                    substantial unique content for the page */}
                {activeJobs.length > 0 && (
                  <div className="mt-8 border-t border-slate-100 pt-6 dark:border-white/[0.08]">
                    <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
                      Open roles at {company.companyName}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {activeJobs.map((job) => (
                        <li key={job._id}>
                          <Link
                            to={`/jobs/${job._id}`}
                            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3 transition-colors hover:border-slate-300 dark:border-white/[0.06] dark:hover:border-white/20"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                                {job.title}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                {job.location || "Remote"} · {job.employmentType} · {getPostedTime(job.createdAt)}
                              </p>
                            </div>
                            <ArrowUpRight size={16} className="shrink-0 text-slate-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            )}
          </div>

          <aside className="space-y-6">
            <AdSlot slot="6666666666" className="min-h-[250px] w-full" />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CompanyDetails;
