import { useEffect, useState } from "react";

const Loader = ({ message = "Loading Job Hunter…" }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((p) => {
        if (p >= 95) return p;

        const step = p < 50 ? 4 : p < 80 ? 2 : 0.5;
        return Math.min(95, p + step);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#12131C] overflow-hidden">
      
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(212,162,78,0.12), transparent 55%)",
        }}
      />

      <div className="relative flex w-[280px] flex-col items-center">

        {/* Hosting-style loader */}
        <div className="relative flex h-20 w-20 items-center justify-center">

          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border border-[#2A2B34]" />

          <div
            className="absolute inset-0 rounded-full border border-transparent border-t-[#D4A24E] animate-spin"
            style={{ animationDuration: "1.4s" }}
          />

          {/* Inner ring */}
          <div className="absolute h-12 w-12 rounded-full border border-[#30313B]" />

          <div
            className="absolute h-12 w-12 rounded-full border border-transparent border-b-[#D4A24E] animate-spin"
            style={{
              animationDuration: "2s",
              animationDirection: "reverse",
            }}
          />

          {/* Center dot */}
          <div className="relative h-2.5 w-2.5 rounded-full bg-[#D4A24E]">
            <span className="absolute inset-0 rounded-full bg-[#D4A24E] animate-ping opacity-40" />
          </div>
        </div>

        {/* Brand */}
        <h2
          className="mt-7 text-[21px] tracking-[0.06em] text-[#F4F1EA]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
          }}
        >
          JOB HUNTER
        </h2>

        {/* Loading message */}
        <p
          className="mt-2 text-xs text-[#8F8D87]"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {message}
        </p>

        {/* Progress */}
        <div className="mt-7 w-full">

          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase tracking-[0.14em] text-[#5F5E5A]"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Loading
            </span>

            <span
              className="text-[10px] tracking-[0.08em] text-[#8F8D87]"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {Math.round(percent)}%
            </span>
          </div>

          <div className="h-[2px] w-full overflow-hidden bg-[#292A33] rounded-full">
            <div
              className="h-full rounded-full bg-[#D4A24E]"
              style={{
                width: `${percent}%`,
                transition: "width 0.2s linear",
              }}
            />
          </div>
        </div>

        {/* Small hosting-style status */}
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24E] animate-pulse" />

          <span
            className="text-[10px] text-[#66645F]"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Initializing…
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;