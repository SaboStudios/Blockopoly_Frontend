import { DM_Sans, Orbitron, Krona_One } from "next/font/google";

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const kronaOne = Krona_One({
  variable: "--font-krona-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const orbitron = Orbitron({
  variable: "--font-orbitron-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
