import React, { useState } from "react";
import { Search, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import { useGetAllcompanyQuery } from "../../RTK/CompanyService";

import staticCompanies from "../../Data/companyData";
import CompanyCard from "../../components/company/CompanyCard";

const BrowseCompanies = () => {
const [search, setSearch] = useState("");

const {
data: companiesData,
isLoading,
isError,
} = useGetAllcompanyQuery();

const apiCompanies = companiesData?.companies || [];

/*
API companies will be shown when available.
Static companies will be shown when:
1. Backend is down
2. API returns an error
3. API returns an empty array
*/
const companies =
!isError && apiCompanies.length > 0
? apiCompanies
: staticCompanies;

const filteredCompanies = companies.filter((company) => {
const companyName = company.companyName || company.name || "";

return companyName
  .toLowerCase()
  .includes(search.toLowerCase());


});

return ( <main className="min-h-screen bg-slate-50 dark:bg-slate-950">


  {/* ================= HERO ================= */}
  <section className="relative overflow-hidden">

    {/* Background Glow */}
    <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

    <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span>Home</span>
        <span>/</span>
        <span className="font-medium text-blue-600">
          Companies
        </span>
      </div>

      {/* Hero Content */}
      <div className="mx-auto max-w-3xl text-center">

        <div
          className="
            mx-auto mb-5 flex w-fit items-center gap-2
            rounded-full border border-blue-100
            bg-blue-50 px-4 py-2
            text-sm font-semibold text-blue-600
            dark:border-blue-900/50
            dark:bg-blue-950/30
            dark:text-blue-400
          "
        >
          <Sparkles size={16} />
          Discover your next opportunity
        </div>

        <h1
          className="
            text-4xl font-black tracking-tight
            text-slate-900
            sm:text-5xl
            lg:text-6xl
            dark:text-white
          "
        >
          Explore companies.
          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Find your future.
          </span>
        </h1>

        <p
          className="
            mx-auto mt-6 max-w-2xl
            text-base leading-7
            text-slate-500
            sm:text-lg
            dark:text-slate-400
          "
        >
          Discover innovative companies, explore their culture,
          and find opportunities that match your career goals.
        </p>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="mx-auto mt-10 max-w-2xl">

        <div
          className="
            group relative flex items-center
            rounded-2xl border
            border-slate-200
            bg-white p-2
            shadow-xl shadow-slate-200/50
            transition
            focus-within:border-blue-500
            focus-within:shadow-blue-500/10
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-black/20
          "
        >

          <Search
            size={22}
            className="
              ml-4 shrink-0
              text-slate-400
              transition
              group-focus-within:text-blue-600
            "
          />

          <input
            type="text"
            placeholder="Search companies by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-transparent
              px-4 py-4
              text-sm
              text-slate-900
              outline-none
              placeholder:text-slate-400
              dark:text-white
            "
          />

          <button
            className="
              hidden rounded-xl
              bg-blue-600
              px-5 py-3
              text-sm font-semibold
              text-white
              transition
              hover:bg-blue-700
              sm:block
            "
          >
            Search
          </button>

        </div>

      </div>

    </div>

  </section>


  {/* ================= COMPANY CONTENT ================= */}
  <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div
      className="
        mb-8 flex
        flex-col gap-4
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
    >

      <div>

        <div className="flex items-center gap-2">
          <Building2
            size={22}
            className="text-blue-600"
          />

          <h2
            className="
              text-2xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            Top Companies
          </h2>
        </div>

        <p
          className="
            mt-2 text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          {filteredCompanies.length} companies available
        </p>

      </div>

      {search && (
        <button
          onClick={() => setSearch("")}
          className="
            flex items-center gap-2
            text-sm font-semibold
            text-blue-600
            hover:text-blue-700
          "
        >
          Clear search
          <ArrowUpRight size={16} />
        </button>
      )}

    </div>


    {/* Loading */}
    {isLoading && (
      <div
        className="
          grid grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="
              h-72 animate-pulse
              rounded-3xl
              bg-slate-200
              dark:bg-slate-800
            "
          />
        ))}
      </div>
    )}


    {/* Companies */}
    {!isLoading && filteredCompanies.length > 0 && (
      <div
        className="
          grid grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >

        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
          />
        ))}

      </div>
    )}


    {/* Empty State */}
    {!isLoading && filteredCompanies.length === 0 && (
      <div
        className="
          flex min-h-[300px]
          flex-col items-center
          justify-center
          rounded-3xl
          border border-dashed
          border-slate-300
          bg-white
          text-center
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <div
          className="
            mb-4 flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-slate-100
            dark:bg-slate-800
          "
        >
          <Building2
            size={30}
            className="text-slate-400"
          />
        </div>

        <h3
          className="
            text-lg font-bold
            text-slate-900
            dark:text-white
          "
        >
          No companies found
        </h3>

        <p
          className="
            mt-2 max-w-sm
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Try searching with a different company name.
        </p>

      </div>
    )}

  </section>

</main>


);
};

export default BrowseCompanies;
