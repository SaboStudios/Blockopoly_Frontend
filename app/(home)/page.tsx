import type { Metadata } from "next";
import HeroSection from "@/components/guest/HeroSection";
import HowItWorks from "@/components/guest/HowItWorks";
import JoinOurCommunity from "@/components/guest/JoinOurCommunity";
import WhatIsBlockopoly from "@/components/guest/WhatIsBlockopoly";
import Footer from "@/components/shared/Footer";
import { getMetadata } from "@/utils/getMetadata";

export const metadata: Metadata = {
  title: "Blockopoly",
  description:
    "Blockopoly is a web3 twist on the classic property trading board game — buy, trade, and build on-chain.",
  openGraph: {
    title: "Blockopoly",
    description:
      "Blockopoly is a web3 twist on the classic property trading board game — buy, trade, and build on-chain.",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Blockopoly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blockopoly",
    description:
      "Blockopoly is a web3 twist on the classic property trading board game — buy, trade, and build on-chain.",
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
