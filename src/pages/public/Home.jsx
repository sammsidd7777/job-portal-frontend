import React from 'react'
import HeroSection from '../../components/home/HeroSection'
import FeaturedJobs from '../../components/home/FeaturedJobs'
import PopularCategories from '../../components/home/PopularCategories'
import StatsSection from '../../components/home/StatsSection'
import HowItWorks from '../../components/home/HowItWorks'
import CTASection from '../../components/home/CTASection'

const Home = () => {
  return (
    <>
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
