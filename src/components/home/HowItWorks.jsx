import { Search, UserPlus, FileText, BriefcaseBusiness, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Build a professional profile that showcases your skills, experience, education, and career goals.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Search thousands of jobs using powerful filters to find opportunities that match your ambitions.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Apply With Confidence",
    description:
      "Upload your resume and apply to your favorite jobs with a simple and seamless application process.",
  },
  {
    number: "04",
    icon: BriefcaseBusiness,
    title: "Get Hired",
    description:
      "Track your applications, connect with companies, and take the next step in your career.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-gray-900">

      {/* Background Decoration */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-16 max-w-2xl text-center">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Simple Process
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Find your next job in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>

          <p className="mt-5 text-gray-500 dark:text-gray-400">
            JobHunter makes your job search simple, faster, and more effective.
          </p>

        </div>


        {/* ================= STEPS ================= */}

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Connecting Line */}

          <div className="absolute left-[12%] right-[12%] top-16 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 lg:block dark:from-blue-900 dark:via-indigo-800 dark:to-blue-900" />


          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative text-center"
              >

                {/* ICON */}

                <div className="relative mx-auto mb-7 flex h-32 w-32 items-center justify-center rounded-full border border-blue-100 bg-white shadow-xl shadow-blue-500/10 transition duration-500 group-hover:-translate-y-2 group-hover:border-blue-300 group-hover:shadow-blue-500/20 dark:border-gray-700 dark:bg-gray-900">

                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition duration-500 group-hover:rotate-6">

                    <Icon size={32} strokeWidth={1.8} />

                  </div>


                  {/* Number */}

                  <span className="absolute -right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-xs font-bold text-white dark:border-gray-900 dark:bg-white dark:text-gray-900">
                    {step.number}
                  </span>

                </div>


                {/* CONTENT */}

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>

              </div>
            );

          })}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-16 flex justify-center">

          <button className="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-600 dark:hover:text-white">

            Start Your Journey

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;