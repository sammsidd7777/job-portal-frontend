import { lazy, Suspense } from "react";
import Loader from "../helper/Loader ";
import { createBrowserRouter } from "react-router-dom";
import JobDetailPage from "../components/jobs/JobDetailPage";

const PublicLayout = lazy(() => import("../layouts/PublicLayout"));

const Home = lazy(() => import("../pages/public/Home"));
const BrowseCompanies = lazy(() => import("../pages/public/BrowseCompanies"));
const FindJob = lazy(() => import("../pages/public/FindJob"));
const CompanyDetails = lazy(() => import("../pages/public/CompanyDetails"));
const PrivacyPolicy = lazy(() => import("../pages/public/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/public/TermsOfService"));
const NotFound = lazy(() => import("../components/common/NotFound"));




// Helper Function
const Loadable = (Component) => (
  <Suspense fallback={<Loader message="Loading website..." />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: Loadable(PublicLayout),
    children: [
      {
        index: true,
        element: Loadable(Home),
      },
      {
        path: "find-job",
        element: Loadable(FindJob),
      },
      {
        path: "jobs/:id",
        element: Loadable(JobDetailPage),
      },
      {
        path: "companies",
        element: Loadable(BrowseCompanies),
      },
      {
        path: "company/:id",
        element: Loadable(CompanyDetails),
      },
      {
        path: "privacy",
        element: Loadable(PrivacyPolicy),
      },
      {
        path: "terms",
        element: Loadable(TermsOfService),
      },
      {
        path: "*",
        element: Loadable(NotFound),
      },
    ],
  },

{
  // path: "/hr",
  // element: Loadable(HRLayout),

  // children: [
  //   {
  //     index: true,
  //     element: Loadable(HRDashboard),
  //   },
  //   {
  //     path: "dashboard",
  //     element: Loadable(HRDashboard),
  //   },
  //   {
  //     path: "add-job",
  //     element: Loadable(CreateJob),
  //   },
  //   {
  //     path: "manage-jobs",
  //     element: Loadable(ManageJobs),
  //   },
  //   {
  //     path: "applicants",
  //     element: Loadable(ApplicantDetails),
  //   },
  //   {
  //     path: "company",
  //     element: Loadable(CompanyProfile),
  //   },
  //   {
  //     path: "settings",
  //     element: Loadable(Settings),
  //   },
  //   {
  //     path: "messages",
  //     element: Loadable(Messages),
  //   },

  //   // Candidate/Application Detail
  //   {
  //     path: "candidates/:candidateId/:applicationId",
  //     element: Loadable(ApplicantDetails),
  //   },
  // ],
},

  // {
  //   path: "/candidate",
  //   element: Loadable(CandidateLayout),
  //   children: [
  //     {
  //       index: true,
  //       element: Loadable(Dashboard),
  //     },
  //     {
  //       path: "dashboard",
  //       element: Loadable(Dashboard),
  //     },
  //     {
  //       path: "applications",
  //       element: Loadable(Applications),
  //     },
  //     {
  //       path: "saved-jobs",
  //       element: Loadable(Savejob)
  //     },
  //     {
  //       path: "profile",
  //       element: Loadable(Profile)
  //     },
  //     {
  //       path: "*",
  //       element: Loadable(UnderConstruction)
  //     }
  //   ],
  // },
]);

export default router;