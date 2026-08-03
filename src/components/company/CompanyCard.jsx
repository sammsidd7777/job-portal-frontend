import React from "react";
import { Link } from "react-router-dom";
import {
Users,
CalendarDays,
BriefcaseBusiness,
ArrowUpRight,
} from "lucide-react";

const CompanyCard = ({ company }) => {

    console.log(company,"cardSection")
return (
<Link
to={`/company/${company._id}`}
className="
group block
bg-white dark:bg-gray-900
border border-gray-200 dark:border-gray-800
rounded-2xl
p-6
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all duration-300
"
>
{/* Company Header */} <div className="flex items-center justify-between gap-4 mb-5"> <div className="flex items-center gap-4 min-w-0">
<img
src={company.logo || "/meta.png"}
alt={company.companyName}
className="
w-16 h-16
rounded-2xl
object-cover
border border-gray-200 dark:border-gray-700
group-hover:scale-105
transition-transform duration-300
"
/>

```
      <div className="min-w-0">
        <h2 className="
          text-lg
          font-semibold
          text-gray-900 dark:text-white
          truncate
        ">
          {company.companyName}
        </h2>

        <p className="
          text-sm
          text-gray-500 dark:text-gray-400
          mt-1
          truncate
        ">
          {company.category || "Industry not provided"}
        </p>
      </div>
    </div>

    {/* Arrow */}
    <ArrowUpRight
      size={20}
      className="
        shrink-0
        text-gray-400
        group-hover:text-blue-600
        group-hover:translate-x-1
        group-hover:-translate-y-1
        transition-all duration-300
      "
    />
  </div>

  {/* Description */}
  <p className="
    text-sm
    leading-6
    text-gray-600 dark:text-gray-300
    line-clamp-2
    min-h-[48px]
    mb-6
  ">
    {company.description || "No description available."}
  </p>

  {/* Company Stats */}
  <div className="
    grid grid-cols-3
    gap-3
    border-t
    border-gray-100 dark:border-gray-800
    pt-5
  ">
    {/* Employees */}
    <div className="text-center">
      <Users
        size={18}
        className="mx-auto mb-1 text-blue-500"
      />

      <p className="
        text-xs
        text-gray-500 dark:text-gray-400
      ">
        Employees
      </p>

      <p className="
        mt-1
        text-sm
        font-semibold
        text-gray-900 dark:text-white
      ">
        {company.employees || "N/A"}
      </p>
    </div>

    {/* Founded */}
    <div className="text-center">
      <CalendarDays
        size={18}
        className="mx-auto mb-1 text-purple-500"
      />

      <p className="
        text-xs
        text-gray-500 dark:text-gray-400
      ">
        Founded
      </p>

      <p className="
        mt-1
        text-sm
        font-semibold
        text-gray-900 dark:text-white
      ">
        {company.founded || "N/A"}
      </p>
    </div>

    {/* Jobs */}
    <div className="text-center">
      <BriefcaseBusiness
        size={18}
        className="mx-auto mb-1 text-green-500"
      />

      <p className="
        text-xs
        text-gray-500 dark:text-gray-400
      ">
        Open Jobs
      </p>

      <p className="
        mt-1
        text-sm
        font-semibold
        text-blue-600 dark:text-blue-400
      ">
        {company.totalJobs || 0}
      </p>
    </div>
  </div>

  {/* Bottom Action */}
  <div className="
    mt-6
    text-sm
    font-medium
    text-blue-600 dark:text-blue-400
    group-hover:translate-x-1
    transition-transform duration-300
  ">
    View company details →
  </div>
</Link>


);
};

export default CompanyCard;
