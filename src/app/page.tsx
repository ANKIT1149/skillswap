"use client"
import Comparison from '@/components/Comparison';
import CTABanner from '@/components/CTA';
import Features from '@/components/Feature';
import Footer from '@/components/Footer';
import Hero from '@/components/HomeBanner';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import Newsletter from '@/components/Newsletter';
import Pricing from '@/components/Subscription';
import Testimonials from '@/components/Testinomials';
import WhyChoose from '@/components/WhyChooseUs';


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <Comparison />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <Footer />
    </>
  );
}
