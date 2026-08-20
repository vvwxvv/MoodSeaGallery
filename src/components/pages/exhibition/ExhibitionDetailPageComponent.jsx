"use client";

import React, { useContext, useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
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
// 🅰️  TEXT / TYPOGRAPHY CONFIG  — tune every piece of text here
// ------------------------------------------------------------
// Each block controls one text element on the page:
//   fontSizeDesktop / fontSizeMobile  → responsive size
//   fontWeight                        → 300–700
//   color                             → null = follow the theme (colors.text,
//                                        auto light/dark). Put a hex to override.
//   opacity                           → 0–1
//   letterSpacing / lineHeight        → CSS values
//   marginBottom (px)                 → the GAP under this element
//   italic / textAlign / textTransform→ optional extras
//
// BASE_COLOR recolours EVERY element at once (still overridable per block).
// ============================================================
const TEXT_CONFIG = {
  BASE_COLOR: null, // e.g. "#111111" to force one colour on all text

  TITLE: {
    fontSizeDesktop: "26px",
    fontSizeMobile: "22px",
    fontWeight: 500,
    color: null,
    opacity: 1,
    letterSpacing: "0.01em",
    lineHeight: 1.3,
    marginBottom: 8,
    italicizeBeforeColon: true, // italic on the part before ":"  (e.g. *I Am Here*: subtitle)
  },

  SUBTITLE: {
    fontSizeDesktop: "16px",
    fontSizeMobile: "15px",
    fontWeight: 400,
    color: null,
    opacity: 0.7,
    letterSpacing: "0em",
    lineHeight: 1.5,
    marginBottom: 8,
  },

  DATE: {
    fontSizeDesktop: "14px",
    fontSizeMobile: "13px",
    fontWeight: 600,
    color: null,
    opacity: 0.9,
    letterSpacing: "0.02em",
    lineHeight: 1.5,
    marginBottom: 0,
  },

  COVER_CAPTION: {
    fontSizeDesktop: "13px",
    fontSizeMobile: "12px",
    fontWeight: 400,
    color: null,
    opacity: 0.5,
    letterSpacing: "0em",
    lineHeight: 1.5,
    italic: true,
    marginBottom: 0,
  },

  // Primary body text (introduction, or description when there is no introduction)
  INTRO: {
    fontSizeDesktop: "14px",
    fontSizeMobile: "14px",
    fontWeight: 400,
    color: null,
    opacity: 0.85,
    letterSpacing: "0em",
    lineHeight: 1.8,
    textAlign: "justify",
    marginBottom: 16,
  },

  // Trailing body text (description shown after the introduction, if both exist)
  DESCRIPTION: {
    fontSizeDesktop: "14px",
    fontSizeMobile: "14px",
    fontWeight: 400,
    color: null,
    opacity: 0.85,
    letterSpacing: "0em",
    lineHeight: 1.8,
    textAlign: "justify",
    marginBottom: 16,
  },

  IMAGE_CAPTION: {
    fontSizeDesktop: "13px",
    fontSizeMobile: "12px",
    fontWeight: 400,
    color: null,
    opacity: 0.5,
    letterSpacing: "0em",
    lineHeight: 1.5,
    italic: true,
    marginTop: 12, // gap ABOVE the caption (sits under its image)
  },

  // Shared style for the "Works" / "Related Artists" section headings
  SECTION_HEADING: {
    fontSizeDesktop: "11px",
    fontSizeMobile: "11px",
    fontWeight: 700,
    color: null,
    opacity: 0.6,
    letterSpacing: "0.15em",
    lineHeight: 1.4,
    textTransform: "uppercase",
    marginBottom: 24,
  },

  ARTIST_LINK: {
    fontSizeDesktop: "15px",
    fontSizeMobile: "13px",
    fontWeight: 400,
    color: null,
    idleOpacity: 0.75,
    hoverOpacity: 1,
    lineHeight: 1.5,
  },

  METADATA_LABEL: {
    fontSizeDesktop: "12px",
    fontSizeMobile: "12px",
    fontWeight: 500,
    color: null,
    opacity: 0.45,
    letterSpacing: "0.12em",
    lineHeight: 1.5,
    textTransform: "uppercase",
  },

  METADATA_VALUE: {
    fontSizeDesktop: "15px",
    fontSizeMobile: "15px",
    fontWeight: 400,
    color: null,
    opacity: 0.9,
    letterSpacing: "0em",
    lineHeight: 1.6,
  },
};

// ============================================================
// 🅱️  LAYOUT / SPACING CONFIG  — all gaps between sections (px)
// ============================================================
const LAYOUT_CONFIG = {
  HEADER_MB_DESKTOP: 38, // gap under the title/subtitle/date block
  HEADER_MB_MOBILE: 32,

  COVER_MB_DESKTOP: 34, // gap under the cover image
  COVER_MB_MOBILE: 40,

  BODY_MT: 18, // gap above the body text
  BODY_BLOCK_GAP: 32, // gap between each (paragraph + image) block
  PARA_TO_IMAGE_GAP: 8, // gap between a paragraph and the image paired to it

  VIDEO_MT: 48,
  VIDEO_MB: 48,

  RELATED_MT_DESKTOP: 48, // gap above the Works/Artists area
  RELATED_MT_MOBILE: 48,
  RELATED_SECTION_GAP: 48, // gap between the Works grid and the Artists list

  METADATA_MT_DESKTOP: 80,
  METADATA_MT_MOBILE: 64,
  METADATA_PT_DESKTOP: 40,
  METADATA_PT_MOBILE: 32,
  METADATA_ROW_PY_DESKTOP: 20, // vertical padding inside each metadata row
  METADATA_ROW_PY_MOBILE: 16,
  METADATA_LABEL_MINWIDTH: 200, // width of the uppercase label column (desktop)
};

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

// Pick a responsive value from a config block that exposes
// `<key>Desktop` / `<key>Mobile`, falling back to a plain `<key>`.
function pickResponsive(cfg, isMobile, key = "fontSize") {
  const d = cfg[`${key}Desktop`];
  const m = cfg[`${key}Mobile`];
  if (d != null || m != null) {
    return isMobile ? m ?? d : d ?? m;
  }
  return cfg[key];
}

// Resolve a text colour: per-block override → global BASE_COLOR → theme text.
function resolveColor(cfg, themeText) {
  return cfg.color || TEXT_CONFIG.BASE_COLOR || themeText;
}

// Build an MUI `sx` object from a TEXT_CONFIG block. `ctx` carries the
// runtime bits (isMobile / fontFamily / theme text colour).
function textSx(cfg, ctx) {
  const sx = {
    fontFamily: ctx.fontFamily,
    fontSize: pickResponsive(cfg, ctx.isMobile, "fontSize"),
    fontWeight: cfg.fontWeight,
    color: resolveColor(cfg, ctx.themeText),
    opacity: cfg.opacity,
    lineHeight: cfg.lineHeight,
  };
  if (cfg.letterSpacing) sx.letterSpacing = cfg.letterSpacing;
  if (cfg.textAlign) sx.textAlign = cfg.textAlign;
  if (cfg.textTransform) sx.textTransform = cfg.textTransform;
  if (cfg.italic) sx.fontStyle = "italic";
  return sx;
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
  // "language" intentionally omitted — not shown on the exhibition detail page
];

// ============================================================
// 🎨 MATCHED ARTWORKS GRID — image-only grid at the bottom of the
// exhibition detail page, styled to match the "Related Artworks" grid
// on the artist detail page. No text renders below the image — images only.
// (Heading styling now lives in TEXT_CONFIG.SECTION_HEADING, shared with
// the Related Artists heading, so both stay in sync.)
//
// Two grid modes, set independently for DESKTOP and MOBILE:
//   "fixed" → an exact column count (GRID_COLUMNS_*).
//   "auto"  → browser fits as many columns ≥ GRID_MIN_COLUMN_WIDTH_* as it can.
// ============================================================
const MATCHED_ARTWORKS_CONFIG = {
  // ---- Desktop grid ----
  GRID_MODE_DESKTOP: "auto", // "fixed" | "auto"
  GRID_COLUMNS_DESKTOP: 4, // used when GRID_MODE_DESKTOP === "fixed"
  GRID_MIN_COLUMN_WIDTH_DESKTOP: 180, // used when GRID_MODE_DESKTOP === "auto"

  // ---- Mobile grid ----
  GRID_MODE_MOBILE: "fixed", // "fixed" | "auto"
  GRID_COLUMNS_MOBILE: 2, // used when GRID_MODE_MOBILE === "fixed"
  GRID_MIN_COLUMN_WIDTH_MOBILE: 140, // used when GRID_MODE_MOBILE === "auto"

  // ---- Spacing (px) ----
  GRID_GAP_DESKTOP: 24,
  GRID_GAP_MOBILE: 12,
  GRID_ROW_GAP_DESKTOP: null, // set a number to override GRID_GAP_DESKTOP vertically
  GRID_COLUMN_GAP_DESKTOP: null, // set a number to override GRID_GAP_DESKTOP horizontally
  GRID_ROW_GAP_MOBILE: null,
  GRID_COLUMN_GAP_MOBILE: null,

  HOVER_SCALE: 1.03,
  IMAGE_HOVER_TRANSITION: "transform 0.4s ease",
  FALLBACK_ASPECT_RATIO: "3/2", // used only for the no-image placeholder box
};

/**
 * Build a CSS `grid-template-columns` value from the "fixed" | "auto" mode.
 */
function buildGridTemplateColumns(mode, columns, minColumnWidth) {
  return mode === "auto"
    ? `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`
    : `repeat(${Math.max(1, Math.floor(columns) || 1)}, 1fr)`;
}

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
  return <Box sx={{ ...skeletonBase, width, height: `${height}px`, ...sx }} />;
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
// (sizing / opacity driven by TEXT_CONFIG.ARTIST_LINK)
// ============================================================
function ArtistNameLink({ name, slug, index, isMobile, fontFamily, textColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const C = TEXT_CONFIG.ARTIST_LINK;
  const color = C.color || TEXT_CONFIG.BASE_COLOR || textColor;
  const fontSize = pickResponsive(C, isMobile, "fontSize");

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
          textDecoration: "none",
          color,
          display: "inline-block",
          position: "relative",
          fontFamily,
          fontSize,
          fontWeight: C.fontWeight,
          lineHeight: C.lineHeight,
          opacity: isHovered ? C.hoverOpacity : C.idleOpacity,
          padding: "2px 0 4px",
          transition: "opacity 0.2s ease",
          outline: "none",
        }}
      >
        {name}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: color,
            transformOrigin: "left",
            pointerEvents: "none",
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

  // Runtime context passed into the textSx() builder
  const ctx = { isMobile, fontFamily, themeText: colors.text };

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

  // Body layout rule:
  //   • primaryParas  → paired 1:1 with gallery images (introduction if it
  //     exists, otherwise description so a description-only show still pairs).
  //   • trailingParas → description shown as plain text AFTER the paired block,
  //     but only when there is a separate introduction above it.
  const primaryParas = introductionParas.length ? introductionParas : descriptionParas;
  const trailingParas = introductionParas.length ? descriptionParas : [];

  // Safely normalize arrays to prevent mapping errors if a string is returned
  const relatedArtworks = useMemo(() => {
    if (!exhibition?.related_artwork_title) return [];
    const raw = Array.isArray(exhibition.related_artwork_title)
      ? exhibition.related_artwork_title
      : [exhibition.related_artwork_title];
    return raw.filter((t) => String(t || "").trim());
  }, [exhibition]);

  const relatedArtists = useMemo(() => {
    if (!exhibition?.related_gallery_artist) return [];
    const raw = Array.isArray(exhibition.related_gallery_artist)
      ? exhibition.related_gallery_artist
      : [exhibition.related_gallery_artist];
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

  // ---- SMART 1:1 PAIRING -----------------------------------
  // Walk paragraphs and images in parallel: paragraph[i] ↔ image[i].
  // Counts don't have to match — we run to the longer of the two and keep
  // BOTH leftovers:
  //   • more paragraphs than images → trailing paragraphs render text-only
  //   • more images than paragraphs → trailing images render image-only
  // Nothing is ever dropped.
  const pairedBody = useMemo(() => {
    const max = Math.max(primaryParas.length, galleryImages.length);
    const rows = [];
    for (let i = 0; i < max; i++) {
      rows.push({
        text: primaryParas[i] ?? null,
        image: galleryImages[i] ?? null,
      });
    }
    return rows;
  }, [primaryParas, galleryImages]);

  // --- Render: loading -------------------------------------
  if (isDataLoading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: colors.background }}>
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
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <SkeletonLine width="60%" height={isMobile ? 22 : 26} />
            <Box sx={{ mt: 1 }}>
              <SkeletonLine width="35%" height={14} />
            </Box>
          </Box>

          <Box sx={{ mb: { xs: 5, md: 8 } }}>
            <SkeletonBlock height={isMobile ? 220 : 400} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <SkeletonLine width="100%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="95%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="88%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="60%" height={14} sx={{ mb: 3 }} />

            <Box sx={{ width: "100%", mb: 4 }}>
              <SkeletonBlock height={isMobile ? 260 : 420} />
            </Box>

            <SkeletonLine width="100%" height={14} sx={{ mb: 1 }} />
            <SkeletonLine width="70%" height={14} />
          </Box>

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

          <Box
            sx={{
              mt: { xs: 8, md: 10 },
              pt: { xs: 4, md: 5 },
              borderTop: `1px solid ${colors.text}`,
              opacity: 0.25,
            }}
          >
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
          message={
            isCn
              ? "加载展览数据时出错，请稍后重试。"
              : "An error occurred while loading exhibition data."
          }
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

  // Pre-build shared sx objects (keeps the JSX below clean)
  const sectionHeadingSx = {
    ...textSx(TEXT_CONFIG.SECTION_HEADING, ctx),
    mb: `${TEXT_CONFIG.SECTION_HEADING.marginBottom}px`,
    pb: "8px",
    borderBottom: `1px solid ${colors.text}`,
    display: "inline-block",
  };

  // --- Render: main UI -------------------------------------
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: colors.background, color: colors.text }}>
      <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 }, py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Header (Title, Subtitle & Date) */}
          <Box
            sx={{
              mb: {
                xs: `${LAYOUT_CONFIG.HEADER_MB_MOBILE}px`,
                md: `${LAYOUT_CONFIG.HEADER_MB_DESKTOP}px`,
              },
            }}
          >
            <Typography
              component="h1"
              sx={{
                ...textSx(TEXT_CONFIG.TITLE, ctx),
                m: 0,
                mb: `${TEXT_CONFIG.TITLE.marginBottom}px`,
              }}
            >
              {TEXT_CONFIG.TITLE.italicizeBeforeColon && exhibitionTitle.includes(":") ? (
                <>
                  <span style={{ fontStyle: "italic" }}>
                    {exhibitionTitle.split(":")[0]}
                  </span>
                  :{exhibitionTitle.split(":").slice(1).join(":")}
                </>
              ) : (
                exhibitionTitle
              )}
            </Typography>

            {/* Subtitle */}
            {exhibition.subtitle && (
              <Typography
                sx={{
                  ...textSx(TEXT_CONFIG.SUBTITLE, ctx),
                  m: 0,
                  mb: `${TEXT_CONFIG.SUBTITLE.marginBottom}px`,
                }}
              >
                {exhibition.subtitle}
              </Typography>
            )}

            {/* Date */}
            {dateRange && (
              <Typography
                sx={{
                  ...textSx(TEXT_CONFIG.DATE, ctx),
                  m: 0,
                  mb: `${TEXT_CONFIG.DATE.marginBottom}px`,
                }}
              >
                {dateRange}
              </Typography>
            )}
          </Box>

          {/* 2. Cover Image & Caption */}
          {finalCoverImageUrl ? (
            <Box
              sx={{
                mb: {
                  xs: `${LAYOUT_CONFIG.COVER_MB_MOBILE}px`,
                  md: `${LAYOUT_CONFIG.COVER_MB_DESKTOP}px`,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  cursor: "zoom-in",
                  backgroundColor: "rgba(0,0,0,0.02)",
                  mb: exhibition.caption ? 1.5 : 0,
                }}
                onClick={() => handleImageClick(finalCoverImageUrl)}
              >
                <img
                  src={finalCoverImageUrl}
                  alt={exhibitionTitle}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
              </Box>
              {exhibition.caption && (
                <Typography
                  sx={{ ...textSx(TEXT_CONFIG.COVER_CAPTION, ctx), whiteSpace: "pre-line", px: 0.5 }}
                >
                  {exhibition.caption.replace(/\\n/g, "\n")}
                </Typography>
              )}
            </Box>
          ) : (
            exhibition.caption && (
              <Box
                sx={{
                  mb: {
                    xs: `${LAYOUT_CONFIG.COVER_MB_MOBILE}px`,
                    md: `${LAYOUT_CONFIG.COVER_MB_DESKTOP}px`,
                  },
                }}
              >
                <Typography sx={{ ...textSx(TEXT_CONFIG.COVER_CAPTION, ctx), whiteSpace: "pre-line" }}>
                  {exhibition.caption.replace(/\\n/g, "\n")}
                </Typography>
              </Box>
            )
          )}

          {/* 3. Body — paragraphs paired 1:1 with gallery images (interleaved) */}
          {pairedBody.length > 0 && (
            <Box sx={{ mt: `${LAYOUT_CONFIG.BODY_MT}px` }}>
              {pairedBody.map((row, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: `${LAYOUT_CONFIG.BODY_BLOCK_GAP}px`,
                    "&:last-of-type": { mb: 0 },
                  }}
                >
                  {/* Paragraph (skipped when this row is image-only) */}
                  {row.text && (
                    <Typography
                      sx={{
                        ...textSx(TEXT_CONFIG.INTRO, ctx),
                        whiteSpace: "pre-line",
                        mb: row.image ? `${LAYOUT_CONFIG.PARA_TO_IMAGE_GAP}px` : 0,
                      }}
                    >
                      {row.text.replace(/\\n/g, "\n")}
                    </Typography>
                  )}

                  {/* Paired image (skipped when this row is text-only) —
                      full-width, so body images never read as small thumbnails. */}
                  {row.image && (
                    <Box sx={{ width: "100%", mt: row.text ? 1 : 0 }}>
                      <Box
                        sx={{
                          width: "100%",
                          cursor: "zoom-in",
                          backgroundColor: "rgba(0,0,0,0.02)",
                        }}
                        onClick={() => handleImageClick(row.image.img_url)}
                      >
                        <img
                          src={row.image.img_url}
                          alt={
                            row.image.caption_en ||
                            row.image.caption_cn ||
                            "Exhibition Image"
                          }
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      {(row.image.caption_en || row.image.caption_cn) && (
                        <Typography
                          sx={{
                            ...textSx(TEXT_CONFIG.IMAGE_CAPTION, ctx),
                            mt: `${TEXT_CONFIG.IMAGE_CAPTION.marginTop}px`,
                            px: 0.5,
                          }}
                        >
                          {isCn ? row.image.caption_cn : row.image.caption_en}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* 3b. Trailing description (only when an introduction exists above) */}
          {trailingParas.length > 0 && (
            <Box
              sx={{
                mt: pairedBody.length
                  ? `${LAYOUT_CONFIG.BODY_BLOCK_GAP}px`
                  : `${LAYOUT_CONFIG.BODY_MT}px`,
              }}
            >
              {trailingParas.map((para, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    ...textSx(TEXT_CONFIG.DESCRIPTION, ctx),
                    whiteSpace: "pre-line",
                    mb: `${TEXT_CONFIG.DESCRIPTION.marginBottom}px`,
                    "&:last-of-type": { mb: 0 },
                  }}
                >
                  {para.replace(/\\n/g, "\n")}
                </Typography>
              ))}
            </Box>
          )}

          {/* 4. Video Player */}
          {exhibition.video_url && (
            <Box
              sx={{
                mt: `${LAYOUT_CONFIG.VIDEO_MT}px`,
                mb: `${LAYOUT_CONFIG.VIDEO_MB}px`,
                position: "relative",
                paddingTop: "56.25%", // 16:9
                width: "100%",
                backgroundColor: "#000",
              }}
            >
              <iframe
                src={exhibition.video_url}
                title="Exhibition Video"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}

          {/* 5. Related Artwork & Gallery Artists */}
          {(matchedArtworks.length > 0 || relatedArtists.length > 0) && (
            <Box
              sx={{
                mt: exhibition.video_url
                  ? 2
                  : {
                      xs: `${LAYOUT_CONFIG.RELATED_MT_MOBILE}px`,
                      md: `${LAYOUT_CONFIG.RELATED_MT_DESKTOP}px`,
                    },
                display: "flex",
                flexDirection: "column",
                gap: `${LAYOUT_CONFIG.RELATED_SECTION_GAP}px`,
              }}
            >
              {/* Works — image-only grid */}
              {matchedArtworks.length > 0 &&
                (() => {
                  const G = MATCHED_ARTWORKS_CONFIG;
                  const mode = isMobile ? G.GRID_MODE_MOBILE : G.GRID_MODE_DESKTOP;
                  const columns = isMobile ? G.GRID_COLUMNS_MOBILE : G.GRID_COLUMNS_DESKTOP;
                  const minColumnWidth = isMobile
                    ? G.GRID_MIN_COLUMN_WIDTH_MOBILE
                    : G.GRID_MIN_COLUMN_WIDTH_DESKTOP;
                  const baseGap = isMobile ? G.GRID_GAP_MOBILE : G.GRID_GAP_DESKTOP;
                  const rowGap =
                    (isMobile ? G.GRID_ROW_GAP_MOBILE : G.GRID_ROW_GAP_DESKTOP) ?? baseGap;
                  const columnGap =
                    (isMobile ? G.GRID_COLUMN_GAP_MOBILE : G.GRID_COLUMN_GAP_DESKTOP) ?? baseGap;
                  const gridTemplateColumns = buildGridTemplateColumns(
                    mode,
                    columns,
                    minColumnWidth
                  );

                  return (
                    <Box>
                      <Typography sx={sectionHeadingSx}>
                        {isCn ? "作品" : "Works"}
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns,
                          columnGap: `${columnGap}px`,
                          rowGap: `${rowGap}px`,
                        }}
                      >
                        {matchedArtworks.map((aw, idx) => (
                          <Link
                            key={aw.id || aw._id || idx}
                            href={`/artworks/${artworkSlug(aw.title)}?artist=${encodeURIComponent(
                              (aw.artist || "").replace(/\s+/g, "-")
                            )}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "block",
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{
                                delay: isMobile ? 0 : (idx % 10) * 0.05,
                                duration: 0.4,
                              }}
                            >
                              {aw.cover_img_url ? (
                                <img
                                  src={aw.cover_img_url}
                                  alt={aw.title || ""}
                                  loading="lazy"
                                  decoding="async"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                    transition: G.IMAGE_HOVER_TRANSITION,
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = `scale(${G.HOVER_SCALE})`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                  }}
                                />
                              ) : (
                                <Box
                                  sx={{
                                    width: "100%",
                                    aspectRatio: G.FALLBACK_ASPECT_RATIO,
                                    backgroundColor: "rgba(0,0,0,0.03)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily,
                                      fontSize: "10px",
                                      opacity: 0.2,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.1em",
                                    }}
                                  >
                                    {isCn ? "无图" : "No Image"}
                                  </Typography>
                                </Box>
                              )}
                            </motion.div>
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  );
                })()}

              {/* Related Artists — underline hover animation */}
              {relatedArtists.length > 0 && (
                <Box>
                  <Typography sx={sectionHeadingSx}>
                    {isCn ? "相关艺术家" : "Related Artists"}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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

          {/* 6. Metadata Info Section — gallery-style info table */}
          {(() => {
            const metadataRows = METADATA_ORDER.map((key) => ({
              key,
              value: exhibition[key],
              label: METADATA_LABELS[key]
                ? isCn
                  ? METADATA_LABELS[key].cn
                  : METADATA_LABELS[key].en
                : key,
            })).filter((row) => row.value);

            if (metadataRows.length === 0) return null;

            return (
              <Box
                sx={{
                  mt: {
                    xs: `${LAYOUT_CONFIG.METADATA_MT_MOBILE}px`,
                    md: `${LAYOUT_CONFIG.METADATA_MT_DESKTOP}px`,
                  },
                  pt: {
                    xs: `${LAYOUT_CONFIG.METADATA_PT_MOBILE}px`,
                    md: `${LAYOUT_CONFIG.METADATA_PT_DESKTOP}px`,
                  },
                  borderTop: `1px solid ${colors.text}`,
                }}
              >
                {metadataRows.map((row, idx) => (
                  <Box
                    key={row.key}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 0.5, sm: 4 },
                      py: {
                        xs: `${LAYOUT_CONFIG.METADATA_ROW_PY_MOBILE}px`,
                        sm: `${LAYOUT_CONFIG.METADATA_ROW_PY_DESKTOP}px`,
                      },
                      borderBottom:
                        idx === metadataRows.length - 1
                          ? "none"
                          : `1px solid ${colors.text}1a`,
                    }}
                  >
                    <Typography
                      sx={{
                        ...textSx(TEXT_CONFIG.METADATA_LABEL, ctx),
                        minWidth: { sm: `${LAYOUT_CONFIG.METADATA_LABEL_MINWIDTH}px` },
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </Typography>
                    <Typography sx={textSx(TEXT_CONFIG.METADATA_VALUE, ctx)}>
                      {row.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })()}
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
