import NavBar from '@/components/sections/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import WorkSection from '@/components/sections/WorkSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PricingSection from '@/components/sections/PricingSection'
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
      <PricingSection />
      <ContactSection />
      <FooterSection />
      <CalendlyModal />
    </main>
  )
}
