import { Link } from "react-router-dom";
import {
  Search,
  Eye,
  Building2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Jobs",
    description:
      "Browse available opportunities and find jobs that match your skills, role, and preferred location.",
  },
  {
    number: "02",
    icon: Eye,
    title: "Explore Details",
    description:
      "Review the job description, requirements, salary information, location, and other important details.",
  },
  {
    number: "03",
    icon: Building2,
    title: "Check the Company",
    description:
      "Learn more about the hiring company and understand the opportunity before you apply.",
  },
  {
    number: "04",
    icon: ExternalLink,
    title: "Apply Directly",
    description:
      "Use the provided application link to apply directly through the company's official application process.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      {/* ================= BACKGROUND ================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          {/* Small label */}

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">
            <Sparkles
              size={14}
              aria-hidden="true"
            />

            <span>Simple job search</span>
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Find your next job in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
            From discovering an opportunity to applying, Job Hunter keeps your
            job search simple and straightforward.
          </p>
        </div>

        {/* ================= STEPS ================= */}

        <div className="relative">
          {/* Connecting Line */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] right-[12%] top-16 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 lg:block dark:from-blue-900 dark:via-indigo-800 dark:to-blue-900"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* ================= CARD ================= */}

                  <div className="relative h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-900 dark:hover:bg-slate-900">
                    {/* Step Number */}

                    <div className="absolute right-5 top-5 text-xs font-black tracking-wider text-slate-300 transition-colors duration-300 group-hover:text-blue-200 dark:text-slate-700 dark:group-hover:text-blue-900">
                      {step.number}
                    </div>

                    {/* Icon */}

                    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-lg shadow-blue-500/10 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 dark:group-hover:border-blue-600 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                      <Icon
                        size={30}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      {/* Small check */}

                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm dark:border-slate-900">
                        <CheckCircle2
                          size={13}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Content */}

                    <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {step.description}
                    </p>

                    {/* Bottom indicator */}

                    <div className="mx-auto mt-6 h-1 w-8 overflow-hidden rounded-full bg-slate-200 transition-all duration-500 group-hover:w-14 group-hover:bg-blue-600 dark:bg-slate-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            to="/find-job"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            <span>Start exploring jobs</span>

            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;