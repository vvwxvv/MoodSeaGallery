"use client";
import { use } from "react";
import FairDetailPageComponent from "@/components/pages/fair/FairDetailPageComponent";

export default function FairSlugPage({ params }) {
  const { slug } = use(params);
  return <FairDetailPageComponent slug={slug} />;
}
