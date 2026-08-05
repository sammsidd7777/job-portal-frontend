
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  BriefcaseBusiness,
} from "lucide-react";

const popularSearches = [
  "Frontend Developer",
  "MERN Stack",
  "UI/UX Designer",
  "Product Manager",
];

const locations = [
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Pune, India",
  "Remote",
];

const HeroSection = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Delhi, India");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locationRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) {
      params.set("keyword", keyword);
    }

    if (location) {
      params.set("location", location);
    }

    navigate(`/find-jobs`);
  };

  const handlePopularSearch = (search) => {
    navigate(
      `/find-jobs`
    );
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F8FAFC] dark:bg-[#070B14]">

      {/* Background Decoration */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-[-180px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute right-[-100px] top-[25%] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="absolute bottom-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />

      </div>

      {/* Hero Content */}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 lg:pt-28">

        {/* Announcement */}

        <div className="mb-8 flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm backdrop-blur-xl dark:border-blue-900/50 dark:bg-gray-900/70 dark:text-blue-400">

          <Sparkles size={16} />

          <span>
            The smarter way to find your next opportunity
          </span>

          <ArrowUpRight size={15} />

        </div>

        {/* Main Heading */}

        <h1 className="max-w-5xl text-center text-[clamp(3rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white">

          Build your

          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">

            next chapter.

          </span>

        </h1>

        {/* Description */}

        <p className="mt-8 max-w-2xl text-center text-base leading-8 text-slate-500 dark:text-slate-400 sm:text-lg">

          Discover meaningful work, connect with ambitious companies,
          and take the next step in your career with JobHunter.

        </p>

        {/* Search Box */}

        <div className="relative z-20 mt-12 w-full max-w-5xl rounded-[28px] border border-white/80 bg-white/80 p-3 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/80">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Keyword */}

            <div className="flex min-h-[64px] flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-blue-500 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:focus-within:bg-slate-800">

              <Search
                size={22}
                className="shrink-0 text-slate-400"
              />

              <div className="flex-1">

                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  What are you looking for?
                </p>

                <input
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Job title, skill or company"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />

              </div>

            </div>

            {/* Location */}

            <div
              ref={locationRef}
              className="relative flex min-h-[64px] flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 dark:border-slate-700 dark:bg-slate-800/70"
            >

              <MapPin
                size={22}
                className="shrink-0 text-slate-400"
              />

              <div className="flex-1">

                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Location
                </p>

                <button
                  onClick={() =>
                    setIsLocationOpen(
                      !isLocationOpen
                    )
                  }
                  className="flex w-full items-center justify-between text-left text-sm font-medium text-slate-900 dark:text-white"
                >

                  {location}

                  <ChevronDown
                    size={18}
                    className={`transition ${
                      isLocationOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

              </div>

              {isLocationOpen && (

                <div className="absolute left-0 right-0 top-[72px] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                  {locations.map((item) => (

                    <button
                      key={item}
                      onClick={() => {
                        setLocation(item);
                        setIsLocationOpen(false);
                      }}
                      className="w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40"
                    >
                      {item}
                    </button>

                  ))}

                </div>

              )}

            </div>

            {/* Search Button */}

            <button
              onClick={handleSearch}
              className="flex min-h-[64px] items-center justify-center gap-3 rounded-2xl bg-slate-950 px-8 font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >

              <Search size={20} />

              Search Jobs

            </button>

          </div>

        </div>

        {/* Popular Searches */}

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

          <span className="text-sm font-medium text-slate-400">
            Trending:
          </span>

          {popularSearches.map((item) => (

            <button
              key={item}
              onClick={() =>
                handlePopularSearch(item)
              }
              className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400"
            >
              {item}
            </button>

          ))}

        </div>

        {/* Floating Job Cards */}

        <div className="relative mt-20 hidden w-full max-w-6xl lg:block">

          {/* Left Card */}

          <div className="absolute left-0 top-0 w-64 -rotate-6 rounded-3xl border border-white bg-white/80 p-5 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-600 dark:bg-blue-950">
                T
              </div>

              <span className="text-xs text-slate-400">
                2h ago
              </span>

            </div>

            <h3 className="font-bold text-slate-900 dark:text-white">
              Frontend Developer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              TechNova
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">

              <span>Delhi</span>

              <span className="font-semibold text-blue-600">
                ₹8L - ₹12L
              </span>

            </div>

          </div>

          {/* Right Card */}

          <div className="absolute right-0 top-8 w-64 rotate-6 rounded-3xl border border-white bg-white/80 p-5 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950">
                <BriefcaseBusiness size={22} />
              </div>

              <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-600">
                New
              </span>

            </div>

            <h3 className="font-bold text-slate-900 dark:text-white">
              Product Designer
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              CreativeLabs
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">

              <span>Remote</span>

              <span className="font-semibold text-violet-600">
                ₹10L - ₹16L
              </span>

            </div>

          </div>

          {/* Bottom Center */}

          <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white bg-white/70 px-5 py-3 text-sm font-medium text-slate-600 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">

            <div className="flex -space-x-2">

              <div className="h-7 w-7 rounded-full border-2 border-white bg-blue-500 dark:border-slate-900" />

              <div className="h-7 w-7 rounded-full border-2 border-white bg-purple-500 dark:border-slate-900" />

              <div className="h-7 w-7 rounded-full border-2 border-white bg-orange-500 dark:border-slate-900" />

            </div>

            <span>
              Join 50,000+ professionals finding better jobs
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;

