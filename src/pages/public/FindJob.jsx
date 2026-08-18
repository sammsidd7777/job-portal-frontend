
import React, { useEffect, useMemo, useState } from "react";
import {
    Search,
    MapPin,
    Bookmark,
    BookmarkCheck,
    SlidersHorizontal,
    BriefcaseBusiness,
    Clock3,
    X,
    RotateCcw,
} from "lucide-react";

import { useGetFilteredJobsQuery } from "../../RTK/AuthService";
import {
    useSavedJobMutation,
    useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import { staticJobs } from "../../Data/staticJobs";
import NotificationToasty from "../../components/common/NotificationToasty";
import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import JobCard from "../../components/jobs/JobCard";

const FindJob = () => {
    /* ================= SEARCH STATE ================= */

    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [skills, setSkills] = useState("");

    /* ================= UI STATE ================= */

    const [isApply, setIsApply] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [message, setMessage] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    /* ================= API ================= */

    const [saveJob, { isLoading: saving }] = useSavedJobMutation();

    const { data: savedData } = useGetSavedJobsQuery();

    const {
        data: apiJobs,
        isLoading,
        isError,
    } = useGetFilteredJobsQuery({
        search: searchTerm,
        location,
        employmentType,
        skill: skills,
    });

    /* ================= SAVED JOB IDS ================= */

    const savedJobIds =
        savedData?.savedJobs?.map((job) => job._id) || [];

    /* ================= FILTER STATIC JOBS ================= */

    const filteredStaticJobs = useMemo(() => {
        return staticJobs.filter((job) => {
            const search = searchTerm.toLowerCase().trim();
            const selectedLocation = location.toLowerCase().trim();
            const selectedSkill = skills.toLowerCase().trim();

            const matchesSearch =
                !search ||
                job.title.toLowerCase().includes(search) ||
                job.company?.name?.toLowerCase().includes(search) ||
                job.description?.toLowerCase().includes(search);

            const matchesLocation =
                !selectedLocation ||
                job.location.toLowerCase().includes(selectedLocation);

            const matchesEmployment =
                !employmentType ||
                job.employmentType === employmentType;

            const matchesSkill =
                !selectedSkill ||
                job.skills?.some((skill) =>
                    skill.toLowerCase().includes(selectedSkill)
                );

            return (
                matchesSearch &&
                matchesLocation &&
                matchesEmployment &&
                matchesSkill
            );
        });
    }, [
        searchTerm,
        location,
        employmentType,
        skills,
    ]);

    /* ================= FINAL JOB DATA ================= */

    const jobsData =
        !isError && apiJobs?.length > 0
            ? apiJobs
            : filteredStaticJobs;

    /* ================= SAVE JOB ================= */

    const handleSaveJob = async (id) => {
        try {
            setMessage("Saving job...");

            await saveJob(id).unwrap();

            setMessage("Job saved successfully");
        } catch (error) {
            setMessage(
                error?.data?.message ||
                "Please login to save this job"
            );
        }
    };

    /* ================= CLEAR FILTERS ================= */

    const clearFilters = () => {
        setSearchTerm("");
        setLocation("");
        setEmploymentType("");
        setSkills("");
    };

    /* ================= AUTO HIDE TOAST ================= */

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, 2500);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#080b14] dark:text-white">

            {/* ================= TOAST ================= */}

            {message && (
                <NotificationToasty message={message} />
            )}

            {/* ================= HERO SEARCH ================= */}

            <section className="relative overflow-hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0d111c]">

                {/* Background Decoration */}

                <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    {/* Heading */}

                    <div className="mb-10 max-w-2xl">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400">

                            <BriefcaseBusiness size={16} />

                            Explore career opportunities

                        </div>

                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">

                            Find your next
                            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">

                                great opportunity.

                            </span>

                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">

                            Discover jobs that match your skills, goals, and career ambitions.

                        </p>

                    </div>

                    {/* Search Box */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-4">

                        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">

                            {/* Keyword */}

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">

                                <Search
                                    size={21}
                                    className="shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Job title, skill, or company"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
                                />

                            </div>

                            {/* Location */}

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">

                                <MapPin
                                    size={21}
                                    className="shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="City, state, or remote"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
                                />

                            </div>

                            {/* Search Button */}

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                            >

                                <Search size={18} />

                                Search Jobs

                            </button>

                        </div>

                        {/* Popular Searches */}

                        <div className="mt-5 flex flex-wrap items-center gap-2">

                            <span className="mr-2 text-sm text-slate-400">

                                Popular:

                            </span>

                            {[
                                "React Developer",
                                "MERN Stack",
                                "Frontend Developer",
                                "Remote",
                            ].map((item) => (

                                <button
                                    key={item}
                                    onClick={() =>
                                        setSearchTerm(item)
                                    }
                                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-950/30"
                                >

                                    {item}

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= MAIN CONTENT ================= */}

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Mobile Filter Button */}

                <button
                    onClick={() =>
                        setShowFilters(!showFilters)
                    }
                    className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:hidden"
                >

                    <SlidersHorizontal size={18} />

                    Filters

                </button>

                <div className="grid gap-8 lg:grid-cols-[250px_1fr]">

                    {/* ================= FILTER SIDEBAR ================= */}

                    <aside
                        className={`h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${showFilters
                                ? "block"
                                : "hidden lg:block"
                            }`}
                    >

                        <div className="mb-6 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <SlidersHorizontal
                                    size={18}
                                    className="text-blue-600"
                                />

                                <h2 className="font-bold">

                                    Filters

                                </h2>

                            </div>

                            <button
                                onClick={clearFilters}
                                className="text-xs font-semibold text-blue-600 hover:underline"
                            >

                                Clear all

                            </button>

                        </div>

                        {/* Job Type */}

                        <div className="border-b border-slate-200 pb-6 dark:border-slate-800">

                            <h3 className="mb-4 font-semibold">

                                Employment type

                            </h3>

                            <div className="space-y-3">

                                {[
                                    "Full-time",
                                    "Part-time",
                                    "Contract",
                                    "Internship",
                                ].map((type) => (

                                    <label
                                        key={type}
                                        className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                                    >

                                        <input
                                            type="radio"
                                            name="employment"
                                            value={type}
                                            checked={
                                                employmentType === type
                                            }
                                            onChange={(e) =>
                                                setEmploymentType(
                                                    e.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-blue-600"
                                        />

                                        {type}

                                    </label>

                                ))}

                            </div>

                        </div>

                        {/* Skills */}

                        <div className="pt-6">

                            <h3 className="mb-3 font-semibold">

                                Skills

                            </h3>

                            <input
                                type="text"
                                value={skills}
                                onChange={(e) =>
                                    setSkills(e.target.value)
                                }
                                placeholder="React, Node, MongoDB"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                        </div>

                    </aside>

                    {/* ================= JOB RESULTS ================= */}

                    <div>

                        {/* Results Header */}

                        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {jobsData.length}

                                    <span className="ml-2 text-slate-500 dark:text-slate-400">

                                        jobs found

                                    </span>

                                </h2>

                                {isError && (

                                    <p className="mt-1 text-xs text-amber-600">

                                        Showing available opportunities

                                    </p>

                                )}

                            </div>

                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                            >

                                <RotateCcw size={15} />

                                Reset filters

                            </button>

                        </div>

                        {/* Loading */}

                        {isLoading && !apiJobs ? (

                            <div className="grid gap-5 md:grid-cols-2">

                                {[1, 2, 3, 4].map((item) => (

                                    <div
                                        key={item}
                                        className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
                                    />

                                ))}

                            </div>

                        ) : jobsData.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">

                                <BriefcaseBusiness
                                    size={40}
                                    className="mx-auto mb-4 text-slate-400"
                                />

                                <h3 className="text-xl font-bold">

                                    No jobs found

                                </h3>

                                <p className="mt-2 text-slate-500">

                                    Try changing your search filters.

                                </p>

                                <button
                                    onClick={clearFilters}
                                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                                >

                                    Clear filters

                                </button>

                            </div>

                        ) : (

                            <div className="grid gap-6 sm:grid-cols-2">
                                {jobsData.map((job) => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                        isSaved={savedJobIds.includes(job._id)}
                                        onSave={handleSaveJob}
                                        onApply={(selectedJob) => {
                                            setSelectedJobId(selectedJob._id);
                                            setIsApply(true);
                                        }}
                                        isSaving={saving}
                                        jobType={job?.jobType}
                                    />
                                ))}
                            </div>

                        )}

                    </div>

                </div>

            </section>

            {/* ================= APPLY MODAL ================= */}

            {isApply && (

                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">

                        <button
                            onClick={() =>
                                setIsApply(false)
                            }
                            className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                        >

                            <X size={20} />

                        </button>

                        <div className="pr-10">

                            <h2 className="text-2xl font-bold">

                                Apply for this job

                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                                Complete your application below.

                            </p>

                        </div>

                        <div className="mt-6">

                            <ApplyJobForm
                                jobId={selectedJobId}
                                setIsApply={setIsApply}
                            />

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
};

export default FindJob;

