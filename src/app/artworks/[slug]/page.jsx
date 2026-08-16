"use client";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import ArtistaArtworkDetailPageComponent from "@/components/pages/artists/ArtistaArtworkDetailPageComponent";

export default function ArtworkDetailPage({ params }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const artistSlug = searchParams.get("artist") || "";
  return <ArtistaArtworkDetailPageComponent artworkSlug={slug} artistSlug={artistSlug} />;
}
