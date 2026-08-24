import React from 'react'
import Seo from '../../components/common/Seo'
import HeroSection from '../../components/home/HeroSection'
import FeaturedJobs from '../../components/home/FeaturedJobs'
import PopularCategories from '../../components/home/PopularCategories'
import StatsSection from '../../components/home/StatsSection'
import HowItWorks from '../../components/home/HowItWorks'
import CTASection from '../../components/home/CTASection'

const Home = () => {
  return (
    <>
    <Seo
      title="Find your next great opportunity"
      description="Browse verified job listings across top companies. Search by skill, location, and role, and apply directly."
      path="/"
    />
    <HeroSection />
    <FeaturedJobs />
    <PopularCategories />
    <StatsSection />
    <HowItWorks />
    <CTASection />
      
    </>
  )
}

export default Home
