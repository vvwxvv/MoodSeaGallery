"use client";

import React, { useContext, useMemo } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Context & Hooks
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import useImageZoom from "@/hooks/useImageZoom";
import useFairDetailData from "@/components/pages/fair/hooks/useFairDetailData";   // fair hook
import { useReverseTheme } from "@/hooks/useReverseTheme";

// Alerts / states
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import ErrorState from "@/components/alerts/ErrorState";
import FormAlert from "@/components/alerts/FormAlert";
import NoDataInfo from "@/components/alerts/NoDataInfo";

// Images
import ImageZoomModal from "@/components/images/ImageZoomModal";

// ============================================================
// CONSTANTS & HELPERS
// ============================================================
const FALLBACK_IMAGE = "/no-image.png";

// Helper to format date
function formatSimpleDateRange(start, end) {
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  return start || end;
}

// Split a string OR array-of-strings into clean paragraph strings.
// Handles: plain string with \n / \n\n breaks, or arrays with embedded newlines.
function extractParagraphs(content) {
  if (!content) return [];

  const splitLines = (str) =>
    str
      .split(/\r?\n+/) // Split on newlines
      .map((s) => s.trim()) // Trim whitespace
      .filter(Boolean); // Remove empty strings

  if (Array.isArray(content)) {
    return content.flatMap((item) =>
      typeof item === "string" ? splitLines(item) : []
    );
  }

  if (typeof content === "string") {
    return splitLines(content);
  }

  return [];
}

// Metadata labels (Fair-specific)
const METADATA_LABELS = {
  section: { en: "Section", cn: "板块" },
  booth: { en: "Booth", cn: "展位" },
  venue: { en: "Venue", cn: "场馆" },
  location: { en: "Location", cn: "地点" },
  curator: { en: "Curator", cn: "策展人" },
  organiser: { en: "Organiser", cn: "主办方" },
  participating_artists: { en: "Participating Artists", cn: "参展艺术家" },
  language: { en: "Language", cn: "语言" },
};

const METADATA_ORDER = [
  "section",
  "booth",
  "venue",
  "location",
  "curator",
  "organiser",
  "participating_artists",
  "language",
];

