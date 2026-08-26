import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    Search,
    MapPin,
    SlidersHorizontal,
    BriefcaseBusiness,
    X,
    RotateCcw,
    ServerOff,
    ArrowDownUp,
} from "lucide-react";

import {
    useSavedJobMutation,
    useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import { staticJobs } from "../../Data/staticJobs";
import NotificationToasty from "../../components/common/NotificationToasty";
import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import JobCard from "../../components/jobs/JobCard";
import Seo from "../../components/common/Seo";
import { useGetAllforJobsQuery } from "../../RTK/HrService";
import AdSlot from "../../components/common/AdSlot";

const FindJob = () => {
    // =====================================================
    // SEARCH STATE
    // =====================================================

    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [skills, setSkills] = useState("");

    // =====================================================
    // VIEW / FILTER STATE
    // =====================================================

    const [cardsPerRow, setCardsPerRow] = useState(2);
    const [sortBy, setSortBy] = useState("latest");
    const [remoteOnly, setRemoteOnly] = useState(false);

    // =====================================================
    // URL SEARCH PARAM
    // =====================================================

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const urlSearch = searchParams.get("search");

        if (urlSearch) {
            setSearchTerm(urlSearch);
        }
    }, [searchParams]);

    // =====================================================
    // UI STATE
    // =====================================================

    const [isApply, setIsApply] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [message, setMessage] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // =====================================================
    // SAVED JOB API
    // =====================================================

    const [savedJob] = useSavedJobMutation();

    const {
        data: savedData,
        isLoading: savedJobsLoading,
    } = useGetSavedJobsQuery();

    // Track only the job currently being saved
    const [savingJobId, setSavingJobId] = useState(null);

    // =====================================================
    // ALL JOBS API
    // =====================================================

    const {
        data: allJob,
        isLoading,
        isError,
    } = useGetAllforJobsQuery();

    // =====================================================
    // BACKEND JOBS
    // =====================================================

    const backendJobs = useMemo(() => {
        if (Array.isArray(allJob)) {
            return allJob;
        }

        if (Array.isArray(allJob?.jobs)) {
            return allJob.jobs;
        }

        if (Array.isArray(allJob?.data)) {
            return allJob.data;
        }

        return [];
    }, [allJob]);

    // =====================================================
    // SAVED JOB IDS
    // =====================================================

    const savedJobIds = useMemo(() => {
        if (Array.isArray(savedData)) {
            return savedData.map((job) => job?._id).filter(Boolean);
        }

        if (Array.isArray(savedData?.savedJobs)) {
            return savedData.savedJobs
                .map((job) => job?._id)
                .filter(Boolean);
        }

        if (Array.isArray(savedData?.data)) {
            return savedData.data
                .map((job) => job?._id)
                .filter(Boolean);
        }

        return [];
    }, [savedData]);

    // =====================================================
    // HELPER: REMOTE JOB
    // =====================================================

    const isRemoteJob = (job) => {
        const jobLocation =
            job?.location?.toLowerCase().trim() || "";

        return (
            jobLocation.includes("remote") ||
            jobLocation.includes("work from home") ||
            jobLocation.includes("wfh")
        );
    };

    // =====================================================
    // HELPER: SALARY VALUE
    // =====================================================

    const getSalaryValue = (job) => {
        const min = Number(job?.salaryRange?.min);
        const max = Number(job?.salaryRange?.max);

        if (!Number.isNaN(max) && max > 0) {
            return max;
        }

        if (!Number.isNaN(min) && min > 0) {
            return min;
        }

        return 0;
    };

    // =====================================================
    // FILTER BACKEND JOBS
    // =====================================================

    const filteredBackendJobs = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();
        const selectedLocation = location.toLowerCase().trim();
        const selectedSkill = skills.toLowerCase().trim();

        const filtered = backendJobs.filter((job) => {
            // SEARCH
            const matchesSearch =
                !search ||
                job?.title?.toLowerCase().includes(search) ||
                job?.description?.toLowerCase().includes(search) ||
                job?.company?.companyName
                    ?.toLowerCase()
                    .includes(search) ||
                job?.companyName
                    ?.toLowerCase()
                    .includes(search) ||
                job?.jobCategory
                    ?.toLowerCase()
                    .includes(search) ||
                job?.skills?.some((skill) =>
                    skill?.toLowerCase().includes(search)
                );

            // LOCATION
            const matchesLocation =
                !selectedLocation ||
                job?.location
                    ?.toLowerCase()
                    .includes(selectedLocation);

            // EMPLOYMENT
            const matchesEmployment =
                !employmentType ||
                job?.employmentType === employmentType;

            // SKILLS
            const matchesSkill =
                !selectedSkill ||
                job?.skills?.some((skill) =>
                    skill?.toLowerCase().includes(selectedSkill)
                );

            // REMOTE
            const matchesRemote =
                !remoteOnly || isRemoteJob(job);

            return (
                matchesSearch &&
                matchesLocation &&
                matchesEmployment &&
                matchesSkill &&
                matchesRemote
            );
        });

        // SORT
        return [...filtered].sort((a, b) => {
            if (sortBy === "salaryHigh") {
                return (
                    getSalaryValue(b) -
                    getSalaryValue(a)
                );
            }

            if (sortBy === "salaryLow") {
                return (
                    getSalaryValue(a) -
                    getSalaryValue(b)
                );
            }

            return (
                new Date(b?.createdAt || 0) -
                new Date(a?.createdAt || 0)
            );
        });
    }, [
        backendJobs,
        searchTerm,
        location,
        employmentType,
        skills,
        remoteOnly,
        sortBy,
    ]);

    // =====================================================
    // FILTER STATIC JOBS
    // =====================================================

    const filteredStaticJobs = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();
        const selectedLocation = location.toLowerCase().trim();
        const selectedSkill = skills.toLowerCase().trim();

        const filtered = staticJobs.filter((job) => {
            // SEARCH
            const matchesSearch =
                !search ||
                job?.title?.toLowerCase().includes(search) ||
                job?.company?.name
                    ?.toLowerCase()
                    .includes(search) ||
                job?.companyName
                    ?.toLowerCase()
                    .includes(search) ||
                job?.description
                    ?.toLowerCase()
                    .includes(search) ||
                job?.jobCategory
                    ?.toLowerCase()
                    .includes(search) ||
                job?.skills?.some((skill) =>
                    skill?.toLowerCase().includes(search)
                );

            // LOCATION
            const matchesLocation =
                !selectedLocation ||
                job?.location
                    ?.toLowerCase()
                    .includes(selectedLocation);

            // EMPLOYMENT
            const matchesEmployment =
                !employmentType ||
                job?.employmentType === employmentType;

            // SKILLS
            const matchesSkill =
                !selectedSkill ||
                job?.skills?.some((skill) =>
                    skill?.toLowerCase().includes(selectedSkill)
                );

            // REMOTE
            const matchesRemote =
                !remoteOnly || isRemoteJob(job);

            return (
                matchesSearch &&
                matchesLocation &&
                matchesEmployment &&
                matchesSkill &&
                matchesRemote
            );
        });

        // SORT
        return [...filtered].sort((a, b) => {
            if (sortBy === "salaryHigh") {
                return (
                    getSalaryValue(b) -
                    getSalaryValue(a)
                );
            }

            if (sortBy === "salaryLow") {
                return (
                    getSalaryValue(a) -
                    getSalaryValue(b)
                );
            }

            return (
                new Date(b?.createdAt || 0) -
                new Date(a?.createdAt || 0)
            );
        });
    }, [
        searchTerm,
        location,
        employmentType,
        skills,
        remoteOnly,
        sortBy,
    ]);

    // =====================================================
    // FINAL JOB DATA
    // =====================================================

    const jobsData = isError
        ? filteredStaticJobs
        : filteredBackendJobs;

    // =====================================================
    // ACTIVE FILTERS
    // =====================================================

    const activeFilters = useMemo(() => {
        const filters = [];

        if (searchTerm.trim()) {
            filters.push({
                key: "search",
                label: searchTerm.trim(),
            });
        }

        if (location.trim()) {
            filters.push({
                key: "location",
                label: location.trim(),
            });
        }

        if (employmentType) {
            filters.push({
                key: "employment",
                label: employmentType,
            });
        }

        if (skills.trim()) {
            filters.push({
                key: "skills",
                label: skills.trim(),
            });
        }

        if (remoteOnly) {
            filters.push({
                key: "remote",
                label: "Remote only",
            });
        }

        return filters;
    }, [
        searchTerm,
        location,
        employmentType,
        skills,
        remoteOnly,
    ]);

    // =====================================================
    // REMOVE FILTER
    // =====================================================

    const removeFilter = (filterKey) => {
        switch (filterKey) {
            case "search":
                setSearchTerm("");
                break;

            case "location":
                setLocation("");
                break;

            case "employment":
                setEmploymentType("");
                break;

            case "skills":
                setSkills("");
                break;

            case "remote":
                setRemoteOnly(false);
                break;

            default:
                break;
        }
    };

    // =====================================================
    // SAVE JOB
    // =====================================================

    const handleSaveJob = async (id) => {
        if (!id) return;

        try {
            setSavingJobId(id);
            setMessage("Saving job...");

            await savedJob(id).unwrap();

            setMessage("Job saved successfully");
        } catch (error) {
            setMessage(
                error?.data?.message ||
                    "Please login to save this job"
            );
        } finally {
            setSavingJobId(null);
        }
    };

    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {
        setSearchTerm("");
        setLocation("");
        setEmploymentType("");
        setSkills("");
        setRemoteOnly(false);
        setSortBy("latest");
    };

    // =====================================================
    // AUTO HIDE TOAST
    // =====================================================

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, 2500);

        return () => clearTimeout(timer);
    }, [message]);

    // =====================================================
    // UI
    // =====================================================

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#080b14] dark:text-white">
            {/* SEO */}

            <Seo
                title="Find a job"
                description="Search thousands of jobs by title, skill, or location. Filter by employment type and apply directly to verified listings."
                path="/find-job"
            />

            {/* TOAST */}

            {message && (
                <NotificationToasty message={message} />
            )}

            {/* =================================================
                HERO SEARCH
            ================================================= */}

            <section className="relative overflow-hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0d111c]">
                <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                            Discover jobs that match your skills,
                            goals, and career ambitions.
                        </p>
                    </div>

                    {/* SEARCH BOX */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-4">
                        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
                            {/* KEYWORD */}

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                                <Search
                                    size={21}
                                    className="shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Job title, skill, or company"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
                                />
                            </div>

                            {/* LOCATION */}

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus-within:bg-slate-900">
                                <MapPin
                                    size={21}
                                    className="shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                        )
                                    }
                                    placeholder="City, state, or remote"
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
                                />
                            </div>

                            {/* SEARCH BUTTON */}

                            <button
                                type="button"
                                onClick={() => {
                                    document
                                        .getElementById(
                                            "job-results"
                                        )
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                }}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <Search size={18} />
                                Search Jobs
                            </button>
                        </div>

                        {/* POPULAR SEARCHES */}

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
                                    type="button"
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

            {/* TOP ADSENSE */}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AdSlot
                    slot="YOUR_AD_SLOT_ID"
                    format="auto"
                    className="my-8 min-h-[100px]"
                />
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section
                id="job-results"
                className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
            >
                {/* SERVER DOWN */}

                {isError && (
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                        <ServerOff
                            size={20}
                            className="mt-0.5 shrink-0"
                        />

                        <div>
                            <p className="font-semibold">
                                Server is currently unavailable
                            </p>

                            <p className="mt-1 text-sm opacity-80">
                                We are showing sample job
                                opportunities while the server
                                is down.
                            </p>
                        </div>
                    </div>
                )}

                {/* MOBILE FILTER BUTTON */}

                <button
                    type="button"
                    onClick={() =>
                        setShowFilters(!showFilters)
                    }
                    className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:hidden"
                >
                    <SlidersHorizontal size={18} />

                    Filters

                    {activeFilters.length > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] text-white">
                            {activeFilters.length}
                        </span>
                    )}
                </button>

                <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* =================================================
                        FILTER SIDEBAR
                    ================================================= */}

                    <aside
                        className={`h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
                            showFilters
                                ? "block"
                                : "hidden lg:block"
                        }`}
                    >
                        {/* HEADER */}

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
                                type="button"
                                onClick={clearFilters}
                                className="text-xs font-semibold text-blue-600 hover:underline"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* EMPLOYMENT TYPE */}

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
                                                employmentType ===
                                                type
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

                            {employmentType && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEmploymentType("")
                                    }
                                    className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                                >
                                    Clear employment type
                                </button>
                            )}
                        </div>

                        {/* REMOTE TOGGLE */}

                        <div className="border-b border-slate-200 py-6 dark:border-slate-800">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold">
                                        Remote jobs
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Show remote opportunities
                                        only
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={remoteOnly}
                                    onClick={() =>
                                        setRemoteOnly(
                                            !remoteOnly
                                        )
                                    }
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                                        remoteOnly
                                            ? "bg-blue-600"
                                            : "bg-slate-200 dark:bg-slate-700"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                            remoteOnly
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* SKILLS */}

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

                    {/* =================================================
                        RESULTS
                    ================================================= */}

                    <div>
                        {/* RESULTS HEADER */}

                        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {jobsData.length}

                                    <span className="ml-2 text-slate-500 dark:text-slate-400">
                                        jobs found
                                    </span>
                                </h2>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* VIEW TOGGLE */}

                                <div
                                    className="flex items-center rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900"
                                    role="group"
                                    aria-label="Jobs per row"
                                >
                                    <span className="px-2 text-xs font-medium text-slate-400">
                                        View
                                    </span>

                                    {[2, 3, 4].map(
                                        (count) => (
                                            <button
                                                key={count}
                                                type="button"
                                                onClick={() =>
                                                    setCardsPerRow(
                                                        count
                                                    )
                                                }
                                                aria-pressed={
                                                    cardsPerRow ===
                                                    count
                                                }
                                                aria-label={`${count} jobs per row`}
                                                className={`min-w-9 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                                                    cardsPerRow ===
                                                    count
                                                        ? "bg-blue-600 text-white shadow-sm"
                                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                                }`}
                                            >
                                                {count}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* SORT */}

                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                                    <ArrowDownUp
                                        size={15}
                                        className="text-slate-400"
                                    />

                                    <label
                                        htmlFor="sortJobs"
                                        className="sr-only"
                                    >
                                        Sort jobs
                                    </label>

                                    <select
                                        id="sortJobs"
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(
                                                e.target.value
                                            )
                                        }
                                        className="bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-white"
                                    >
                                        <option value="latest">
                                            Latest
                                        </option>

                                        <option value="salaryHigh">
                                            Salary: High to Low
                                        </option>

                                        <option value="salaryLow">
                                            Salary: Low to High
                                        </option>
                                    </select>
                                </div>

                                {/* RESET */}

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                                >
                                    <RotateCcw size={15} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* ACTIVE FILTERS */}

                        {activeFilters.length > 0 && (
                            <div className="mb-6 flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-xs font-medium text-slate-400">
                                    Active:
                                </span>

                                {activeFilters.map(
                                    (filter) => (
                                        <button
                                            key={filter.key}
                                            type="button"
                                            onClick={() =>
                                                removeFilter(
                                                    filter.key
                                                )
                                            }
                                            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                                        >
                                            {filter.label}
                                            <X size={13} />
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {/* LOADING */}

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {[1, 2, 3, 4].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
                                        />
                                    )
                                )}
                            </div>
                        ) : jobsData.length === 0 ? (
                            /* NO JOBS */

                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">
                                <BriefcaseBusiness
                                    size={40}
                                    className="mx-auto mb-4 text-slate-400"
                                />

                                <h3 className="text-xl font-bold">
                                    No jobs found
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    Try changing your search
                                    filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            /* JOB CARDS */

                            <div
                                className="grid grid-cols-1 gap-6 sm:[grid-template-columns:var(--job-columns)]"
                                style={{
                                    "--job-columns": `repeat(${cardsPerRow}, minmax(0, 1fr))`,
                                }}
                            >
                                {jobsData.map(
                                    (job, index) => (
                                        <React.Fragment
                                            key={
                                                job?._id ||
                                                `${job?.title}-${index}`
                                            }
                                        >
                                            <JobCard
                                                job={job}

                                                isSaved={savedJobIds.includes(
                                                    job?._id
                                                )}

                                                onSave={
                                                    handleSaveJob
                                                }

                                                onApply={(
                                                    selectedJob
                                                ) => {
                                                    if (
                                                        selectedJob?.jobType ===
                                                            "internal" ||
                                                        !selectedJob?.jobType
                                                    ) {
                                                        setSelectedJobId(
                                                            selectedJob?._id
                                                        );

                                                        setIsApply(
                                                            true
                                                        );
                                                    }
                                                }}

                                                // IMPORTANT:
                                                // Only clicked card gets saving state
                                                isSaving={
                                                    savingJobId ===
                                                    job?._id
                                                }

                                                jobType={
                                                    job?.jobType
                                                }

                                                companyLogo={
                                                    job?.companyLogo
                                                }

                                                uploadedByRole={
                                                    job?.uploadedByRole
                                                }
                                            />

                                            {/* IN-FEED ADSENSE */}

                                            {(index + 1) %
                                                6 ===
                                                0 && (
                                                <div className="col-span-full">
                                                    <AdSlot
                                                        slot="YOUR_AD_SLOT_ID"
                                                        format="auto"
                                                        className="min-h-[120px]"
                                                    />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* =================================================
                APPLY MODAL
            ================================================= */}

            {isApply && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="apply-job-title"
                >
                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
                        <button
                            type="button"
                            onClick={() =>
                                setIsApply(false)
                            }
                            aria-label="Close application form"
                            className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="pr-10">
                            <h2
                                id="apply-job-title"
                                className="text-2xl font-bold"
                            >
                                Apply for this job
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Complete your application
                                below.
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