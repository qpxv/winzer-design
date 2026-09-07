import NavBar from '@/components/sections/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import WorkSection from '@/components/sections/WorkSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import PricingSection from '@/components/sections/PricingSection'
import FaqSection from '@/components/sections/FaqSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import CalendlyModal from '@/components/ui/CalendlyModal'

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <CaseStudySection />
      <ComparisonSection />
      <PricingSection />
      <FaqSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
      <CalendlyModal />
    </main>
  )
}
