import {
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Fresh Job Listings",
    description: "Discover new opportunities added regularly.",
    icon: BriefcaseBusiness,
  },
  {
    title: "IT & Digital Roles",
    description: "Find jobs across tech, design, marketing and data.",
    icon: Code2,
  },
  {
    title: "Direct Apply",
    description: "Apply directly through the available application link.",
    icon: ExternalLink,
  },
  {
    title: "Built for Job Seekers",
    description: "Simple and easy way to discover your next opportunity.",
    icon: Users,
  },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-950">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-blue-600">
            Why Job Hunter
          </p>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to find your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              next opportunity
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
            Discover relevant jobs and make your job search simpler.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon size={21} strokeWidth={2} />
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;