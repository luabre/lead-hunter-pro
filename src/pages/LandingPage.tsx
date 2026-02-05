 import { LandingHeader } from "@/components/landing/LandingHeader";
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
     <div className="min-h-screen w-screen overflow-x-hidden bg-[#0a0f1c]">
       <LandingHeader />
       <main className="pt-16">
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
     </div>
   );
 };
 
 export default LandingPage;