// ============================================================
// SKELETON
// ============================================================
function FairDetailSkeleton({ isMobile, bgColor }) {
  return (
    <PageSkeleton bgColor={bgColor}>
      <Box sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            maxWidth: "md",
            mx: "auto",
            px: { xs: 3, md: 4 },
            py: { xs: 6, md: 10 },
          }}
        >
          {/* Header: title + subtitle + date */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <SkeletonLine width={isMobile ? "180px" : "320px"} height={isMobile ? 22 : 26} style={{ marginBottom: "8px" }} />
            <SkeletonLine width="120px" height={16} style={{ marginBottom: "8px", opacity: 0.7 }} />
            <SkeletonLine width="200px" height={14} style={{ opacity: 0.9 }} />
          </Box>

          {/* Cover image */}
          <Box sx={{ mb: { xs: 5, md: 8 } }}>
            <SkeletonBlock width="100%" height={0} style={{ paddingBottom: "56%", marginBottom: "12px" }} />
            <SkeletonLine width="60%" height={13} />
          </Box>

          {/* Press release paragraphs */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "18px", mb: 6 }}>
            <SkeletonLine width="100%" height={14} />
            <SkeletonLine width="95%" height={14} />
            <SkeletonLine width="88%" height={14} />
            <SkeletonLine width="72%" height={14} />
          </Box>

          {/* Related artworks / artists */}
          <Box sx={{ mb: 4 }}>
            <SkeletonLine width="60px" height={11} style={{ marginBottom: "12px", opacity: 0.6 }} />
            <SkeletonLine width="160px" height={15} style={{ marginBottom: "6px" }} />
            <SkeletonLine width="140px" height={15} style={{ marginBottom: "6px" }} />
          </Box>

          {/* Metadata section */}
          <Box sx={{ mt: { xs: 8, md: 10 }, pt: { xs: 4, md: 5 }, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {["Section", "Venue", "Location", "Curator"].map((_, i) => (
              <Box key={i} sx={{ display: "flex", mb: 1.5, gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <SkeletonLine width="100px" height={13} style={{ opacity: 0.6 }} />
                <SkeletonLine width={`${120 + i * 40}px`} height={14} style={{ opacity: 0.85 }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </PageSkeleton>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default function FairDetailPageComponent() {
  // --- Context & hooks -------------------------------------
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { slug } = useParams();
  const { fontFamily } = useFont();

  const { colors } = useReverseTheme() || { colors: { text: "#000", background: "#fff" } };
  const { modalOpen, selectedImage, handleImageClick, handleModalClose } = useImageZoom();

  // --- Data ------------------------------------------------
  const {
    fair,
    isLoading,
    hasError,
    firstError,
    galleryImages = [],
  } = useFairDetailData(slug, isCn);

  // --- Computed (ALL hooks must run before any early return) ----
  const fairTitle = fair?.title || (isCn ? "无题" : "Untitled");
  const dateRange =
    formatSimpleDateRange(fair?.date_start, fair?.date_end) ||
    fair?.vip_preview_date;

  const finalCoverImageUrl = useMemo(
    () =>
      fair?.cover_img_url && fair.cover_img_url !== FALLBACK_IMAGE
        ? fair.cover_img_url
        : null,
    [fair]
  );

  // Paragraph-split text for press_release (array of strings)
  const pressReleaseParas = useMemo(
    () => extractParagraphs(fair?.press_release),
    [fair]
  );

  // Safely normalize arrays to prevent mapping errors
  const relatedArtworks = useMemo(() => {
    if (!fair?.related_artwork_title) return [];
    const raw = Array.isArray(fair.related_artwork_title)
      ? fair.related_artwork_title
      : [fair.related_artwork_title];
    return raw.filter((t) => String(t || "").trim());
  }, [fair]);

  const relatedArtists = useMemo(() => {
    if (!fair?.related_gallery_artist) return [];
    const raw = Array.isArray(fair.related_gallery_artist)
      ? fair.related_gallery_artist
      : [fair.related_gallery_artist];
    return raw.filter((n) => String(n || "").trim());
  }, [fair]);

  // --- Render: loading -------------------------------------
  if (isLoading) {
    return <FairDetailSkeleton isMobile={isMobile} bgColor={colors.background} />;
  }

  // --- Render: error ---------------------------------------
  if (hasError) {
    return (
      <Box sx={{ mt: 3, px: 2 }}>
        <ErrorState error={firstError} isCn={isCn} />
        <FormAlert
          severity="error"
          message={isCn ? "加载博览会数据时出错，请稍后重试。" : "An error occurred while loading fair data."}
        />
      </Box>
    );
  }

  // --- Render: no data -------------------------------------
  if (!fair) {
    return (
      <Box sx={{ mt: 3 }}>
        <NoDataInfo schemaName="fair" isCn={isCn} />
      </Box>
    );
  }

  // --- Render: main UI -------------------------------------
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: colors.background, color: colors.text }}>
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 3, md: 4 },
          py: { xs: 6, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* 1. Header (Title, Section & Date) */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            {fairTitle.includes(":") ? (
              <h1 style={{ fontFamily, fontSize: isMobile ? "22px" : "26px", fontWeight: 500, margin: "0 0 8px 0", letterSpacing: "0.01em", lineHeight: 1.3 }}>
                <span style={{ fontStyle: "italic" }}>{fairTitle.split(":")[0]}</span>
                :{fairTitle.split(":").slice(1).join(":")}
              </h1>
            ) : (
              <h1 style={{ fontFamily, fontSize: isMobile ? "22px" : "26px", fontWeight: 500, margin: "0 0 8px 0", letterSpacing: "0.01em", lineHeight: 1.3 }}>
                {fairTitle}
              </h1>
            )}

            {/* Section (if present) */}
            {fair.section && (
              <p style={{ fontFamily, fontSize: "16px", fontWeight: 400, margin: "0 0 8px 0", opacity: 0.7 }}>
                {fair.section.replace(/\\n/g, '\n')}
              </p>
            )}

            {/* Date */}
            {dateRange && (
              <p style={{ fontFamily, fontSize: "14px", fontWeight: 600, margin: 0, opacity: 0.9, letterSpacing: "0.02em" }}>
                {dateRange}
              </p>
            )}
          </Box>

          {/* 2. Cover Image & Caption */}
          {finalCoverImageUrl ? (
            <Box sx={{ mb: { xs: 5, md: 8 } }}>
              <Box
                sx={{
                  width: "100%",
                  cursor: "zoom-in",
                  backgroundColor: "rgba(0,0,0,0.02)",
                  mb: fair.caption ? 1.5 : 0
                }}
                onClick={() => handleImageClick(finalCoverImageUrl)}
              >
                <img src={finalCoverImageUrl} alt={fairTitle} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
              </Box>
              {fair.caption && (
                <Typography sx={{ fontFamily, fontSize: "13px", fontStyle: "italic", opacity: 0.5, lineHeight: 1.5, px: 0.5 }}>
                  {fair.caption.replace(/\\n/g, '\n')}
                </Typography>
              )}
            </Box>
          ) : (
            /* Show caption even without cover image */
            fair.caption && (
              <Box sx={{ mb: { xs: 5, md: 8 } }}>
                <Typography sx={{ fontFamily, fontSize: "13px", fontStyle: "italic", opacity: 0.5, lineHeight: 1.5 }}>
                  {fair.caption.replace(/\\n/g, '\n')}
                </Typography>
              </Box>
            )
          )}

          {/* 3. Press Release (if any) */}
          {pressReleaseParas.length > 0 && (
            <Box sx={{ mt: 4 }}>
              {pressReleaseParas.map((para, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontFamily,
                    fontSize: "14px",
                    lineHeight: 1.8,
                    opacity: 0.85,
                    textAlign: "justify",
                    mb: 2,
                  }}
                >
                  {para.replace(/\\n/g, '\n')}
                </Typography>
              ))}
            </Box>
          )}

          {/* 4. Video Player */}
          {fair.video_url && (
            <Box
              sx={{
                mt: 6,
                mb: 6,
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                width: '100%',
                backgroundColor: '#000'
              }}
            >
              <iframe
                src={fair.video_url}
                title="Fair Video"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}

          {/* 5. Related Artwork & Gallery Artists */}
          {(relatedArtworks.length > 0 || relatedArtists.length > 0) && (
            <Box sx={{ mt: fair.video_url ? 2 : 6, display: 'flex', flexDirection: 'column' }}>

              {/* Artworks section */}
              {relatedArtworks.length > 0 && (
                <Box sx={{ mb: relatedArtists.length > 0 ? 4 : 0 }}>
                  <Typography sx={{ fontFamily, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, mb: 2, pb: '8px', borderBottom: `1px solid ${colors.text}`, display: 'inline-block' }}>
                    {isCn ? "作品" : "Works"}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {relatedArtworks.map((work, idx) => (
                      <Link
                        key={`work-${idx}`}
                        href={`/artworks?title=${encodeURIComponent(work)}`}
                        style={{ textDecoration: 'none', color: 'inherit', width: 'fit-content' }}
                      >
                        <Typography sx={{ fontFamily, fontSize: '15px', fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                          {work}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Artists section */}
              {relatedArtists.length > 0 && (
                <Box>
                  <Typography sx={{ fontFamily, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, mb: 2, pb: '8px', borderBottom: `1px solid ${colors.text}`, display: 'inline-block' }}>
                    {isCn ? "相关艺术家" : "Related Artists"}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {relatedArtists.map((artist, idx) => (
                      <Link
                        key={`artist-${idx}`}
                        href={`/artist/${encodeURIComponent(artist.replace(/\s+/g, '-'))}`}
                        style={{ textDecoration: 'none', color: 'inherit', width: 'fit-content' }}
                      >
                        <Typography sx={{ fontFamily, fontSize: '15px', fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                          {artist}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* 6. Metadata Info Section */}
          <Box
            sx={{
              mt: { xs: 8, md: 10 },
              pt: { xs: 4, md: 5 },
              borderTop: `1px solid ${colors.text}`,
              opacity: 0.85
            }}
          >
            {METADATA_ORDER.map((key) => {
              const value = fair[key];
              if (!value) return null;

              const label = METADATA_LABELS[key]
                ? (isCn ? METADATA_LABELS[key].cn : METADATA_LABELS[key].en)
                : key;

              return (
                <Stack
                  key={key}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0.5, sm: 2 }}
                  sx={{ mb: 1.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily,
                      fontSize: "13px",
                      fontWeight: 600,
                      minWidth: "160px",
                      opacity: 0.6,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily,
                      fontSize: "14px",
                      opacity: 0.85,
                      lineHeight: 1.5
                    }}
                  >
                    {value}
                  </Typography>
                </Stack>
              );
            })}
          </Box>

        </motion.div>
      </Container>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        imageUrl={selectedImage || ""}
        title={fairTitle}
        enableGifRestart={true}
      />
    </Box>
  );
}