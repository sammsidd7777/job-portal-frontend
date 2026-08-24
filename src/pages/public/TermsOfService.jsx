import Seo from "../../components/common/Seo";

/**
 * TermsOfService
 *
 * Baseline terms of service. Same note as PrivacyPolicy.jsx — review
 * and fill in the bracketed placeholders (legal entity name,
 * governing jurisdiction, contact email) before going live.
 */
const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-16 text-slate-900 dark:bg-[#080b14] dark:text-white sm:px-6">
      <Seo
        title="Terms of Service"
        description="The terms and conditions governing your use of JobHunt."
        path="/terms"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-medium tracking-[-0.01em] text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Last updated: [DATE — update whenever this page changes]
        </p>

        <div className="mt-8 space-y-8 text-[14px] leading-7 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              1. Acceptance of terms
            </h2>
            <p className="mt-2">
              By accessing or using JobHunt (the "Site"), you agree to be bound
              by these Terms of Service. If you do not agree, please do not use
              the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              2. Accounts
            </h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity under your account. You
              must provide accurate information when registering as a candidate
              or as an HR/employer user.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              3. Job listings
            </h2>
            <p className="mt-2">
              Employers are solely responsible for the accuracy and legality of
              the job listings they post. We do not guarantee the accuracy of
              any listing (internal or externally sourced) and are not a party
              to any employment relationship formed through the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              4. Acceptable use
            </h2>
            <p className="mt-2">
              You agree not to misuse the Site, including posting false or
              misleading listings, scraping content without permission, or
              attempting to circumvent account restrictions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              5. Advertising
            </h2>
            <p className="mt-2">
              The Site may display third-party advertisements. We are not
              responsible for the content of advertisements or for the products
              and services advertised.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              6. Limitation of liability
            </h2>
            <p className="mt-2">
              The Site is provided "as is" without warranties of any kind. To
              the fullest extent permitted by law, [Company/legal entity name]
              is not liable for any indirect, incidental, or consequential
              damages arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              7. Governing law
            </h2>
            <p className="mt-2">
              These terms are governed by the laws of [jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-medium text-slate-900 dark:text-white">
              8. Contact us
            </h2>
            <p className="mt-2">
              Questions about these terms can be sent to [support email].
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
