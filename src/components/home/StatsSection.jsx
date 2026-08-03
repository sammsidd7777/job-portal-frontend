import { Users, BriefcaseBusiness, Building2, TrendingUp } from "lucide-react";

const stats = [
  {
    number: "10K+",
    label: "Active Jobs",
    description: "Fresh opportunities every day",
    icon: BriefcaseBusiness,
  },
  {
    number: "5K+",
    label: "Companies",
    description: "Trusted companies hiring",
    icon: Building2,
  },
  {
    number: "50K+",
    label: "Job Seekers",
    description: "Growing career community",
    icon: Users,
  },
  {
    number: "95%",
    label: "Success Rate",
    description: "Candidates finding opportunities",
    icon: TrendingUp,
  },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-slate-950">

      {/* Background */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900"
              >

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50">
                  <Icon size={23} />
                </div>

                {/* Number */}
                <h3 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="mt-2 font-semibold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  {stat.description}
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