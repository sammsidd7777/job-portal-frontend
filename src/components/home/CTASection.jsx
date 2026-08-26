import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Bell,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 sm:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-12 shadow-2xl sm:px-10 sm:py-14 lg:px-16 lg:py-18">
          {/* Decorative Circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border-[40px] border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border-[45px] border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-2xl"
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ================= LEFT CONTENT ================= */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <Sparkles
                  size={16}
                  aria-hidden="true"
                />

                <span>Build your career with Job Hunter</span>
              </div>

              {/* Heading */}
              <h2 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find your next
                <span className="block text-blue-100">
                  career opportunity.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                Discover relevant job opportunities, explore companies, and
                take the next step toward your career with Job Hunter.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                {/* Primary CTA */}
                <Link
                  to="/find-job"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto"
                >
                  <span>Explore Jobs</span>

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Coming Soon */}
                <div
                  className="inline-flex min-h-12 w-full cursor-default items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md sm:w-auto"
                  title="This feature is coming soon"
                >
                  <Clock3
                    size={17}
                    aria-hidden="true"
                  />

                  <span>More features coming soon</span>
                </div>
              </div>

              {/* Small reassurance */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-100 lg:justify-start">
                <Bell
                  size={15}
                  aria-hidden="true"
                />

                <span>New career features are on the way</span>
              </div>
            </div>

            {/* ================= RIGHT UI CARD ================= */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Floating Coming Soon Badge */}
              <div className="absolute -right-2 -top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xl sm:-right-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                Coming soon
              </div>

              {/* Dashboard Card */}
              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
                {/* Card Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg">
                      <BriefcaseBusiness
                        size={22}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Job Hunter
                      </p>

                      <p className="text-xs text-blue-100">
                        Your career journey
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-green-200">
                    Active
                  </span>
                </div>

                {/* Profile / Career Progress */}
                <div className="rounded-2xl bg-white/10 p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      Career progress
                    </p>

                    <p className="text-xs font-semibold text-blue-100">
                      Coming soon
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[65%] rounded-full bg-white" />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-blue-100">
                    Personalized career tools will be available in a future
                    update.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-4 space-y-3">
                  {/* Feature 1 */}
                  <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-lg">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <BriefcaseBusiness
                          size={18}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          Discover Jobs
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          Find relevant opportunities
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-lg">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <Bell
                          size={18}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          Career Updates
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          More useful tools coming soon
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-600">
                      SOON
                    </span>
                  </div>
                </div>

                {/* Bottom Coming Soon */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3">
                  <Sparkles
                    size={15}
                    className="text-blue-100"
                    aria-hidden="true"
                  />

                  <span className="text-xs font-medium text-blue-100">
                    New features will be added in future updates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;