"use client";
import { use } from "react";
import ArtistDetailPageComponent from "@/components/pages/artists/ArtistDetailPageComponent";

export default function ArtistDetailPage({ params }) {
  const { slug } = use(params);
  return <ArtistDetailPageComponent artistSlug={slug} />;
}
