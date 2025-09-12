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
// import { GetUserService } from '@/services/GetUserService';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function Home() {
  // const router = useRouter();
  // useEffect(() => {
  //   const checkUserExsist = async () => {
  //     const userId = await GetUserService()
  //     if (userId) {
  //       router.push("/dashboard/teachermatched")
  //     }
  //   }

  //   checkUserExsist()
  // }, [])
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
