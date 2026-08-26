import { lazy, Suspense } from "react";
import Loader from "../helper/Loader ";
import { createBrowserRouter } from "react-router-dom";
import JobDetailPage from "../components/jobs/JobDetailPage";
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import TermsOfService from "../pages/Legal/TermsOfService";
import About from "../pages/Legal/About";
import Contact from "../pages/Legal/Contact";
import Disclaimer from "../pages/Legal/Disclaimer";
import CookiePolicy from "../pages/Legal/CookiePolicy";

const PublicLayout = lazy(() => import("../layouts/PublicLayout"));

const Home = lazy(() => import("../pages/public/Home"));
const BrowseCompanies = lazy(() => import("../pages/public/BrowseCompanies"));
const FindJob = lazy(() => import("../pages/public/FindJob"));
const CompanyDetails = lazy(() => import("../pages/public/CompanyDetails"));
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
        path: "about",
        element: Loadable(About),
      },
      {
        path: "contact",
        element: Loadable(Contact),
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
        path: "disclaimer",
        element: Loadable(Disclaimer),
      },
      {
  path: "cookies",
  element: Loadable(CookiePolicy),
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