"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FairPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the exhibition list page
    router.push("/manager/fair");
  }, [router]);

  return null; // This component doesn't render anything
}
