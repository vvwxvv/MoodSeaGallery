"use client";

import React, { useContext, useMemo, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Context & Hooks
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import useImageZoom from "@/hooks/useImageZoom";
import useExhibitionDetailData from "@/components/pages/exhibition/hooks/useExhibitionDetailData";
import { useReverseTheme } from "@/hooks/useReverseTheme";

// Alerts / states
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import ErrorState from "@/components/alerts/ErrorState";
import FormAlert from "@/components/alerts/FormAlert";
import NoDataInfo from "@/components/alerts/NoDataInfo";
import useData from "@/hooks/useData";

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
// Handles: plain string with \n / \n\n breaks (e.g. `description: String?`),
// and arrays whose individual items may themselves contain embedded newlines
// (e.g. `introduction: String[]`, `press_release: String[]`).
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

// Metadata labels
const METADATA_LABELS = {
  venue: { en: "Venue", cn: "场馆" },
  location: { en: "Location", cn: "地点" },
  curator: { en: "Curator", cn: "策展人" },
  organiser: { en: "Organiser", cn: "主办方" },
  participating_artists: { en: "Participating Artists", cn: "参展艺术家" },
  language: { en: "Language", cn: "语言" },
};

const METADATA_ORDER = [
  "venue",
  "location",
  "curator",
  "organiser",
  "participating_artists",
  "language",
];

// ============================================================
// Skeleton helpers — shared shimmer style
// ============================================================
const skeletonBase = {
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.15) 37%, rgba(0,0,0,0.06) 63%)",
  backgroundSize: "400px 100%",
  animation: "awd-shimmer 1.2s ease infinite",
  borderRadius: "2px",
};

function SkeletonLine({ width, height = 14, sx = {} }) {
  return (
    <Box
      sx={{ ...skeletonBase, width, height: `${height}px`, ...sx }}
    />
  );
}

function SkeletonBlock({ height = 200, sx = {} }) {
  return (
    <Box
      sx={{ ...skeletonBase, width: "100%", height: `${height}px`, borderRadius: 0, ...sx }}
    />
  );
}

