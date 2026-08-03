
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  Briefcase,
  FileText,
  ArrowLeft,
} from "lucide-react";

import {
  useUpdateJobApplyStatusMutation,
  useViewCandidateDetailQuery,
} from "../../../RTK/HrService";

const ApplicantDetails = () => {

 const { candidateId, applicationId } = useParams();

console.log("Candidate ID:", candidateId);
console.log("application ID:", applicationId);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useViewCandidateDetailQuery(candidateId);


  const [
    updateJobApplyStatus,
    { isLoading: isUpdating },
  ] = useUpdateJobApplyStatusMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm text-slate-500">
            Loading candidate profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-slate-900">
          <XCircle className="mx-auto mb-3 text-red-500" size={42} />
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Failed to load candidate
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const candidate = data?.candidate;

  const handleStatusChange = async (status) => {
    
    console.log(applicationId,status,"status ")
    if (!applicationId) return;

    try {
      await updateJobApplyStatus({
        id: applicationId,
        status,
      }).unwrap();

      await refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const profileImage = candidate?.profilePic
    ? `http://localhost:5000${candidate?.profilePic}`
    : "/default-avatar.png";

  const resumeUrl = candidate?.resume
    ? `http://localhost:5000/${candidate.resume}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">

      {/* TOP NAVIGATION */}

      <div className="mx-auto mb-6 max-w-7xl">

        <button
          onClick={() => window.history.back()}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
          Back to applicants
        </button>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm text-slate-400">
              Applicants / Candidate Details
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {candidate?.name || "Candidate Profile"}
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Application Profile
          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">


        {/* LEFT PROFILE */}

        <aside className="space-y-6 lg:col-span-4">

          {/* PROFILE CARD */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            {/* PROFILE HEADER */}

            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="-mt-14 px-6 pb-6">

              <img
                src={profileImage}
                alt={candidate?.name}
                className="h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-lg dark:border-slate-900"
              />

              <div className="mt-4">

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {candidate?.name || "Unknown Candidate"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {candidate?.role || "Job Candidate"}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={15} />
                  {candidate?.location || "India"}
                </div>

              </div>


              {/* ACTIONS */}

              <div className="mt-6 space-y-3">

                <button
                  disabled={isUpdating}
                  onClick={() => handleStatusChange("interview")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Calendar size={17} />
                  {isUpdating ? "Updating..." : "Schedule Interview"}
                </button>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    disabled={isUpdating}
                    onClick={() => handleStatusChange("shortlist")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-900 dark:bg-emerald-900/20"
                  >
                    <CheckCircle size={16} />
                    Shortlist
                  </button>

                  <button
                    disabled={isUpdating}
                    onClick={() => handleStatusChange("reject")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900 dark:bg-red-900/20"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>

                </div>

              </div>


              {/* CONTACT INFORMATION */}

              <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">

                <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4 text-sm">

                  <div className="flex items-start gap-3">

                    <div className="rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-slate-800">
                      <Mail size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <p className="break-all text-slate-700 dark:text-slate-300">
                        {candidate?.email || "No email"}
                      </p>
                    </div>

                  </div>


                  <div className="flex items-start gap-3">

                    <div className="rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-slate-800">
                      <Phone size={16} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Phone
                      </p>

                      <p className="text-slate-700 dark:text-slate-300">
                        {candidate?.phone || "Not available"}
                      </p>
                    </div>

                  </div>


                  {candidate?.linkedin && (

                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-blue-600 transition hover:text-blue-700"
                    >

                      <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
                        <ExternalLink size={16} />
                      </div>

                      <span className="text-sm font-medium">
                        View LinkedIn Profile
                      </span>

                    </a>

                  )}

                </div>

              </div>

            </div>

          </div>


          {/* SKILLS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-4 flex items-center gap-2">

              <Briefcase size={18} className="text-blue-600" />

              <h3 className="font-semibold text-slate-900 dark:text-white">
                Skills & Expertise
              </h3>

            </div>

            <div className="flex flex-wrap gap-2">

              {candidate?.skills?.length > 0 ? (

                candidate.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <p className="text-sm text-slate-400">
                  No skills added
                </p>

              )}

            </div>

          </div>

        </aside>


        {/* RIGHT CONTENT */}

        <main className="space-y-6 lg:col-span-8">


          {/* RESUME CARD */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20">
                  <FileText size={24} />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Resume / CV
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Candidate's latest resume
                  </p>

                </div>

              </div>


              {resumeUrl && (

                <div className="flex gap-2">

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Eye size={16} />
                    Preview
                  </a>

                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <Download size={16} />
                    Download
                  </a>

                </div>

              )}

            </div>


            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">

              {resumeUrl ? (

                <div className="flex items-center gap-4">

                  <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-slate-900">
                    <FileText className="text-red-500" size={28} />
                  </div>

                  <div>

                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      Resume uploaded successfully
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Click preview to view the candidate's resume.
                    </p>

                  </div>

                </div>

              ) : (

                <p className="text-sm text-slate-400">
                  No resume uploaded by this candidate.
                </p>

              )}

            </div>

          </section>


          {/* ABOUT */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-5 flex items-center gap-3">

              <div className="h-8 w-1 rounded-full bg-blue-600" />

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                About Candidate
              </h3>

            </div>

            <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
              {candidate?.bio || "No bio provided by this candidate."}
            </p>

          </section>


          {/* QUICK SUMMARY */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                {candidate?.location || "India"}
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Skills
              </p>

              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                {candidate?.skills?.length || 0} Skills
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Resume
              </p>

              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                {resumeUrl ? "Available" : "Not Uploaded"}
              </p>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default ApplicantDetails;

