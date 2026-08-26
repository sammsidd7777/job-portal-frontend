import React from "react";

import Seo from "../../components/common/Seo";

import HeroSection from "../../components/home/HeroSection";
import FeaturedJobs from "../../components/home/FeaturedJobs";
import PopularCategories from "../../components/home/PopularCategories";
import StatsSection from "../../components/home/StatsSection";
import HowItWorks from "../../components/home/HowItWorks";
import CTASection from "../../components/home/CTASection";

import AdSlot from "../../components/common/AdSlot";

const Home = () => {
  return (
    <>
      {/* ================= SEO ================= */}

      <Seo
        title="Find your next great opportunity"
        description="Browse verified job listings across top companies. Search by skill, location, and role, and apply directly."
        path="/"
      />

      {/* ================= HERO ================= */}

      <HeroSection />

      {/* =====================================================
          AD 1
          Google AdSense → Google Ad
          No Google AdSense → WhatsApp Promotion
      ===================================================== */}
<section className="bg-[#030712]">
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <AdSlot
            slot="YOUR_AD_SLOT_ID"
            className="w-full"
            label="Advertisement"
            fallbackTitle="Get latest job updates"
            fallbackDescription="Join the Job Hunter WhatsApp community and get fresh job opportunities directly."
            fallbackButton="Join WhatsApp"
            fallbackUrl="YOUR_WHATSAPP_GROUP_LINK"
        />
    </div>
</section>
      {/* ================= FEATURED JOBS ================= */}

      <FeaturedJobs />

      {/* =====================================================
          AD 2
          Google AdSense → Google Ad
          No Google AdSense → LinkedIn Promotion
      ===================================================== */}

    {/* ================= AD 2 ================= */}

<section className="bg-[#030712]">
  <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <AdSlot
      slot="YOUR_AD_SLOT_ID_2"
      className="w-full"
      label="Advertisement"
      fallbackTitle="Follow Job Hunter on LinkedIn 💼"
      fallbackDescription="Follow us for job alerts, hiring updates and useful career opportunities."
      fallbackButton="Follow on LinkedIn"
      fallbackUrl="YOUR_LINKEDIN_PAGE_LINK"
    />
  </div>
</section>

      {/* ================= CATEGORIES ================= */}

      <PopularCategories />

      {/* ================= STATS ================= */}

      <StatsSection />

      {/* ================= HOW IT WORKS ================= */}

      {/* <HowItWorks /> */}
      <HowItWorks />

      {/* ================= CTA ================= */}

      <CTASection />
    </>
  );
};

export default Home;