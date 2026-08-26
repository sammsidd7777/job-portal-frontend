import { Link } from "react-router-dom";
import Logo from "../../../public/favicon.png";

import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

const socialLists = [
  {
    name: "Facebook",
    icon: <RiFacebookFill />,
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: <RiInstagramLine />,
    url: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: <RiLinkedinFill />,
    url: "https://www.linkedin.com/in/sammcoder/",
  },
  {
    name: "Twitter",
    icon: <RiTwitterXFill />,
    url: "https://twitter.com",
  },
];

const ComingSoon = ({ children }) => {
  return (
    <span className="flex cursor-default items-center gap-2 text-sm text-slate-500">
      <span>{children}</span>

      <span
        className="
          rounded-full
          border border-blue-500/20
          bg-blue-500/10
          px-2 py-0.5
          text-[9px]
          font-semibold
          uppercase
          tracking-wide
          text-blue-400
        "
      >
        Soon
      </span>
    </span>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              aria-label="JobHunter Home"
              className="inline-flex items-center gap-3"
            >
              <img
                src={Logo}
                alt="JobHunter"
                className="h-12 w-12 rounded-xl object-cover"
              />

              <span className="text-2xl font-extrabold tracking-tight">
                Job<span className="text-blue-500">Hunter</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Discover better opportunities, connect with great companies,
              and take the next step in your career with JobHunter.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-3">
              {socialLists.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit JobHunter on ${social.name}`}
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    border border-slate-800
                    bg-slate-900
                    text-slate-400
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-blue-500
                    hover:bg-blue-600
                    hover:text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                    focus:ring-offset-slate-950
                  "
                >
                  <span className="text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              JOB SEEKERS
          ================================================== */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">
              For Job Seekers
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/find-job"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <ComingSoon>
                  Saved Jobs
                </ComingSoon>
              </li>

              <li>
                <ComingSoon>
                  Candidate Profile
                </ComingSoon>
              </li>

              <li>
                <ComingSoon>
                  Applied Jobs
                </ComingSoon>
              </li>

            </ul>
          </div>

          {/* =================================================
              EMPLOYERS
          ================================================== */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">
              For Employers
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/companies"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Browse Companies
                </Link>
              </li>

              <li>
                <ComingSoon>
                  Post a Job
                </ComingSoon>
              </li>

              <li>
                <ComingSoon>
                  HR Account
                </ComingSoon>
              </li>

              <li>
                <ComingSoon>
                  Employer Dashboard
                </ComingSoon>
              </li>

            </ul>
          </div>

          {/* =================================================
              STAY UPDATED
          ================================================== */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">
              Stay Updated
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Get the latest job opportunities and career updates
              directly in your inbox.
            </p>

            <form className="space-y-3">

              <label
                htmlFor="footer-email"
                className="sr-only"
              >
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="
                  w-full rounded-xl
                  border border-slate-800
                  bg-slate-900
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

              <button
                type="submit"
                className="
                  w-full rounded-xl
                  bg-blue-600
                  px-4 py-3
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  active:translate-y-0
                "
              >
                Subscribe
              </button>

            </form>
          </div>
        </div>

        {/* =====================================================
            TRUST / LEGAL LINKS
        ====================================================== */}
        <div className="mt-14 border-t border-slate-800 pt-8">

          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm">

            <Link
              to="/about"
              className="text-slate-500 transition hover:text-white"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-slate-500 transition hover:text-white"
            >
              Contact Us
            </Link>

            <Link
              to="/privacy"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              to="/disclaimer"
              className="text-slate-500 transition hover:text-white"
            >
              Disclaimer
            </Link>

            <Link
              to="/cookies"
              className="text-slate-500 transition hover:text-white"
            >
              Cookie Policy
            </Link>

          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}
        <div
          className="
            mt-7
            flex flex-col items-center justify-between
            gap-4
            text-sm text-slate-500
            md:flex-row
          "
        >
          <p>
            © {new Date().getFullYear()} JobHunter.
            All rights reserved.
          </p>

          <p>
            Made with{" "}
            <span className="font-medium text-red-500">
              ♥
            </span>{" "}
            by{" "}
            <span className="font-semibold text-slate-300">
              Sam
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;