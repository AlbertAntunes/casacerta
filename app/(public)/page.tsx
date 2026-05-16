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
import { Navbar } from '@/components/layout/Navbar'
import { PropertiesSection } from '@/components/sections/PropertiesSection'



export const revalidate = 3600

export default async function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <StatsSection />

      {/* Seção Imóveis (filtro + cards) */}
      <PropertiesSection />


      {/* Como funciona (id no spec: #como) */}
      <HowItWorksSection />

      {/* Diferenciais (id no spec: #diferenciais) */}
      <FeaturesSection />

      {/* Equipe (id no spec: #equipe) */}
      <BrokerSection />

      {/* Depoimentos (id no spec: #depoimentos) */}
      <TestimonialsSection />

      {/* FAQ (id no spec: #faq) */}
      <FAQSection />

      <CTASection />
      <Footer />

      <FloatingActions />
      <CookieBanner />

    </>
  )
}

