import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowUpRight,
    Bookmark,
    CheckCircle2,
    Clock3,
    ExternalLink,
    MapPin,
    MessageCircle,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Share2,
    ShieldCheck,
    Users,
    X,
} from "lucide-react";

import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import AdSlot from "../../components/common/AdSlot";
import Seo from "../../components/common/Seo";

const JobDetail = ({
    job,
    isSaved,
    isSaving,
    onSave,
    onApply,
    onBack,
}) => {
    const [isApply, setIsApply] = useState(false);

    if (!job) return null;

    /* ================= COMPANY ================= */

    const companyName =
        job?.company?.companyName ||
        job?.company?.name ||
        job?.companyName ||
        "Company";

    const companyLogo =
        job?.companyLogo ||
        job?.company?.companyLogo ||
        job?.company?.logo;

    /* ================= JOB DATA ================= */

    const title =
        job?.title || "Untitled Job";

    const location =
        job?.location || "Location not specified";

    const employmentType =
        job?.employmentType || "Full-time";

    const skills =
        Array.isArray(job?.skills)
            ? job.skills
            : [];

    const description =
        job?.description ||
        "No job description available.";

    const jobType =
        job?.jobType || "internal";

    const applyMethod =
        job?.applyMethod;

    const externalApplyUrl =
        job?.externalApplyUrl;

    const whatsappNumber =
        job?.whatsappNumber;

    /* ================= DATE ================= */

    const postedDate =
        job?.createdAt
            ? new Date(job.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  }
              )
            : null;

    /* ================= APPLY ================= */

    const handleApply = () => {
        /*
         * External Website
         */
        if (
            jobType === "external" &&
            applyMethod === "website" &&
            externalApplyUrl
        ) {
            window.open(
                externalApplyUrl,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        /*
         * WhatsApp
         */
        if (
            jobType === "external" &&
            applyMethod === "whatsapp" &&
            whatsappNumber
        ) {
            const cleanNumber =
                whatsappNumber.replace(/\D/g, "");

            const message = encodeURIComponent(
                `Hello, I am interested in applying for the ${title} position at ${companyName}.`
            );

            window.open(
                `https://wa.me/${cleanNumber}?text=${message}`,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        /*
         * Old external jobs
         */
        if (
            jobType === "external" &&
            externalApplyUrl
        ) {
            window.open(
                externalApplyUrl,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        /*
         * Internal Job Hunter application
         */
        setIsApply(true);

        if (onApply) {
            onApply(job);
        }
    };

    /* ================= SHARE ================= */

    const handleShare = async () => {
        try {
            await navigator.share({
                title,
                text: `${title} at ${companyName}`,
                url: window.location.href,
            });
        } catch {
            try {
                await navigator.clipboard.writeText(
                    window.location.href
                );
            } catch {
                console.log("Unable to share");
            }
        }
    };

    /* ================= SAVE ================= */

    const handleSave = () => {
        if (!isSaving && onSave) {
            onSave(job._id);
        }
    };

    /* ================= APPLY BUTTON ================= */

    const renderApplyButton = () => {
        /*
         * External Website
         */
        if (
            jobType === "external" &&
            applyMethod === "website" &&
            externalApplyUrl
        ) {
            return (
                <button
                    onClick={handleApply}
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-slate-900
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition
                        hover:-translate-y-0.5
                        hover:bg-slate-800
                        hover:shadow-xl
                        dark:bg-white
                        dark:text-slate-900
                        dark:hover:bg-slate-100
                    "
                >
                    Apply Directly
                    <ArrowUpRight size={17} />
                </button>
            );
        }

        /*
         * WhatsApp
         */
        if (
            jobType === "external" &&
            applyMethod === "whatsapp" &&
            whatsappNumber
        ) {
            return (
                <button
                    onClick={handleApply}
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-emerald-600
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition
                        hover:-translate-y-0.5
                        hover:bg-emerald-700
                        hover:shadow-xl
                    "
                >
                    Apply via WhatsApp
                    <MessageCircle size={18} />
                </button>
            );
        }

        /*
         * Fallback external
         */
        if (
            jobType === "external" &&
            externalApplyUrl
        ) {
            return (
                <button
                    onClick={handleApply}
                    className="
                        flex w-full items-center
                        justify-center gap-2
                        rounded-2xl
                        bg-slate-900
                        px-5 py-4
                        text-sm font-bold
                        text-white
                        transition
                        hover:bg-slate-800
                        dark:bg-white
                        dark:text-slate-900
                    "
                >
                    Apply Directly
                    <ExternalLink size={17} />
                </button>
            );
        }

        /*
         * Internal Job
         */
        return (
            <button
                onClick={handleApply}
                className="
                    flex w-full items-center
                    justify-center gap-2
                    rounded-2xl
                    bg-blue-600
                    px-5 py-4
                    text-sm font-bold
                    text-white
                    transition
                    hover:-translate-y-0.5
                    hover:bg-blue-700
                    hover:shadow-xl
                "
            >
                Apply Now
                <ArrowUpRight size={17} />
            </button>
        );
    };

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-[#080b14] dark:text-white">

            <Seo
                title={`${title} - ${companyName}`}
                description={`${title} at ${companyName}. View job details, skills, location and application information.`}
                path={`/jobs/${job._id}`}
            />

            {/* =================================================
                TOP
            ================================================= */}

            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

                <button
                    onClick={onBack}
                    className="
                        inline-flex items-center gap-2
                        rounded-xl
                        px-3 py-2
                        text-sm font-medium
                        text-slate-500
                        transition
                        hover:bg-white
                        hover:text-slate-900
                        dark:hover:bg-slate-900
                        dark:hover:text-white
                    "
                >
                    <ArrowLeft size={17} />
                    Back to jobs
                </button>

            </div>

            {/* =================================================
                TOP AD
            ================================================= */}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AdSlot
                    slot="JOB_DETAIL_TOP_AD_SLOT"
                    className="my-6 min-h-[120px]"
                />
            </div>

            {/* =================================================
                MAIN
            ================================================= */}

            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* =================================================
                        LEFT
                    ================================================= */}

                    <div className="space-y-6">

                        {/* JOB HEADER */}

                        <div className="
                            rounded-3xl
                            border border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            sm:p-8
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

                                {/* LOGO */}

                                <div className="
                                    flex h-20 w-20
                                    shrink-0 items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-2xl
                                    border border-slate-200
                                    bg-slate-50
                                    dark:border-slate-700
                                    dark:bg-slate-800
                                ">

                                    {companyLogo ? (
                                        <img
                                            src={companyLogo}
                                            alt={companyName}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <Building2
                                            size={32}
                                            className="text-slate-400"
                                        />
                                    )}

                                </div>

                                {/* TITLE */}

                                <div className="min-w-0 flex-1">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            bg-blue-50
                                            px-3 py-1
                                            text-xs
                                            font-semibold
                                            text-blue-600
                                            dark:bg-blue-950/30
                                            dark:text-blue-400
                                        ">
                                            <BriefcaseBusiness
                                                size={13}
                                            />
                                            {employmentType}
                                        </span>

                                        {jobType === "external" && (
                                            <span className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                bg-emerald-50
                                                px-3 py-1
                                                text-xs
                                                font-semibold
                                                text-emerald-600
                                                dark:bg-emerald-950/30
                                                dark:text-emerald-400
                                            ">
                                                <CheckCircle2
                                                    size={13}
                                                />
                                                Direct Apply
                                            </span>
                                        )}

                                    </div>

                                    <h1 className="
                                        mt-3
                                        text-3xl
                                        font-black
                                        tracking-tight
                                        sm:text-4xl
                                    ">
                                        {title}
                                    </h1>

                                    <p className="
                                        mt-2
                                        text-base
                                        font-medium
                                        text-slate-600
                                        dark:text-slate-300
                                    ">
                                        {companyName}
                                    </p>

                                    <div className="
                                        mt-4
                                        flex flex-wrap
                                        gap-x-5 gap-y-3
                                        text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    ">

                                        <span className="inline-flex items-center gap-2">
                                            <MapPin size={16} />
                                            {location}
                                        </span>

                                        {postedDate && (
                                            <span className="inline-flex items-center gap-2">
                                                <CalendarDays size={16} />
                                                Posted {postedDate}
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* ACTIONS */}

                            <div className="
                                mt-8
                                flex flex-col gap-3
                                sm:flex-row
                            ">

                                <div className="flex-1">
                                    {renderApplyButton()}
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:border-blue-500
                                        hover:text-blue-600
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    <Bookmark
                                        size={18}
                                        fill={
                                            isSaved
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />

                                    {isSaved
                                        ? "Saved"
                                        : "Save"}
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:border-blue-500
                                        hover:text-blue-600
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    <Share2 size={18} />
                                    Share
                                </button>

                            </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div className="
                            rounded-3xl
                            border border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            sm:p-8
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <h2 className="text-xl font-bold">
                                Job Description
                            </h2>

                            <div className="
                                mt-5
                                whitespace-pre-line
                                text-sm
                                leading-7
                                text-slate-600
                                dark:text-slate-300
                            ">
                                {description}
                            </div>

                        </div>

                        {/* SKILLS */}

                        {skills.length > 0 && (
                            <div className="
                                rounded-3xl
                                border border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                sm:p-8
                                dark:border-slate-800
                                dark:bg-slate-900
                            ">

                                <h2 className="text-xl font-bold">
                                    Required Skills
                                </h2>

                                <div className="mt-5 flex flex-wrap gap-2">

                                    {skills.map(
                                        (skill, index) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-slate-200
                                                    bg-slate-50
                                                    px-4 py-2
                                                    text-sm
                                                    font-medium
                                                    text-slate-600
                                                    dark:border-slate-700
                                                    dark:bg-slate-800
                                                    dark:text-slate-300
                                                "
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>
                        )}

                        {/* IN CONTENT AD */}

                        <AdSlot
                            slot="JOB_DETAIL_CONTENT_AD_SLOT"
                            className="min-h-[180px]"
                        />

                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================= */}

                    <aside className="space-y-6">

                        {/* APPLY CARD */}

                        <div className="
                            sticky top-24
                            rounded-3xl
                            border border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <h2 className="text-lg font-bold">
                                Interested in this job?
                            </h2>

                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500
                                dark:text-slate-400
                            ">
                                Apply now and take the next
                                step in your career.
                            </p>

                            <div className="mt-5">
                                {renderApplyButton()}
                            </div>

                            <div className="
                                mt-5
                                border-t
                                border-slate-200
                                pt-5
                                dark:border-slate-800
                            ">

                                <div className="flex items-center gap-3">

                                    <ShieldCheck
                                        size={20}
                                        className="text-emerald-500"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Job Hunter
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Job listing platform
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* SIDEBAR AD */}

                        <AdSlot
                            slot="JOB_DETAIL_SIDEBAR_AD_SLOT"
                            className="min-h-[280px]"
                        />

                        {/* QUICK INFO */}

                        <div className="
                            rounded-3xl
                            border border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            dark:border-slate-800
                            dark:bg-slate-900
                        ">

                            <h2 className="text-lg font-bold">
                                Job Overview
                            </h2>

                            <div className="mt-5 space-y-5">

                                <div className="flex gap-3">

                                    <BriefcaseBusiness
                                        size={19}
                                        className="mt-0.5 text-blue-600"
                                    />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Employment
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {employmentType}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <MapPin
                                        size={19}
                                        className="mt-0.5 text-blue-600"
                                    />

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {location}
                                        </p>
                                    </div>

                                </div>

                                {postedDate && (
                                    <div className="flex gap-3">

                                        <Clock3
                                            size={19}
                                            className="mt-0.5 text-blue-600"
                                        />

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Posted
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {postedDate}
                                            </p>
                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </aside>

                </div>

            </section>

            {/* =================================================
                INTERNAL APPLY MODAL
            ================================================= */}

            {isApply && (
                <div className="
                    fixed inset-0 z-[999]
                    flex items-center justify-center
                    bg-black/60
                    px-4
                    backdrop-blur-sm
                ">

                    <div className="
                        relative
                        max-h-[90vh]
                        w-full max-w-lg
                        overflow-y-auto
                        rounded-3xl
                        bg-white
                        p-6
                        shadow-2xl
                        dark:bg-slate-900
                    ">

                        <button
                            onClick={() => setIsApply(false)}
                            className="
                                absolute right-5 top-5
                                rounded-full p-2
                                text-slate-400
                                transition
                                hover:bg-slate-100
                                hover:text-slate-900
                                dark:hover:bg-slate-800
                                dark:hover:text-white
                            "
                        >
                            <X size={20} />
                        </button>

                        <div className="pr-10">

                            <h2 className="text-2xl font-bold">
                                Apply for this job
                            </h2>

                            <p className="
                                mt-1
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            ">
                                Complete your application below.
                            </p>

                        </div>

                        <div className="mt-6">

                            <ApplyJobForm
                                jobId={job._id}
                                setIsApply={setIsApply}
                            />

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
};

export default JobDetail;