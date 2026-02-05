 import { HeroSection } from "@/components/landing/HeroSection";
 import { PainPointsSection } from "@/components/landing/PainPointsSection";
 import { BenefitsSection } from "@/components/landing/BenefitsSection";
 import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
 import { FeaturesSection } from "@/components/landing/FeaturesSection";
 import { PricingSection } from "@/components/landing/PricingSection";
 import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
 import { FAQSection } from "@/components/landing/FAQSection";
 import { CTASection } from "@/components/landing/CTASection";
 import { LandingFooter } from "@/components/landing/LandingFooter";
 
 const LandingPage = () => {
   return (
     <main className="min-h-screen">
       <HeroSection />
       <PainPointsSection />
       <BenefitsSection />
       <HowItWorksSection />
       <FeaturesSection />
       <PricingSection />
       <TestimonialsSection />
       <FAQSection />
       <CTASection />
       <LandingFooter />
     </main>
   );
 };
 
 export default LandingPage;