import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/layout/Footer'
import { BrokerSection } from '@/components/layout/BrokerSection'
import { FloatingActions } from '@/components/ui/FloatingActions'
import { CookieBanner } from '@/components/ui/CookieBanner'

export const revalidate = 3600

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <section id="imoveis" className="py-24" />
      <HowItWorksSection />
      <FeaturesSection />
      <BrokerSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />

      <FloatingActions />
      <CookieBanner />
    </>
  )
}

