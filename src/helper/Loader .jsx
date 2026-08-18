import { useEffect, useState } from "react";

const Loader = ({ message = "Matching you with the right roles…" }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Eases toward ~96% and holds there — never lies about being done.
    const interval = setInterval(() => {
      setPercent((p) => {
        if (p >= 96) return p;
        const step = p < 60 ? 3 : p < 85 ? 1.2 : 0.4;
        return Math.min(96, p + step);
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#12131C] overflow-hidden">
      {/* faint vignette + grain for depth, no gradients on shapes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(212,162,78,0.10), transparent 60%)",
        }}
      />

      {/* Target-lock mark */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_7s_linear_infinite]">
          <circle
            cx="60" cy="60" r="54"
            fill="none" stroke="#3A3B46" strokeWidth="1"
            strokeDasharray="4 10" strokeLinecap="round"
          />
        </svg>

        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
          <circle cx="60" cy="60" r="40" fill="none" stroke="#2A2B34" strokeWidth="1" />
        </svg>

        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
          <circle
            cx="60" cy="60" r="40"
            fill="none" stroke="#D4A24E" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * percent) / 100}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
        </svg>

        {/* crosshair ticks */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute h-2 w-px bg-[#4A4B57]"
            style={{ transform: `rotate(${deg}deg) translateY(-52px)` }}
          />
        ))}

        <div className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute h-3 w-3 rounded-full bg-[#D4A24E] animate-ping opacity-40" />
          <span className="relative h-2 w-2 rounded-full bg-[#D4A24E]" />
        </div>
      </div>

      {/* Wordmark + message */}
      <div className="mt-9 text-center">
        <h2
          className="text-[22px] tracking-[0.04em] text-[#F4F1EA]"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
        >
          JOB HUNT
        </h2>
        <p className="mt-3 text-sm font-light text-[#9C9A93]" style={{ fontFamily: "'Inter', sans-serif" }}>
          {message}
        </p>
      </div>

      {/* progress line + percent */}
      <div className="mt-8 flex w-52 flex-col items-center gap-2">
        <div className="h-px w-full bg-[#2A2B34]">
          <div
            className="h-px bg-[#D4A24E]"
            style={{ width: `${percent}%`, transition: "width 0.2s linear" }}
          />
        </div>
        <span
          className="text-[11px] tracking-[0.12em] text-[#6E6D68]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {Math.round(percent)}%
        </span>
      </div>
    </div>
  );
};

export default Loader;