import type { Metadata } from "next";
import HeroSection from "@/components/guest/HeroSection";
import HowItWorks from "@/components/guest/HowItWorks";
import JoinOurCommunity from "@/components/guest/JoinOurCommunity";
import WhatIsBlockopoly from "@/components/guest/WhatIsBlockopoly";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Blockopoly",
  description:
    "Blockopoly is a web3 board game where you buy, trade, and build on-chain properties with friends.",
  openGraph: {
    title: "Blockopoly",
    description:
      "Blockopoly is a web3 board game where you buy, trade, and build on-chain properties with friends.",
    images: [{ url: "/thumbnail.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blockopoly",
    description:
      "Blockopoly is a web3 board game where you buy, trade, and build on-chain properties with friends.",
    images: ["/thumbnail.png"],
  },
};

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
