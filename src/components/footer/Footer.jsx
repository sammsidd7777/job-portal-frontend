import { Link } from "react-router-dom";
import Logo from "../../../public/favicon.png";
import { footerLinks } from "../../Data/Data.js";

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
    url: "https://linkedin.com",
  },
  {
    name: "Twitter",
    icon: <RiTwitterXFill />,
    url: "https://twitter.com",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={Logo}
                alt="JobHunter"
                className="h-12 w-12 rounded-xl object-cover"
              />

              <span className="text-2xl font-extrabold">
                Job<span className="text-blue-500">Hunter</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Discover better opportunities, connect with great companies,
              and take the next step in your career with JobHunter.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLists.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl
                  border border-slate-800 bg-slate-900 text-slate-400
                  transition hover:-translate-y-1 hover:border-blue-500
                  hover:bg-blue-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* DATA.JS LINKS */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-sm text-slate-400 transition hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">
              Stay Updated
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Get the latest job opportunities and career updates directly
              in your inbox.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-800
                bg-slate-900 px-4 py-3 text-sm text-white outline-none
                placeholder:text-slate-500 focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3
                text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-8
        text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} JobHunter. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;