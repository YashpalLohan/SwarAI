import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Innovation from './Innovation';
import Features from './Features';
import Stats from './Stats';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Innovation />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
