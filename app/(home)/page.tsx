import HeroSection from "@/components/guest/HeroSection";
import HowItWorks from "@/components/guest/HowItWorks";
import JoinOurCommunity from "@/components/guest/JoinOurCommunity";
import WhatIsBlockopoly from "@/components/guest/WhatIsBlockopoly";
import Footer from "@/components/shared/Footer";


export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <WhatIsBlockopoly />
      <HowItWorks />
      <JoinOurCommunity />
      <Footer />
    </main>
  );
}
