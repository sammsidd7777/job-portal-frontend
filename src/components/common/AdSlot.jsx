import { useEffect, useRef, useState } from "react";

/**
 * Reusable AdSlot
 *
 * Priority:
 *
 * 1. Google AdSense ad
 * 2. If Google ad is not available → Job Hunter promotion
 *
 * Example:
 *
 * <AdSlot
 *   slot="1234567890"
 *   fallbackTitle="Join Job Hunter WhatsApp Group"
 *   fallbackDescription="Get the latest IT jobs directly."
 *   fallbackButton="Join Group"
 *   fallbackUrl="https://chat.whatsapp.com/YOUR_LINK"
 * />
 */

const AdSlot = ({
    slot,
    format = "auto",
    layout,
    className = "",
    label = "Advertisement",

    // =========================
    // JOB HUNTER FALLBACK AD
    // =========================

    fallbackTitle = "Get Latest Job Updates 🚀",

    fallbackDescription =
        "Join Job Hunter and get the latest job opportunities directly.",

    fallbackButton = "Join Now",

    fallbackUrl = "#",
}) => {
    const insRef = useRef(null);

    const [showFallback, setShowFallback] = useState(false);

    const clientId =
        import.meta.env.VITE_ADSENSE_CLIENT_ID;

    /*
     * AdSense can only be used when:
     *
     * client ID exists
     * AND slot exists
     * AND slot is not a placeholder
     */

    const isConfigured =
        Boolean(clientId) &&
        Boolean(slot) &&
        !slot.startsWith("YOUR_");

    // ==========================================
    // ADSENSE
    // ==========================================

    useEffect(() => {
        if (!isConfigured) {
            setShowFallback(true);
            return;
        }

        let fallbackTimer;

        try {
            window.adsbygoogle =
                window.adsbygoogle || [];

            window.adsbygoogle.push({});

            /*
             * Give Google some time to fill the ad.
             *
             * If after 3 seconds the ad has no useful
             * content/height, show our own promotion.
             */

            fallbackTimer = setTimeout(() => {
                const adElement = insRef.current;

                if (!adElement) {
                    setShowFallback(true);
                    return;
                }

                const height =
                    adElement.offsetHeight;

                const hasAd =
                    adElement.getAttribute(
                        "data-ad-status"
                    ) === "filled";

                if (!hasAd && height < 50) {
                    setShowFallback(true);
                }
            }, 3000);

        } catch (error) {
            console.warn(
                "AdSense failed:",
                error
            );

            setShowFallback(true);
        }

        return () => {
            if (fallbackTimer) {
                clearTimeout(fallbackTimer);
            }
        };

    }, [isConfigured]);

    // ==========================================
    // FALLBACK PROMOTION
    // ==========================================

    if (!isConfigured || showFallback) {
        return (
            <div className={`w-full ${className}`}>

                <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        group
                        block
                        w-full
                        overflow-hidden
                        rounded-2xl

                        border
                        border-slate-800

                        bg-[#0b0f19]

                        p-5

                        text-white

                        shadow-[0_8px_30px_rgba(0,0,0,0.18)]

                        transition-all
                        duration-200

                        hover:-translate-y-0.5
                        hover:border-slate-700
                        hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
                    "
                >

                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    ">

                        {/* =====================
                            CONTENT
                        ===================== */}

                        <div className="min-w-0">

                            <div className="
                                mb-2
                                flex
                                items-center
                                gap-2
                            ">

                                <span className="
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-300
                                ">
                                    Job Hunter
                                </span>

                                <span className="
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    text-slate-500
                                ">
                                    Sponsored
                                </span>

                            </div>

                            <h3 className="
                                text-lg
                                font-bold
                                leading-tight
                                text-white
                            ">
                                {fallbackTitle}
                            </h3>

                            <p className="
                                mt-1
                                max-w-xl
                                text-sm
                                leading-5
                                text-slate-400
                            ">
                                {fallbackDescription}
                            </p>

                        </div>

                        {/* =====================
                            BUTTON
                        ===================== */}

                        <span className="
                            shrink-0
                            rounded-xl
                            bg-white
                            px-4
                            py-2.5

                            text-sm
                            font-bold
                            text-slate-900

                            shadow-sm

                            transition
                            group-hover:scale-105
                        ">
                            {fallbackButton}
                        </span>

                    </div>

                </a>

            </div>
        );
    }

    // ==========================================
    // GOOGLE ADSENSE
    // ==========================================

    return (
        <div className={`w-full ${className}`}>

            <span className="
                mb-1.5
                block
                text-center
                text-[10px]
                font-medium
                uppercase
                tracking-wide
                text-slate-300
                dark:text-slate-700
            ">
                {label}
            </span>

            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{
                    display: "block",
                    width: "100%",
                }}
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