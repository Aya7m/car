import React from 'react'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Banner from '../components/Banner'
import Testmonial from '../components/Testmonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Hero/>
        <FeatureSection/>
        <Banner/>
        <Testmonial/>
        <NewsLetter/>
        <Footer/>
    </div>
  )
}

export default Home