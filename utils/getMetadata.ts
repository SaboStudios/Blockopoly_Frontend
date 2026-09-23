import type { Metadata } from "next";

const SITE_NAME = "Blockopoly";
const SITE_DESCRIPTION =
  "Blockopoly is a decentralized Monopoly-style game built on the blockchain. Buy, trade, and build your empire on-chain.";
const OG_IMAGE = "/thumbnail.png";

interface GetMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function getMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = OG_IMAGE,
  url,
}: GetMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} thumbnail`,
        },
      ],
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}

export default getMetadata;
