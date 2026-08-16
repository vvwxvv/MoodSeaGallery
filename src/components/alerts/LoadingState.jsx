"use client";

import { Box } from "@mui/material";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

/**
 * Full-page centered loading spinner.
 * Reused by SeriesDetail, SeriesPageComponent, any detail page.
 */
export default function LoadingState() {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingAnimation isLoading={true} />
    </Box>
  );
}