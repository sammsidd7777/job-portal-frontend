import { lazy, Suspense } from "react";
import Loader from "../helper/Loader ";
import { createBrowserRouter } from "react-router-dom";

const CandidateLayout = lazy(() => import("../layouts/CandidateLayout"));
const PublicLayout = lazy(() => import("../layouts/PublicLayout"));
const HRLayout = lazy(() => import("../layouts/HRLayout"));

const Home = lazy(() => import("../pages/public/Home"));
const BrowseCompanies = lazy(() => import("../pages/public/BrowseCompanies"));
const FindJob = lazy(() => import("../pages/public/FindJob"));

const Dashboard = lazy(() => import("../pages/candidate/Dashboard"));
const Applications = lazy(() => import("../pages/candidate/Applications"));
const Notification = lazy(() => import("../pages/candidate/Notification"));
const Profile = lazy(() => import("../pages/candidate/Profile"));
const Resume = lazy(() => import("../pages/candidate/Resume"));
const Savejob = lazy(() => import("../pages/candidate/SavedJobs"))

const HRDashboard = lazy(() => import("../components/hr/dashboard/HRDashboard"));
const CreateJob = lazy(() => import("../components/hr/jobs/CreateJob"));
const CompanyProfile = lazy(() => import("../components/hr/company/CompanyProfile"));
const ApplicantDetails = lazy(() => import("../components/hr/applicants/ApplicantDetails"));
const Settings = lazy(() => import("../components/hr/settings/Settings"));
const Messages = lazy(() => import("../components/hr/messages/Messages"));
const ManageJobs = lazy(() => import("../components/hr/jobs/ManageJobs"));
const EditJob = lazy(() => import("../components/hr/jobs/EditJob"));
const UnderConstruction = lazy(() => import("../components/common/UnderConstruction"))


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
        path: "companies",
        element: Loadable(BrowseCompanies),
      },
    ],
  },

  {
    path: "/hr",
    element: Loadable(HRLayout),

    children: [
      {
        index: true,
        element: Loadable(HRDashboard)
      },
      {
        path: "/",
        element: Loadable(CreateJob)
      },
        {
        path: "/",
        element: Loadable(HRDashboard)
      },  {
        path: "/",
        element: Loadable(HRDashboard)
      },  {
        path: "/",
        element: Loadable(HRDashboard)
      },  {
        path: "/",
        element: Loadable(HRDashboard)
      },
    ]

  },

  {
    path: "/candidate",
    element: Loadable(CandidateLayout),
    children: [
      {
        index: true,
        element: Loadable(Dashboard),
      },
      {
        path: "dashboard",
        element: Loadable(Dashboard),
      },
      {
        path: "applications",
        element: Loadable(Applications),
      },
      {
        path: "saved-jobs",
        element: Loadable(Savejob)
      },
      {
        path: "profile",
        element: Loadable(Profile)
      },
      {
        path: "*",
        element: Loadable(UnderConstruction)
      }
    ],
  },
]);

export default router;