// ============================================================
// Artist name link with underline hover animation
// ============================================================
function ArtistNameLink({ name, slug, index, isMobile, fontFamily, textColor }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: isMobile ? 0 : index * 0.04, duration: 0.3 }}
    >
      <Link
        href={`/artists/${slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          textDecoration: 'none',
          color: textColor,
          display: 'inline-block',
          position: 'relative',
          fontFamily,
          fontSize: isMobile ? '13px' : '15px',
          lineHeight: 1.5,
          opacity: isHovered ? 1 : 0.75,
          padding: '2px 0 4px',
          transition: 'opacity 0.2s ease',
          outline: 'none',
        }}
      >
        {name}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: textColor,
            transformOrigin: 'left',
            pointerEvents: 'none',
          }}
        />
      </Link>
    </motion.div>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default function ExhibitionDetailPageComponent() {
  // --- Context & hooks -------------------------------------
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { slug } = useParams();
  const { fontFamily } = useFont();

  const { colors } = useReverseTheme() || { colors: { text: "#000", background: "#fff" } };
  const { modalOpen, selectedImage, handleImageClick, handleModalClose } = useImageZoom();

  // --- Data ------------------------------------------------
  // useExhibitionDetailData already matches images to this exhibition
  // internally (via useImageGallery) and hands back the result as
  // galleryImages, so no extra filtering/sorting is needed here.
  const {
    exhibition,
    isLoading,
    hasError,
    firstError,
    galleryImages = [],
  } = useExhibitionDetailData(slug, isCn);

  // Fetch all artworks so we can match related_artwork_title to real records
  const { data: allArtworks = [], isLoading: artworksLoading } = useData("/api/artwork");

  // --- Computed (ALL hooks must run before any early return) ----

  const artistSlug = (name) =>
    String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\p{L}\p{N}_-]/gu, "");

  const artworkSlug = (title) =>
    String(title || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\p{L}\p{N}_-]/gu, "");
  const exhibitionTitle = exhibition?.title || (isCn ? "无题" : "Untitled");
  const dateRange =
    formatSimpleDateRange(exhibition?.date_start, exhibition?.date_end) ||
    exhibition?.opening_date;

  const finalCoverImageUrl = useMemo(
    () =>
      exhibition?.cover_img_url && exhibition.cover_img_url !== FALLBACK_IMAGE
        ? exhibition.cover_img_url
        : null,
    [exhibition]
  );

  // Paragraph-split text (handles \n breaks whether introduction/description
  // come back as a single string or an array of strings)
  const introductionParas = useMemo(
    () => extractParagraphs(exhibition?.introduction),
    [exhibition]
  );
  const descriptionParas = useMemo(
    () => extractParagraphs(exhibition?.description),
    [exhibition]
  );
  const allTextParagraphs = useMemo(
    () => [...introductionParas, ...descriptionParas],
    [introductionParas, descriptionParas]
  );

  // Safely normalize arrays to prevent mapping errors if a string is returned
  const relatedArtworks = useMemo(() => {
    if (!exhibition?.related_artwork_title) return [];
    const raw = Array.isArray(exhibition.related_artwork_title)
      ? exhibition.related_artwork_title
      : [exhibition.related_artwork_title];
    // Filter out empty/whitespace entries
    return raw.filter((t) => String(t || "").trim());
  }, [exhibition]);

  const relatedArtists = useMemo(() => {
    if (!exhibition?.related_gallery_artist) return [];
    const raw = Array.isArray(exhibition.related_gallery_artist)
      ? exhibition.related_gallery_artist
      : [exhibition.related_gallery_artist];
    // Filter out empty/whitespace entries
    return raw.filter((name) => String(name || "").trim());
  }, [exhibition]);

  // Match related_artwork_title strings to actual artwork records
  const matchedArtworks = useMemo(() => {
    if (!relatedArtworks.length || !Array.isArray(allArtworks)) return [];
    const titleSet = new Set(relatedArtworks.map((t) => t.trim().toLowerCase()));
    return allArtworks.filter((aw) => {
      const t = (aw?.title || "").trim().toLowerCase();
      return t && titleSet.has(t);
    });
  }, [relatedArtworks, allArtworks]);

  const isDataLoading = isLoading || artworksLoading;

  // One introduction paragraph <-> one image, matched in order
  const pairedIntroImages = useMemo(() => {
    if (!introductionParas.length) return [];
    return introductionParas.map((intro, idx) => ({
      intro,
      image: galleryImages[idx] || null,
    }));
  }, [introductionParas, galleryImages]);

  // --- Render: loading -------------------------------------
  if (isDataLoading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: colors.background }}>
        {/* Loading pulse indicator */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)",
            backgroundSize: "200% 100%",
            animation: "awd-shimmer 0.8s ease infinite",
            zIndex: 9999,
          }}
        />
        <LoadingAnimation isLoading />
        <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 }, py: { xs: 6, md: 10 } }}>
          {/* Title skeleton */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <SkeletonLine width="60%" height={isMobile ? 22 : 26} />
            <Box sx={{ mt: 1 }}>
              <SkeletonLine width="35%" height={14} />
            </Box>
          </Box>

          {/* Cover image skeleton */}
          <Box sx={{ mb: { xs: 5, md: 8 } }}>
            <SkeletonBlock height={isMobile ? 220 : 400} />
          </Box>

          {/* Intro paragraphs skeleton */}
          <Box sx={{ mt: 4 }}>
            <SkeletonLine width="100%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="95%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="88%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="60%" height={14} sx={{ mb: 3 }} />

            {/* Paired image placeholder */}
            <Box sx={{ width: "100%", maxWidth: "300px", mx: "auto", mb: 4 }}>
              <SkeletonBlock height={200} />
            </Box>

            <SkeletonLine width="100%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="70%" height={14} />
          </Box>

          {/* Related section skeleton */}
          <Box sx={{ mt: 6 }}>
            <SkeletonLine width="100px" height={11} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <SkeletonLine width="45%" height={15} />
              <SkeletonLine width="55%" height={15} />
              <SkeletonLine width="35%" height={15} />
            </Box>
            <Box sx={{ mt: 3 }}>
              <SkeletonLine width="130px" height={11} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <SkeletonLine width="40%" height={15} />
                <SkeletonLine width="50%" height={15} />
              </Box>
            </Box>
          </Box>

          {/* Metadata skeleton */}
          <Box sx={{ mt: { xs: 8, md: 10 }, pt: { xs: 4, md: 5 }, borderTop: `1px solid ${colors.text}`, opacity: 0.25 }}>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                <SkeletonLine width="160px" height={13} />
                <SkeletonLine width={`${30 + i * 10}%`} height={14} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  // --- Render: error ---------------------------------------
  if (hasError) {
    return (
      <Box sx={{ mt: 3, px: 2 }}>
        <ErrorState error={firstError} isCn={isCn} />
        <FormAlert
          severity="error"
          message={isCn ? "加载展览数据时出错，请稍后重试。" : "An error occurred while loading exhibition data."}
        />
      </Box>
    );
  }

  // --- Render: no data -------------------------------------
  if (!exhibition) {
    return (
      <Box sx={{ mt: 3 }}>
        <NoDataInfo schemaName="exhibition" isCn={isCn} />
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

          {/* 1. Header (Title, Subtitle & Date) */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            {exhibitionTitle.includes(":") ? (
              <h1 style={{ fontFamily, fontSize: isMobile ? "22px" : "26px", fontWeight: 500, margin: "0 0 8px 0", letterSpacing: "0.01em", lineHeight: 1.3 }}>
                <span style={{ fontStyle: "italic" }}>{exhibitionTitle.split(":")[0]}</span>
                :{exhibitionTitle.split(":").slice(1).join(":")}
              </h1>
            ) : (
              <h1 style={{ fontFamily, fontSize: isMobile ? "22px" : "26px", fontWeight: 500, margin: "0 0 8px 0", letterSpacing: "0.01em", lineHeight: 1.3 }}>
                {exhibitionTitle}
              </h1>
            )}

            {/* Subtitle */}
            {exhibition.subtitle && (
              <p style={{ fontFamily, fontSize: "16px", fontWeight: 400, margin: "0 0 8px 0", opacity: 0.7 }}>
                {exhibition.subtitle}
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
                  mb: exhibition.caption ? 1.5 : 0
                }}
                onClick={() => handleImageClick(finalCoverImageUrl)}
              >
                <img src={finalCoverImageUrl} alt={exhibitionTitle} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
              </Box>
              {exhibition.caption && (
                <Typography sx={{ fontFamily, fontSize: "13px", fontStyle: "italic", opacity: 0.5, lineHeight: 1.5, px: 0.5 }}>
                  {exhibition.caption.replace(/\\n/g, '\n')}
                </Typography>
              )}
            </Box>
          ) : (
            /* Show caption even without cover image */
            exhibition.caption && (
              <Box sx={{ mb: { xs: 5, md: 8 } }}>
                <Typography sx={{ fontFamily, fontSize: "13px", fontStyle: "italic", opacity: 0.5, lineHeight: 1.5 }}>
                  {exhibition.caption.replace(/\\n/g, '\n')}
                </Typography>
              </Box>
            )
          )}

          {/* 3. Introduction paragraphs paired 1:1 with images, falling back
                to plain paragraph text, falling back to an empty-state note */}
          {pairedIntroImages.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {pairedIntroImages.map((pair, idx) => (
                <Box key={idx} sx={{ mb: 4 }}>
                  {/* Introduction paragraph */}
                  <Typography
                    sx={{
                      fontFamily,
                      fontSize: "14px",
                      lineHeight: 1.8,
                      opacity: 0.85,
                      textAlign: "justify",
                      mb: 2,
                    }}
                  >
                    {pair.intro.replace(/\\n/g, '\n')}
                  </Typography>

                  {/* Paired image (if one exists at this index) */}
                  {pair.image && (
                    <Box sx={{ width: "100%", maxWidth: "300px", mx: "auto" }}>
                      <img
                        src={pair.image.img_url}
                        alt={pair.image.caption_en || pair.image.caption_cn || "Exhibition Image"}
                        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                      />
                      {(pair.image.caption_en || pair.image.caption_cn) && (
                        <Typography
                          sx={{
                            fontFamily,
                            fontSize: "12px",
                            fontStyle: "italic",
                            opacity: 0.7,
                            mt: 1,
                            textAlign: "center",
                          }}
                        >
                          {isCn ? pair.image.caption_cn : pair.image.caption_en}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ) : allTextParagraphs.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {allTextParagraphs.map((para, idx) => (
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
                  {para}
                </Typography>
              ))}
            </Box>
          ) : null}

          {/* 4. Video Player */}
          {exhibition.video_url && (
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
                src={exhibition.video_url}
                title="Exhibition Video"
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
          {(matchedArtworks.length > 0 || relatedArtists.length > 0) && (
            <Box sx={{ mt: exhibition.video_url ? 2 : 6, display: 'flex', flexDirection: 'column', gap: 6 }}>

              {/* Artworks section — image thumbnails grid */}
              {matchedArtworks.length > 0 && (
                <Box>
                  <Typography sx={{ fontFamily, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, mb: 3, pb: '8px', borderBottom: `1px solid ${colors.text}`, display: 'inline-block' }}>
                    {isCn ? "作品" : "Works"}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: isMobile
                        ? 'repeat(2, 1fr)'
                        : 'repeat(auto-fill, minmax(180px, 1fr))',
                      gap: isMobile ? '12px' : '24px',
                    }}
                  >
                    {matchedArtworks.map((aw, idx) => (
                      <Link
                        key={aw.id || aw._id || idx}
                        href={`/artworks/${artworkSlug(aw.title)}?artist=${encodeURIComponent(
                          (aw.artist || "").replace(/\s+/g, "-")
                        )}`}
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                        >
                          {/* Thumbnail */}
                          <Box
                            sx={{
                              width: '100%',
                              aspectRatio: '1/1',
                              overflow: 'hidden',
                              backgroundColor: 'rgba(0,0,0,0.03)',
                              mb: 1,
                            }}
                          >
                            {aw.cover_img_url ? (
                              <img
                                src={aw.cover_img_url}
                                alt={aw.title || ''}
                                loading="lazy"
                                decoding="async"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily,
                                    fontSize: '10px',
                                    opacity: 0.2,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                  }}
                                >
                                  No Image
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {/* Caption */}
                          <Typography
                            sx={{
                              fontFamily,
                              fontSize: isMobile ? '10px' : '11px',
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              opacity: 0.85,
                              mb: 0.25,
                            }}
                          >
                            {aw.artist || ''}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily,
                              fontSize: isMobile ? '11px' : '12px',
                              fontStyle: 'italic',
                              lineHeight: 1.3,
                              mb: 0.25,
                            }}
                          >
                            {aw.title || (isCn ? '无题' : 'Untitled')}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily,
                              fontSize: isMobile ? '10px' : '11px',
                              opacity: 0.5,
                            }}
                          >
                            {[aw.year, aw.medium].filter(Boolean).join(', ')}
                          </Typography>
                        </motion.div>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Artists section — with underline hover animation */}
              {relatedArtists.length > 0 && (
                <Box>
                  <Typography sx={{ fontFamily, fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, mb: 2, pb: '8px', borderBottom: `1px solid ${colors.text}`, display: 'inline-block' }}>
                    {isCn ? "相关艺术家" : "Related Artists"}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {relatedArtists.map((artist, idx) => (
                      <ArtistNameLink
                        key={`artist-${idx}`}
                        name={artist}
                        slug={artistSlug(artist)}
                        index={idx}
                        isMobile={isMobile}
                        fontFamily={fontFamily}
                        textColor={colors.text}
                      />
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
              const value = exhibition[key];
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
        title={exhibitionTitle}
        enableGifRestart={true}
      />
    </Box>
  );
}