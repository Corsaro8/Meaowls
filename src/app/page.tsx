import { LeftAlignedHero } from "@/components/blocks/heros/left-aligned-hero";
import { CareSuMisuraSection } from "@/components/blocks/feature-sections/CareSuMisuraSection";
import { CareSuMisuraAlternativeSection } from "@/components/blocks/feature-sections/CareSuMisuraAlternativeSection";
import { MeawolsAdvantages } from "@/components/blocks/feature-sections/meawols-benefits";
import { HowItWorksCleanStyle } from "@/components/blocks/feature-sections/how-it-works-clean-style";
import { TestimonialsSection } from "@/components/blocks/testimonials/meaowls-testimonials";
import { FlexibleDeliveryTimes } from "@/components/blocks/feature-sections/flexible-delivery-times";
import { FlexibleDeliveryDivider } from "@/components/blocks/feature-sections/flexible-delivery-divider";
import { HealthWellnessSection } from "@/components/blocks/feature-sections/health-and-wellness-section";
import WithComparisonTable from "@/components/blocks/pricing/with-comparison-table";
import { NoStressSection } from "@/components/blocks/feature-sections/no-stress-section";
import { SubscriptionFlexibilitySimple } from "@/components/blocks/feature-sections/subscription-flexibility-simple";
import { MaximumFlexibilitySection } from "@/components/blocks/feature-sections/maximum-flexibility-section";
import { SubscriptionSuMisuraSection } from "@/components/blocks/feature-sections/SubscriptionSuMisuraSection";
import { CTASection } from "@/components/blocks/ctas/meaowls-cta";
import { FooterWithGrid } from "@/components/blocks/footers/footer-with-grid";
import { HowItWorksStepsWithChoice } from "@/components/blocks/feature-sections/how-it-works-steps-with-choice";
import { SubscriptionExamplesAlt } from "@/components/blocks/feature-sections/subscription-examples-alt";
import { HomeClientBlocks } from "@/components/blocks/feature-sections/HomeClientBlocks";
import { HowItWorksPetProfileSection } from "@/components/blocks/feature-sections/how-it-works-pet-profile";
import { HowItWorksCarouselPetPack } from "@/components/blocks/feature-sections/how-it-works-carousel-pet-pack";
import { SupplementsSection } from "@/components/blocks/feature-sections/SupplementsSection";
import { WhatIsMeaowlsSection } from "@/components/blocks/feature-sections/what-is-meaowls-section";
import { FamiliarProblemsSection } from "@/components/blocks/feature-sections/familiar-problems-section";
import { ProblemsWeSolveSection } from "@/components/blocks/feature-sections/problems-we-solve-section";
import { TransitionSection } from "@/components/blocks/feature-sections/dogs-transition-section";
import FoodDiscoverySection from "@/components/blocks/feature-sections/interactive-food-discovery-section";
import { PetFoodOptions } from "@/components/blocks/feature-sections/pet-food-options";
import { CommitmentImpegnoBlock } from "@/components/blocks/feature-sections/commitment-impegno-block";
import { AssistenzaContinuaSection } from "@/components/blocks/feature-sections/assistenza-continua-section";
import { NoConstraintsSection } from "@/components/blocks/feature-sections/no-constraints-section";
import { PetsRunningDivider } from "@/components/blocks/feature-sections/pets-running-divider";

export default function Home() {
  return (
    <main>
      <LeftAlignedHero />
      <FamiliarProblemsSection />
      <WhatIsMeaowlsSection />
      <section id="come-funziona" className="scroll-mt-24">
        <HowItWorksCleanStyle />
      </section>
      <NoConstraintsSection />
      <CommitmentImpegnoBlock />
      <section id="cibo-perfetto" className="scroll-mt-24">
        <PetFoodOptions />
      </section>
      <FlexibleDeliveryTimes />
      <AssistenzaContinuaSection />
      <SupplementsSection />
      <HowItWorksCarouselPetPack />
      <PetsRunningDivider />
      <TestimonialsSection />
      <HealthWellnessSection />
      <NoStressSection />
      <SubscriptionFlexibilitySimple />
      <MaximumFlexibilitySection />
      <SubscriptionSuMisuraSection />
      <FlexibleDeliveryDivider />
      <WithComparisonTable />
      <CTASection />
      <FooterWithGrid />
    </main>);

}