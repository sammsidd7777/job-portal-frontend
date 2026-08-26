import { Link } from "react-router-dom";
import {
  Code2,
  Monitor,
  ServerCog,
  Layers3,
  Palette,
  Megaphone,
  BarChart3,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Software Development",
    description: "Build software, applications and modern digital products.",
    icon: Code2,
    search: "Software Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Frontend Development",
    description: "Create fast, responsive and engaging web experiences.",
    icon: Monitor,
    search: "Frontend Development",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Backend Development",
    description: "Work with APIs, servers, databases and backend systems.",
    icon: ServerCog,
    search: "Backend Development",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Full Stack Development",
    description: "Work across frontend, backend and complete web applications.",
    icon: Layers3,
    search: "Full Stack Development",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "UI/UX & Graphic Design",
    description: "Design beautiful interfaces, visuals and digital experiences.",
    icon: Palette,
    search: "UI UX Graphic Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Digital Marketing",
    description: "Explore SEO, social media, content and online marketing roles.",
    icon: Megaphone,
    search: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Data & Analytics",
    description: "Discover opportunities in data, analytics, SQL and BI.",
    icon: BarChart3,
    search: "Data Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Business & Management",
    description: "Find roles in operations, sales, HR and business management.",
    icon: BriefcaseBusiness,
    search: "Business Management",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
];

const PopularCategories = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-950">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {/* Eyebrow */}
            <div className="mb-3 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-blue-600"
              />

              <span className="text-sm font-semibold tracking-wide text-blue-600">
                Explore opportunities
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Find jobs by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                category
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
              Explore opportunities across technology, design, marketing,
              data and business.
            </p>
          </div>

          {/* View all */}
          <Link
            to="/find-job"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <span>View all jobs</span>

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/find-job?search=${encodeURIComponent(category.search)}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                {/* ================= IMAGE ================= */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Icon */}
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/90 text-blue-600 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 dark:bg-slate-900/90 dark:text-blue-400">
                    <Icon
                      size={21}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>

                 
                </div>

                {/* ================= CONTENT ================= */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {category.name}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>

                  {/* Bottom action */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Browse jobs
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-400">
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;