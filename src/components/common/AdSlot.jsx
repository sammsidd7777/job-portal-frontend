import { useEffect, useRef } from "react";

/**
 * AdSlot
 *
 * Reusable Google AdSense unit. Reads the publisher client ID from
 * VITE_ADSENSE_CLIENT_ID so nothing is hardcoded — set it once your
 * AdSense account is approved:
 *
 *   # .env
 *   VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 *
 * Until that env var is set (or in dev mode), this renders a quiet
 * placeholder box instead of an empty/broken ad slot — avoids layout
 * shift and avoids shipping broken <ins> tags to production by accident.
 *
 * Usage:
 *   <AdSlot slot="1234567890" format="auto" className="min-h-[250px]" />
 *   <AdSlot slot="1234567890" layout="in-article" className="min-h-[280px]" />
 */
const AdSlot = ({
  slot,
  format = "auto",
  layout,
  className = "",
  label = "Advertisement",
}) => {
  const insRef = useRef(null);
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const isConfigured = Boolean(clientId && slot);

  useEffect(() => {
    if (!isConfigured) return;

    try {
      // Loads the adsbygoogle script once per app lifetime; safe to
      // call push() multiple times across mounted ad slots.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense throws if the slot is pushed before the script loads,
      // e.g. on fast route changes — safe to ignore, not user-facing.
      console.warn("AdSlot: adsbygoogle push failed", err);
    }
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div
        aria-hidden="true"
        className={`
          flex items-center justify-center rounded-2xl
          border border-dashed border-slate-200 bg-slate-50/60
          text-[11px] font-medium uppercase tracking-wide text-slate-300

          dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-700

          ${className}
        `}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={className}>
      <span className="mb-1.5 block text-center text-[10px] font-medium uppercase tracking-wide text-slate-300 dark:text-slate-700">
        {label}
      </span>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;
