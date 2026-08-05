import { Link } from "react-router-dom";
import {
  Code2,
  Palette,
  BarChart3,
  Megaphone,
  Headphones,
  BriefcaseBusiness,
  Stethoscope,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Technology",
    jobs: "1,240",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Design & Creative",
    jobs: "860",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Marketing",
    jobs: "540",
    icon: Megaphone,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Finance",
    jobs: "430",
    icon: BarChart3,
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "Customer Support",
    jobs: "320",
    icon: Headphones,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Business",
    jobs: "680",
    icon: BriefcaseBusiness,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Healthcare",
    jobs: "290",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Education",
    jobs: "210",
    icon: GraduationCap,
    color: "from-yellow-500 to-orange-500",
  },
];

const PopularCategories = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-slate-950">

      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Explore Opportunities
            </p>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Find the right job in your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                favorite category
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
              Explore thousands of opportunities from top companies and discover
              the career path that matches your skills.
            </p>
          </div>

          <Link
            to="/find-job"
            className="group flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
          >
            View all jobs
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* CATEGORY GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to="/find-job"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              >

                {/* Hover gradient */}
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${category.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}
                <div
                  className={`relative mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="relative">

                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white">
                    {category.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {category.jobs} open positions
                    </p>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800">
                      <ArrowUpRight size={15} />
                    </div>

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default PopularCategories;