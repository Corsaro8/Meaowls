"use client";

import { Button } from "@/components/ui/button";

interface HowItWorksChoiceProps {
  onKnowWhatIWant?: () => void;
  onWantPersonalizedAdvice?: () => void;
}

export const HowItWorksChoice = ({
  onKnowWhatIWant = () => {},
  onWantPersonalizedAdvice = () => {}
}: HowItWorksChoiceProps) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
    </section>
  );
};