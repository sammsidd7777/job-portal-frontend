import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  "Product Designer",
];

const locations = [
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Pune, India",
  "Remote",
];

const animatedWords = ["next chapter.", "your career.", "dream job."];

const HeroSection = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Delhi, India");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locationRef = useRef(null);

  /* ===============================
     TYPEWRITER ANIMATION
  =============================== */

  const [animatedText, setAnimatedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = animatedWords[wordIndex];

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterType = 5000;
    const pauseAfterDelete = 400;

    let timeout;

    if (!isDeleting && animatedText === currentWord) {
      // Poora word type ho chuka -> pause phir delete start
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && animatedText === "") {
      // Poora delete ho chuka -> next word par jao
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % animatedWords.length);
      }, pauseAfterDelete);
    } else {
      // Type ya delete continue karo
      timeout = setTimeout(() => {
        const nextLength = isDeleting
          ? animatedText.length - 1
          : animatedText.length + 1;

        setAnimatedText(currentWord.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [animatedText, isDeleting, wordIndex]);

  /* ===============================
     CLOSE LOCATION DROPDOWN
  =============================== */

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
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ===============================
     SEARCH
  =============================== */

  const handleSearch = () => {
    const params = new URLSearchParams();

    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword);
    }

    if (location) {
      params.set("location", location);
    }

    const queryString = params.toString();

    navigate(queryString ? `/find-job?${queryString}` : "/find-job");
  };

  /* ===============================
     TRENDING SEARCH
  =============================== */

  const handlePopularSearch = (search) => {
    const params = new URLSearchParams();

    params.set("keyword", search);

    if (location) {
      params.set("location", location);
    }

    navigate(`/find-job?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#070B14]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main glow */}
        <div className="absolute left-1/2 top-[-220px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[130px]" />

        {/* Right glow */}
        <div className="absolute right-[-140px] top-[28%] h-[380px] w-[380px] rounded-full bg-indigo-500/[0.08] blur-[110px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-180px] left-[-120px] h-[380px] w-[380px] rounded-full bg-cyan-500/[0.07] blur-[110px]" />

        {/* Small decorative dots */}
        <div className="absolute left-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-blue-500/40" />
        <div className="absolute right-[16%] top-[35%] h-1.5 w-1.5 rounded-full bg-indigo-500/40" />
      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">

        {/* =================================================
            ANNOUNCEMENT
        ================================================== */}

        <div
          className="
            mb-7 inline-flex items-center gap-2
            rounded-full
            border border-blue-200/80
            bg-white/80
            px-4 py-2
            text-xs font-semibold
            text-blue-600
            shadow-sm
            backdrop-blur-xl
            transition-all duration-300
            hover:border-blue-300
            hover:shadow-md
            dark:border-blue-900/50
            dark:bg-slate-900/70
            dark:text-blue-400
          "
        >
          <Sparkles
            size={14}
            aria-hidden="true"
            className="animate-pulse"
          />

          <span>Find your next opportunity with JobHunter</span>

          <ArrowUpRight
            size={14}
            aria-hidden="true"
          />
        </div>

        {/* =================================================
            MAIN HEADING
        ================================================== */}

        <h1
          className="
            max-w-5xl
            text-center
            text-[clamp(3.2rem,7vw,6.8rem)]
            font-black
            leading-[0.92]
            tracking-[-0.065em]
            text-slate-950
            dark:text-white
          "
        >
          Build your

          <span
            className="
              block
              min-h-[0.92em]
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-violet-600
              bg-clip-text
              text-transparent
            "
          >
            {animatedText}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] bg-blue-600 animate-pulse"
            />
          </span>
        </h1>

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-7
            max-w-2xl
            text-center
            text-sm
            leading-7
            text-slate-500
            sm:text-base
            lg:text-lg
            dark:text-slate-400
          "
        >
          Discover meaningful work, connect with ambitious companies,
          and take the next step in your career with JobHunter.
        </p>

        {/* =================================================
            SEARCH BOX
        ================================================== */}

        <div
          className="
            relative z-30
            mt-10
            w-full max-w-5xl
            rounded-[1.5rem]
            border border-white
            bg-white/85
            p-2.5
            shadow-[0_25px_70px_-25px_rgba(15,23,42,0.28)]
            backdrop-blur-2xl
            dark:border-slate-800
            dark:bg-slate-900/85
          "
        >
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">

            {/* =================================================
                KEYWORD
            ================================================== */}

            <div
              className="
                flex min-h-[62px] flex-1
                items-center gap-3
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4
                transition-all duration-200
                focus-within:border-blue-400
                focus-within:bg-white
                focus-within:ring-4
                focus-within:ring-blue-500/5
                dark:border-slate-700
                dark:bg-slate-800/70
                dark:focus-within:bg-slate-800
              "
            >
              <Search
                size={20}
                className="shrink-0 text-slate-400"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">

                <p className="mb-0.5 text-[11px] font-semibold text-slate-400">
                  Search jobs
                </p>

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Job title, skill or company"
                  aria-label="Search jobs by title, skill or company"
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    dark:text-white
                  "
                />

              </div>
            </div>

            {/* =================================================
                LOCATION
            ================================================== */}

            <div
              ref={locationRef}
              className="
                relative
                flex min-h-[62px] flex-1
                items-center gap-3
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4
                dark:border-slate-700
                dark:bg-slate-800/70
              "
            >
              <MapPin
                size={20}
                className="shrink-0 text-slate-400"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">

                <p className="mb-0.5 text-[11px] font-semibold text-slate-400">
                  Location
                </p>

                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isLocationOpen}
                  aria-label={`Selected location: ${location}`}
                  onClick={() =>
                    setIsLocationOpen((prev) => !prev)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-2
                    text-left
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  "
                >
                  <span className="truncate">
                    {location}
                  </span>

                  <ChevronDown
                    size={17}
                    aria-hidden="true"
                    className={`
                      shrink-0
                      text-slate-400
                      transition-transform
                      duration-200
                      ${isLocationOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

              </div>

              {/* =================================================
                  LOCATION DROPDOWN
              ================================================== */}

              {isLocationOpen && (
                <div
                  role="listbox"
                  aria-label="Select job location"
                  className="
                    absolute
                    left-0
                    right-0
                    top-[70px]
                    z-50
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-2
                    shadow-2xl
                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >
                  {locations.map((item) => (
                    <button
                      key={item}
                      type="button"
                      role="option"
                      aria-selected={location === item}
                      onClick={() => {
                        setLocation(item);
                        setIsLocationOpen(false);
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-blue-50
                        hover:text-blue-600
                        dark:text-slate-300
                        dark:hover:bg-blue-950/40
                      "
                    >
                      <span>{item}</span>

                      {location === item && (
                        <span className="text-xs font-bold text-blue-600">
                          Selected
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                SEARCH BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={handleSearch}
              className="
                group
                flex
                min-h-[62px]
                shrink-0
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-slate-950
                px-7
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-slate-950/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-blue-600
                hover:shadow-blue-600/20
                active:translate-y-0
                dark:bg-blue-600
                dark:hover:bg-blue-700
              "
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>Search Jobs</span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>

          </div>
        </div>

        {/* =================================================
            TRENDING SEARCHES
        ================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">

          <span className="mr-1 text-xs font-semibold text-slate-400">
            Trending
          </span>

          {popularSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handlePopularSearch(item)}
              className="
                rounded-full
                border border-slate-200
                bg-white/70
                px-3.5
                py-1.5
                text-[11px]
                font-semibold
                text-slate-600
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-400
                hover:bg-blue-50
                hover:text-blue-600
                dark:border-slate-800
                dark:bg-slate-900/70
                dark:text-slate-400
                dark:hover:border-blue-800
                dark:hover:bg-blue-950/30
                dark:hover:text-blue-400
              "
            >
              {item}
            </button>
          ))}

        </div>

        {/* =================================================
            FLOATING JOB CARDS
        ================================================== */}

        <div className="relative mt-16 hidden h-44 w-full max-w-6xl lg:block">

          {/* =================================================
              LEFT JOB CARD
          ================================================== */}

          <div
            className="
              absolute
              left-2
              top-1
              w-64
              -rotate-6
              rounded-2xl
              border border-white/80
              bg-white/85
              p-4
              shadow-[0_25px_50px_-20px_rgba(15,23,42,0.35)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:-rotate-3
              dark:border-slate-800
              dark:bg-slate-900/85
            "
          >
            <div className="mb-3 flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600 dark:bg-blue-950/60">
                T
              </div>

              <span className="text-[10px] font-medium text-slate-400">
                Recently added
              </span>

            </div>

            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Frontend Developer
            </p>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              TechNova
            </p>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[11px] text-slate-400">
                Delhi
              </span>

              <span className="text-[11px] font-bold text-blue-600">
                ₹8L – ₹12L
              </span>

            </div>
          </div>

          {/* =================================================
              RIGHT JOB CARD
          ================================================== */}

          <div
            className="
              absolute
              right-2
              top-8
              w-64
              rotate-6
              rounded-2xl
              border border-white/80
              bg-white/85
              p-4
              shadow-[0_25px_50px_-20px_rgba(15,23,42,0.35)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:rotate-3
              dark:border-slate-800
              dark:bg-slate-900/85
            "
          >
            <div className="mb-3 flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60">
                <BriefcaseBusiness
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-600 dark:bg-green-950/50 dark:text-green-400">
                New
              </span>

            </div>

            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Product Designer
            </p>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              CreativeLabs
            </p>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[11px] text-slate-400">
                Remote
              </span>

              <span className="text-[11px] font-bold text-violet-600">
                ₹10L – ₹16L
              </span>

            </div>
          </div>

          {/* =================================================
              CENTER FLOATING LABEL
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-20
              flex
              -translate-x-1/2
              items-center
              gap-3
              rounded-full
              border border-white/80
              bg-white/75
              px-4
              py-2.5
              text-xs
              font-semibold
              text-slate-600
              shadow-xl
              backdrop-blur-xl
              dark:border-slate-800
              dark:bg-slate-900/75
              dark:text-slate-300
            "
          >
            <div
              className="flex -space-x-1.5"
              aria-hidden="true"
            >
              <span className="h-5 w-5 rounded-full border-2 border-white bg-blue-500 dark:border-slate-900" />
              <span className="h-5 w-5 rounded-full border-2 border-white bg-purple-500 dark:border-slate-900" />
              <span className="h-5 w-5 rounded-full border-2 border-white bg-orange-500 dark:border-slate-900" />
            </div>

            <span>
              New opportunities added regularly
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;