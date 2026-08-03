import { createBrowserRouter, Route } from "react-router-dom";

// Candidate Layout
import CandidateLayout from "../layouts/CandidateLayout";

// Candidate Pages
import Dashboard from "../pages/candidate/Dashboard";
import Applications from "../pages/candidate/Applications";
import SavedJobs from "../pages/candidate/SavedJobs ";
import Notification from "../pages/candidate/Notification";
import Profile from "../pages/candidate/Profile";
import Home from "../pages/public/Home";
import PublicLayout from "../layouts/PublicLayout";
import BrowseCompanies from "../pages/public/BrowseCompanies";
import NotificationToasty from "../components/common/NotificationToasty";
import HRLayout from "../layouts/HRLayout";
import HRDashboard from "../components/hr/dashboard/HRDashboard";
import CreateJob from "../components/hr/jobs/CreateJob";
import CompanyProfile from "../components/hr/company/CompanyProfile";
import ApplicantDetails from "../components/hr/applicants/ApplicantDetails";
import Settings from "../components/hr/settings/Settings";
import Messages from "../components/hr/messages/Messages";
import ManageJobs from "../components/hr/jobs/ManageJobs";
import EditJob from "../components/hr/jobs/EditJob";
import FindJob from "../pages/public/FindJob";
import Resume from "../pages/candidate/Resume";


const router = createBrowserRouter([

    {
        path: "/", element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "find-job",
                element: <FindJob />

            },
            {
                path: "companies",
                element: <BrowseCompanies />
            },
            {
                path: "notifications",
                element: <NotificationToasty />
            }
        ]

    },
    {
        path: "/candidate",
        element: <CandidateLayout />,

        children: [
            {
                path: "*",
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "applications",
                element: <Applications />,
            },

            {
                path: "saved-jobs",
                element: <SavedJobs />,
            },

            {
                path: "notifications",
                element: <Notification />,
            },

            {
                path: "profile",
                element: <Profile />,
            },

            {
                path: "resume",
                element: <Resume />,
            },

        ],
    },
    {
        path: "hr", element: <HRLayout />,
        children: [
            {
                path: "*",
                element: <HRDashboard />
            },
            {
                path: "dashboard",
                element: <HRDashboard />

            },
            {
                path: "add-job",
                element: <CreateJob />
            },
            {
                path: "company",
                element: <CompanyProfile />
            },
            {
                path: "candidates/:candidateId/:applicationId",
                element: <ApplicantDetails />
            },
            {
                path:"manage-jobs",
                element:<ManageJobs />
            },
            {
                path:"messages",
                element:<Messages />
            },
            {
                path:"edit-job/:jobId",
                element:<EditJob />
            },
          
        ]
    }



]);


export default router;