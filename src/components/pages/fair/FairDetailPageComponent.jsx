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
import useFairDetailData from "@/components/pages/fair/hooks/useFairDetailData"; // fair hook
import { useReverseTheme } from "@/hooks/useReverseTheme";

// Alerts / states
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import ErrorState from "@/components/alerts/ErrorState";
import FormAlert from "@/components/alerts/FormAlert";
import NoDataInfo from "@/components/alerts/NoDataInfo";

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
    italicizeBeforeColon: true, // italic on the part before ":"
  },

  SECTION: {
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

  // Press-release body paragraphs (paired 1:1 with gallery images)
  BODY: {
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

  // Shared style for the Works + Related Artists text links (hover underline)
  LINK: {
    fontSizeDesktop: "15px",
    fontSizeMobile: "13px",
    fontWeight: 400,
    color: null,
    idleOpacity: 0.75,
    hoverOpacity: 1,
    lineHeight: 1.5,
    rowGap: 4, // px between links in a list
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
  HEADER_MB_DESKTOP: 48, // gap under the title/section/date block
  HEADER_MB_MOBILE: 32,

  COVER_MB_DESKTOP: 64, // gap under the cover image
  COVER_MB_MOBILE: 40,

  BODY_MT: 32, // gap above the body text
  BODY_BLOCK_GAP: 32, // gap between each (paragraph + image) block
  PARA_TO_IMAGE_GAP: 8, // gap between a paragraph and the image paired to it

  VIDEO_MT: 48,
  VIDEO_MB: 48,

  RELATED_MT_DESKTOP: 48, // gap above the Works/Artists area
  RELATED_MT_MOBILE: 48,
  RELATED_SECTION_GAP: 48, // gap between the Works list and the Artists list

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
// Hover-underline text link (shared by Works + Related Artists),
// sizing / opacity driven by TEXT_CONFIG.LINK
// ============================================================
function HoverUnderlineLink({ label, href, index, isMobile, fontFamily, textColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const C = TEXT_CONFIG.LINK;
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
        href={href}
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
        {label}
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
          {/* Header: title + section + date */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <SkeletonLine
              width={isMobile ? "180px" : "320px"}
              height={isMobile ? 22 : 26}
              style={{ marginBottom: "8px" }}
            />
            <SkeletonLine width="120px" height={16} style={{ marginBottom: "8px", opacity: 0.7 }} />
            <SkeletonLine width="200px" height={14} style={{ opacity: 0.9 }} />
          </Box>

          {/* Cover image */}
          <Box sx={{ mb: { xs: 5, md: 8 } }}>
            <SkeletonBlock width="100%" height={0} style={{ paddingBottom: "56%", marginBottom: "12px" }} />
            <SkeletonLine width="60%" height={13} />
          </Box>

          {/* Press release paragraphs + a paired image placeholder */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "18px", mb: 4 }}>
            <SkeletonLine width="100%" height={14} />
            <SkeletonLine width="95%" height={14} />
            <SkeletonLine width="88%" height={14} />
            <SkeletonLine width="72%" height={14} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <SkeletonBlock width="100%" height={0} style={{ paddingBottom: "56%" }} />
          </Box>

          {/* Related works / artists */}
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

  // Runtime context passed into the textSx() builder
  const ctx = { isMobile, fontFamily, themeText: colors.text };

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
    formatSimpleDateRange(fair?.date_start, fair?.date_end) || fair?.vip_preview_date;

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

  // ---- SMART 1:1 PAIRING -----------------------------------
  // press-release paragraph[i] ↔ gallery image[i], interleaved. Runs to the
  // longer of the two and keeps BOTH leftovers:
  //   • more paragraphs than images → trailing paragraphs render text-only
  //   • more images than paragraphs → trailing images render image-only
  // Nothing is ever dropped.
  const pairedBody = useMemo(() => {
    const max = Math.max(pressReleaseParas.length, galleryImages.length);
    const rows = [];
    for (let i = 0; i < max; i++) {
      rows.push({
        text: pressReleaseParas[i] ?? null,
        image: galleryImages[i] ?? null,
      });
    }
    return rows;
  }, [pressReleaseParas, galleryImages]);

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
          message={
            isCn ? "加载博览会数据时出错，请稍后重试。" : "An error occurred while loading fair data."
          }
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

  // Pre-built shared heading sx
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
          {/* 1. Header (Title, Section & Date) */}
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
              {TEXT_CONFIG.TITLE.italicizeBeforeColon && fairTitle.includes(":") ? (
                <>
                  <span style={{ fontStyle: "italic" }}>{fairTitle.split(":")[0]}</span>
                  :{fairTitle.split(":").slice(1).join(":")}
                </>
              ) : (
                fairTitle
              )}
            </Typography>

            {/* Section (if present) */}
            {fair.section && (
              <Typography
                sx={{
                  ...textSx(TEXT_CONFIG.SECTION, ctx),
                  whiteSpace: "pre-line",
                  m: 0,
                  mb: `${TEXT_CONFIG.SECTION.marginBottom}px`,
                }}
              >
                {fair.section.replace(/\\n/g, "\n")}
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
                  mb: fair.caption ? 1.5 : 0,
                }}
                onClick={() => handleImageClick(finalCoverImageUrl)}
              >
                <img
                  src={finalCoverImageUrl}
                  alt={fairTitle}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
              </Box>
              {fair.caption && (
                <Typography
                  sx={{ ...textSx(TEXT_CONFIG.COVER_CAPTION, ctx), whiteSpace: "pre-line", px: 0.5 }}
                >
                  {fair.caption.replace(/\\n/g, "\n")}
                </Typography>
              )}
            </Box>
          ) : (
            fair.caption && (
              <Box
                sx={{
                  mb: {
                    xs: `${LAYOUT_CONFIG.COVER_MB_MOBILE}px`,
                    md: `${LAYOUT_CONFIG.COVER_MB_DESKTOP}px`,
                  },
                }}
              >
                <Typography sx={{ ...textSx(TEXT_CONFIG.COVER_CAPTION, ctx), whiteSpace: "pre-line" }}>
                  {fair.caption.replace(/\\n/g, "\n")}
                </Typography>
              </Box>
            )
          )}

          {/* 3. Press Release — paragraphs paired 1:1 with gallery images */}
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
                        ...textSx(TEXT_CONFIG.BODY, ctx),
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
                          alt={row.image.caption_en || row.image.caption_cn || "Fair Image"}
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

          {/* 4. Video Player */}
          {fair.video_url && (
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
                src={fair.video_url}
                title="Fair Video"
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
          {(relatedArtworks.length > 0 || relatedArtists.length > 0) && (
            <Box
              sx={{
                mt: fair.video_url
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
              {/* Works */}
              {relatedArtworks.length > 0 && (
                <Box>
                  <Typography sx={sectionHeadingSx}>{isCn ? "作品" : "Works"}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: `${TEXT_CONFIG.LINK.rowGap}px`,
                    }}
                  >
                    {relatedArtworks.map((work, idx) => (
                      <HoverUnderlineLink
                        key={`work-${idx}`}
                        label={work}
                        href={`/artworks?title=${encodeURIComponent(work)}`}
                        index={idx}
                        isMobile={isMobile}
                        fontFamily={fontFamily}
                        textColor={colors.text}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Related Artists */}
              {relatedArtists.length > 0 && (
                <Box>
                  <Typography sx={sectionHeadingSx}>
                    {isCn ? "相关艺术家" : "Related Artists"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: `${TEXT_CONFIG.LINK.rowGap}px`,
                    }}
                  >
                    {relatedArtists.map((artist, idx) => (
                      <HoverUnderlineLink
                        key={`artist-${idx}`}
                        label={artist}
                        href={`/artist/${encodeURIComponent(artist.replace(/\s+/g, "-"))}`}
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
              value: fair[key],
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
        title={fairTitle}
        enableGifRestart={true}
      />
    </Box>
  );
}
