import Seo from "../../components/common/Seo";

/**
 * PrivacyPolicy
 *
 * Baseline privacy policy. Google AdSense will not approve a site
 * without a real, accessible privacy policy that discloses cookie
 * use and third-party ad personalization — this covers those
 * required disclosures, but you (or a lawyer) should review and
 * fill in the bracketed placeholders before going live: they're
 * business-specific facts (legal entity name, contact email, what
 * data you actually collect) that only you can state accurately.
 */
const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-16 text-slate-900 dark:bg-[#080b14] dark:text-white sm:px-6">
      <Seo
        title="Privacy Policy"
        description="How JobHunt collects, uses, and protects your information, including cookies and third-party advertising."
        path="/privacy"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-medium tracking-[-0.01em] text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: [DATE — update whenever this page changes]
        </p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              1. Who we are
            </h2>
            <p className="mt-2">
              [Company/legal entity name] ("we", "us") operates JobHunt (the "Site"),
              a job listing platform connecting job seekers with employers. This
              policy explains what information we collect, how we use it, and the
              choices you have.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              2. Information we collect
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Account information you provide (name, email, resume, profile details) when you register.</li>
              <li>Job application data you submit when applying to a listing.</li>
              <li>Usage data (pages visited, searches performed, device/browser type) collected automatically.</li>
              <li>Cookies and similar technologies (see Section 4).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              3. How we use information
            </h2>
            <p className="mt-2">
              We use the information above to operate the Site, match candidates
              with relevant listings, communicate with you about your account or
              applications, improve our services, and — where applicable — to
              serve and measure advertising.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              4. Cookies and advertising
            </h2>
            <p className="mt-2">
              This Site uses cookies to keep you signed in and remember your
              preferences. We may also display advertisements served by
              third-party vendors, including Google. Google's use of advertising
              cookies enables it and its partners to serve ads based on your
              visits to this and other sites.
            </p>
            <p className="mt-2">
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 underline underline-offset-2 dark:text-white"
              >
                Google's Ads Settings
              </a>
              , or generally at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-900 underline underline-offset-2 dark:text-white"
              >
                www.aboutads.info/choices
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              5. Sharing of information
            </h2>
            <p className="mt-2">
              We share application data with the employer/HR account for the job
              you apply to. We do not sell your personal information. We may
              share aggregated, non-identifying data with advertising and
              analytics partners.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              6. Your choices
            </h2>
            <p className="mt-2">
              You can access, update, or delete your account information from
              your profile settings, or by contacting us at [support email]. You
              can control cookies through your browser settings, though disabling
              them may affect Site functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              7. Contact us
            </h2>
            <p className="mt-2">
              Questions about this policy can be sent to [support email].
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
