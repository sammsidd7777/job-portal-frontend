
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  FileText,
  ExternalLink,
  UserRound,
  CalendarDays,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

import {
  useGetApplicationsForJobQuery,
  useUpdateJobApplyStatusMutation,
} from "../../../RTK/HrService";

const statusStyle = {
  applied:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  shortlisted:
    "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",

  interview:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

  rejected:
    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",

  hired:
    "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

const ApplicantsModal = ({ jobId, onClose }) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetApplicationsForJobQuery(jobId);

  const [
    updateJobApplyStatus,
    { isLoading: isUpdating },
  ] = useUpdateJobApplyStatusMutation();

  const [loadingId, setLoadingId] = useState(null);

  const applicants = data?.application || [];

  console.log(applicants,"appliatio")

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setLoadingId(applicationId);

      await updateJobApplyStatus({
        applicationId,
        status,
      }).unwrap();
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );
    } finally {
      setLoadingId(null);
    }
  };

  const getAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=random`;
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-3
        backdrop-blur-sm
        sm:p-6
      "
      onClick={onClose}
    >

      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex
          max-h-[94vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-2xl
          dark:border-gray-800
          dark:bg-gray-900
        "
      >

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          border-b
          border-gray-200
          px-4
          py-4
          dark:border-gray-800
          sm:px-6
          sm:py-5
        ">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="
                hidden
                rounded-xl
                bg-purple-100
                p-2.5
                text-purple-600
                dark:bg-purple-500/10
                dark:text-purple-400
                sm:block
              ">
                <UserRound size={21} />
              </div>

              <div>

                <h2 className="
                  truncate
                  text-lg
                  font-bold
                  text-gray-900
                  dark:text-white
                  sm:text-2xl
                ">
                  Applicant Management
                </h2>

                <p className="
                  mt-1
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                  sm:text-sm
                ">
                  Review and manage candidate applications
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              ml-3
              shrink-0
              rounded-xl
              p-2
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            <X size={21} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto">

          {/* LOADING */}
          {isLoading && (
            <div className="space-y-4 p-5 sm:p-8">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-20
                    animate-pulse
                    rounded-xl
                    bg-gray-100
                    dark:bg-gray-800
                  "
                />
              ))}

            </div>
          )}

          {/* ERROR */}
          {isError && (
            <div className="p-10 text-center">

              <p className="font-medium text-red-500">
                Failed to load applicants
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Please try again later.
              </p>

            </div>
          )}

          {/* EMPTY */}
          {!isLoading &&
            !isError &&
            applicants.length === 0 && (
              <div className="p-12 text-center">

                <UserRound
                  size={42}
                  className="mx-auto text-gray-400"
                />

                <h3 className="
                  mt-4
                  font-semibold
                  text-gray-900
                  dark:text-white
                ">
                  No applicants yet
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Applications for this job will appear here.
                </p>

              </div>
            )}

          {/* DESKTOP TABLE */}
          {!isLoading &&
            !isError &&
            applicants.length > 0 && (
              <div className="hidden overflow-x-auto lg:block">

                <table className="w-full text-sm">

                  <thead className="
                    sticky
                    top-0
                    z-10
                    bg-gray-50
                    text-xs
                    uppercase
                    text-gray-500
                    dark:bg-gray-800
                    dark:text-gray-400
                  ">

                    <tr>

                      <th className="px-6 py-4 text-left">
                        Candidate
                      </th>

                      <th className="px-6 py-4 text-left">
                        Applied Role
                      </th>

                      <th className="px-6 py-4 text-left">
                        Experience
                      </th>

                      <th className="px-6 py-4 text-left">
                        Applied Date
                      </th>

                      <th className="px-6 py-4 text-left">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center">
                        Resume
                      </th>

                      <th className="px-6 py-4 text-center">
                        Profile
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {applicants.map((app) => {

                      const applicant = app?.applicant;

                      return (
                        <tr
                          key={app._id}
                          className="
                            border-t
                            border-gray-100
                            transition
                            hover:bg-gray-50
                            dark:border-gray-800
                            dark:hover:bg-gray-800/50
                          "
                        >

                          {/* CANDIDATE */}
                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <img
                                src={getAvatar(
                                  applicant?.name
                                )}
                                alt={
                                  applicant?.name ||
                                  "Candidate"
                                }
                                className="h-10 w-10 rounded-full"
                              />

                              <div>

                                <p className="
                                  font-semibold
                                  text-gray-900
                                  dark:text-white
                                ">
                                  {applicant?.name ||
                                    "Unknown Candidate"}
                                </p>

                                <p className="
                                  mt-0.5
                                  text-xs
                                  text-gray-500
                                ">
                                  {applicant?.email ||
                                    "No email"}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* ROLE */}
                          <td className="
                            px-6
                            py-4
                            text-gray-700
                            dark:text-gray-300
                          ">
                            {app?.job?.title || "—"}
                          </td>

                          {/* EXPERIENCE */}
                          <td className="
                            px-6
                            py-4
                            text-gray-600
                            dark:text-gray-400
                          ">
                            {app?.experience || "—"}
                          </td>

                          {/* DATE */}
                          <td className="
                            px-6
                            py-4
                            text-gray-600
                            dark:text-gray-400
                          ">
                            <div className="flex items-center gap-2">
                              <CalendarDays size={15} />

                              {app?.createdAt
                                ? new Date(
                                    app.createdAt
                                  ).toLocaleDateString()
                                : "—"}
                            </div>
                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-4">

                            <select
                              value={app.status}
                              disabled={
                                loadingId === app._id ||
                                isUpdating
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  app._id,
                                  e.target.value
                                )
                              }
                              className={`
                                cursor-pointer
                                rounded-full
                                border-0
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                outline-none
                                ${statusStyle[app.status] ||
                                "bg-gray-100 text-gray-700"}
                              `}
                            >

                              <option value="applied">
                                Applied
                              </option>

                              <option value="shortlisted">
                                Shortlisted
                              </option>

                              <option value="interview">
                                Interview
                              </option>

                              <option value="rejected">
                                Rejected
                              </option>

                              <option value="hired">
                                Hired
                              </option>

                            </select>

                          </td>

                          {/* RESUME */}
                          <td className="px-6 py-4 text-center">

                            {app?.resumeUrl ? (
                              <a
                                href={`http://localhost:5000/${app.resumeUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  inline-flex
                                  items-center
                                  gap-1
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-800
                                  dark:text-blue-400
                                "
                              >
                                <FileText size={16} />
                                View
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                —
                              </span>
                            )}

                          </td>

                          {/* PROFILE */}
                          <td className="px-6 py-4 text-center">

                            <Link
                             to={`/hr/candidates/${applicant?._id}/${app?._id}`}
                              className="
                                inline-flex
                                items-center
                                gap-1
                                font-medium
                                text-purple-600
                                hover:text-purple-800
                                dark:text-purple-400
                              "
                            >
                              View
                              <ExternalLink size={15} />
                            </Link>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}

          {/* MOBILE + TABLET CARDS */}
          {!isLoading &&
            !isError &&
            applicants.length > 0 && (
              <div className="space-y-3 p-4 lg:hidden">

                {applicants.map((app) => {

                  const applicant = app?.applicant;

                  return (
                    <div
                      key={app._id}
                      className="
                        rounded-2xl
                        border
                        border-gray-200
                        p-4
                        dark:border-gray-800
                      "
                    >

                      {/* TOP */}
                      <div className="flex items-start gap-3">

                        <img
                          src={getAvatar(
                            applicant?.name
                          )}
                          alt={applicant?.name}
                          className="h-11 w-11 rounded-full"
                        />

                        <div className="min-w-0 flex-1">

                          <h3 className="
                            truncate
                            font-semibold
                            text-gray-900
                            dark:text-white
                          ">
                            {applicant?.name ||
                              "Unknown Candidate"}
                          </h3>

                          <p className="
                            mt-1
                            flex
                            items-center
                            gap-1
                            truncate
                            text-xs
                            text-gray-500
                          ">
                            <Mail size={13} />
                            {applicant?.email ||
                              "No email"}
                          </p>

                        </div>

                      </div>

                      {/* DETAILS */}
                      <div className="
                        mt-4
                        grid
                        grid-cols-2
                        gap-3
                        border-y
                        border-gray-100
                        py-3
                        dark:border-gray-800
                      ">

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Applied Role
                          </p>

                          <p className="
                            mt-1
                            truncate
                            text-sm
                            font-medium
                            text-gray-800
                            dark:text-gray-200
                          ">
                            {app?.job?.title || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Experience
                          </p>

                          <p className="
                            mt-1
                            text-sm
                            font-medium
                            text-gray-800
                            dark:text-gray-200
                          ">
                            {app?.experience || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Applied Date
                          </p>

                          <p className="
                            mt-1
                            text-sm
                            font-medium
                            text-gray-800
                            dark:text-gray-200
                          ">
                            {app?.createdAt
                              ? new Date(
                                  app.createdAt
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Status
                          </p>

                          <select
                            value={app.status}
                            disabled={
                              loadingId === app._id ||
                              isUpdating
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                app._id,
                                e.target.value
                              )
                            }
                            className={`
                              mt-1
                              max-w-full
                              rounded-full
                              border-0
                              px-2
                              py-1
                              text-xs
                              font-semibold
                              outline-none
                              ${statusStyle[app.status] ||
                              "bg-gray-100 text-gray-700"}
                            `}
                          >

                            <option value="applied">
                              Applied
                            </option>

                            <option value="shortlisted">
                              Shortlisted
                            </option>

                            <option value="interview">
                              Interview
                            </option>

                            <option value="rejected">
                              Rejected
                            </option>

                            <option value="hired">
                              Hired
                            </option>

                          </select>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="mt-3 flex gap-2">

                        {app?.resumeUrl && (
                          <a
                            href={`http://localhost:5000/${app.resumeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              flex-1
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-blue-50
                              px-3
                              py-2.5
                              text-sm
                              font-medium
                              text-blue-600
                              dark:bg-blue-500/10
                              dark:text-blue-400
                            "
                          >
                            <FileText size={16} />
                            Resume
                          </a>
                        )}

                        <Link
                          to={`/hr/candidates/${applicant?._id}/${app._id}`}
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-purple-50
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            text-purple-600
                            dark:bg-purple-500/10
                            dark:text-purple-400
                          "
                        >
                          <UserRound size={16} />
                          Profile
                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

        </div>

      </div>

    </div>
  );
};

export default ApplicantsModal;

