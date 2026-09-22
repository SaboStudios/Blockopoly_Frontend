import type { Metadata } from "next";

const SITE_NAME = "Blockopoly";
const SITE_DESCRIPTION =
  "Blockopoly is a decentralized Monopoly-inspired game built on the blockchain. Buy, trade, and own properties as NFTs while playing with friends.";
const OG_IMAGE = "/heroBg.png";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_ALT = "Blockopoly — decentralized Monopoly-inspired blockchain game";

export function getMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const resolvedDescription = description ?? SITE_DESCRIPTION;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: SITE_NAME,
      url: path,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [OG_IMAGE],
    },
  };
}

export default getMetadata;
