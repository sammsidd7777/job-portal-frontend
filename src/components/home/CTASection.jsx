import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-14 shadow-2xl sm:px-12 lg:px-20 lg:py-20">

          {/* Decorative Circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[50px] border-white/10" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border-[50px] border-white/10" />

          <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                <Sparkles size={16} />
                Start your career journey
              </div>

              <h2 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Your next opportunity is
                <span className="block text-blue-100">
                  waiting for you.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-blue-100 sm:text-lg">
                Discover thousands of opportunities, connect with leading
                companies, and take the next step toward your dream career.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

                <Link
                  to="/find-jobs"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-600 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  Explore Jobs

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Create Free Profile
                </Link>

              </div>

            </div>

            {/* RIGHT UI CARD */}
            <div className="relative">

              {/* Main Dashboard Card */}
              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">

                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg">
                      <BriefcaseBusiness size={24} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Career Dashboard
                      </p>

                      <p className="text-xs text-blue-100">
                        Your career, organized
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-green-200">
                    Active
                  </span>

                </div>

                {/* Profile Progress */}
                <div className="rounded-2xl bg-white/10 p-5">

                  <div className="mb-3 flex justify-between">

                    <p className="text-sm font-medium text-white">
                      Profile Strength
                    </p>

                    <p className="text-sm font-bold text-blue-100">
                      85%
                    </p>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/20">

                    <div className="h-full w-[85%] rounded-full bg-white" />

                  </div>

                </div>

                {/* Job Cards */}
                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-lg">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <BriefcaseBusiness size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Frontend Developer
                        </p>

                        <p className="text-xs text-slate-500">
                          Technology Company
                        </p>
                      </div>

                    </div>

                    <CheckCircle2
                      size={20}
                      className="text-green-500"
                    />

                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-lg">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <BriefcaseBusiness size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          MERN Stack Developer
                        </p>

                        <p className="text-xs text-slate-500">
                          Startup Company
                        </p>
                      </div>

                    </div>

                    <CheckCircle2
                      size={20}
                      className="text-green-500"
                    />

                  </div>

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