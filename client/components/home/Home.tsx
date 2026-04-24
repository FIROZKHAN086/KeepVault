import React from 'react'
import Hero from './Hero'
import TrustSection from './TrustSection'
import FeaturesSection from './FeaturesSection'
import HowItWorks from './HowItWorks'
import UseCases from './UseCases'
import DashboardPreview from './DashboardPreview'
import Pricing from './Pricing'

const Home = () => {
  return (
    <div
    suppressHydrationWarning={true}>
      <Hero/>
        <TrustSection/>
        <FeaturesSection/>
        <HowItWorks/>
        <UseCases/>
        <DashboardPreview/>
        <Pricing/>
    </div>
  )
}

export default Home