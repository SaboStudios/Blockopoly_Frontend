import type { Metadata } from "next";
import HeroSection from "@/components/guest/HeroSection";
import HowItWorks from "@/components/guest/HowItWorks";
import JoinOurCommunity from "@/components/guest/JoinOurCommunity";
import WhatIsBlockopoly from "@/components/guest/WhatIsBlockopoly";
import Footer from "@/components/shared/Footer";
import { getMetadata } from "@/utils/getMetadata";

export const metadata: Metadata = getMetadata({
  title: "Blockopoly",
  description:
    "Blockopoly is a decentralized, on-chain property trading game. Buy, trade, and build your empire on the blockchain.",
  image: "/thumbnail.png",
});

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
