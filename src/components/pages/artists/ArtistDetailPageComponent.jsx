"use client";

import React, { useContext, useState, useCallback, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import AlertInfo from "@/components/alerts/AlertInfo";
import useArtistDetailData from "@/components/pages/artists/hooks/useArtistDetailData";
import PDFViewer from "@/components/others/PDFViewer";
import { useAsyncAction } from "@/hooks/useAsyncAction";

const PDFViewerButton = ({
  pdfUrl = "",
  buttonText = { cn: "下载简历", en: "Download Resume" },
  colors = { text: "#000000", background: "#ffffff" },
  fontFamily = "inherit",
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCn } = useContext(LanguageContext);

  const handlePDFOpen = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!pdfUrl) {
        alert(isCn ? "暂无简历文件" : "No resume file available");
        return;
      }
      setIsOpen(true);
    },
    [pdfUrl, isCn]
  );

  const handlePDFClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isDisabled = false;

  return (
    <>
      <button
        type="button"
        onClick={handlePDFOpen}
        disabled={isDisabled}
        style={{
          fontSize: "12px",
          padding: "8px 16px",
          backgroundColor: "transparent",
          border: `1px solid ${colors.text}`,
          color: isDisabled ? `${colors.text}50` : colors.text,
          cursor: isDisabled ? "not-allowed" : "pointer",
          fontFamily,
          transition: "all 0.2s ease",
          pointerEvents: "auto",
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.target.style.backgroundColor = `${colors.text}10`;
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        {isCn ? buttonText.cn : buttonText.en}
      </button>

      <PDFViewer
        isOpen={isOpen}
        onClose={handlePDFClose}
        pdfUrl={pdfUrl}
        colors={colors}
        fontFamily={fontFamily}
        isCn={isCn}
      />
    </>
  );
};

// ============================================================================
// 🎨 ARTIST DETAIL PAGE — DESIGN CONFIGURATION
// ============================================================================
const CONFIG = {
  PAGE: {
    PADDING_HORIZONTAL: 50,
    PADDING_HORIZONTAL_MOBILE: 20,
    PADDING_TOP_DESKTOP: 40,
    PADDING_TOP_MOBILE: 32,
    PADDING_BOTTOM: 120,
    OFFSET_TOP: 0,
    MAX_WIDTH: 1600,
    CONTENT_OFFSET_LEFT: 28,
    CONTENT_OFFSET_LEFT_MOBILE: 0,
  },

  HEADING: {
    FONT_SIZE_DESKTOP: "30px",
    FONT_SIZE_MOBILE: "24px",
    FONT_WEIGHT: 600,
    LETTER_SPACING: "0.01em",
    LINE_HEIGHT: 1.2,
    COLOR: null,
    MARGIN_BOTTOM: 40,
    OFFSET_TOP: 0,
  },

  BIO: {
    COLUMN_WIDTH: "38%",
    COLUMN_MAX_WIDTH: 520,
    FONT_SIZE_DESKTOP: "17px",
    FONT_SIZE_MOBILE: "15px",
    FONT_WEIGHT: 300,
    LINE_HEIGHT: 1.75,
    LETTER_SPACING: "0.01em",
    COLOR: null,
    OPACITY: 0.9,
    PARAGRAPH_GAP: 28,
  },

  ARTWORK: {
    COLUMN_GAP: "7%",
    IMAGE_MAX_HEIGHT: "78vh",
    IMAGE_TO_CAPTION_GAP: 18,
    STICKY_TOP: 90,
  },

  CAPTION: {
    FONT_SIZE_DESKTOP: "15px",
    FONT_SIZE_MOBILE: "13px",
    FONT_WEIGHT: 400,
    LETTER_SPACING: "0.02em",
    LINE_HEIGHT: 1.7,
    COLOR: null,
    OPACITY: 0.55,
    LINE_GAP: 2,
    TITLE_ITALIC: true,
  },

  // ==========================================================================
  // 🔧 RELATED ARTWORKS GRID — fully configurable, production-level.
  //
  // Two independent modes, set separately for DESKTOP and MOBILE:
  //
  //   "fixed"  → You set an exact number of columns (GRID_COLUMNS_*).
  //              Every box is the SAME width on every row — a real CSS
  //              grid with fixed column tracks. If the LAST row has
  //              fewer artworks than the column count (e.g. 3 artworks
  //              left over in a 4-column grid), those boxes stay the
  //              exact same width as every other row; the leftover
  //              cell(s) are simply left empty rather than being
  //              stretched to fill the row (stretching would make the
  //              last row's boxes a different size than the rest of the
  //              grid, which looks inconsistent).
  //
  //   "auto"   → No fixed count. The browser fits as many columns as it
  //              can, each at least GRID_MIN_COLUMN_WIDTH_* wide, and
  //              reflows automatically as the viewport resizes (classic
  //              responsive grid, no JS breakpoints needed).
  //
  // GRID_GAP is the default spacing (px) between every artwork box, both
  // horizontally and vertically. Override GRID_ROW_GAP / GRID_COLUMN_GAP
  // individually if you want different horizontal vs. vertical spacing.
  // ==========================================================================
  RELATED: {
    HEADING_FONT_SIZE: "14px",
    HEADING_FONT_WEIGHT: 600,
    HEADING_LETTER_SPACING: "0.05em",
    HEADING_TEXT_TRANSFORM: "uppercase",
    HEADING_MARGIN_BOTTOM: 36,
    SECTION_TOP_GAP_DESKTOP: 110,
    SECTION_TOP_GAP_MOBILE: 64,

    // ---- Desktop grid ----
    GRID_MODE_DESKTOP: "fixed", // "fixed" | "auto"
    GRID_COLUMNS_DESKTOP: 4, // used when GRID_MODE_DESKTOP === "fixed"
    GRID_MIN_COLUMN_WIDTH_DESKTOP: 250, // used when GRID_MODE_DESKTOP === "auto"

    // ---- Mobile grid ----
    GRID_MODE_MOBILE: "fixed", // "fixed" | "auto"
    GRID_COLUMNS_MOBILE: 2, // used when GRID_MODE_MOBILE === "fixed"
    GRID_MIN_COLUMN_WIDTH_MOBILE: 150, // used when GRID_MODE_MOBILE === "auto"

    // ---- Spacing (px) ----
    GRID_GAP: 14, // default gap used for both rows and columns
    GRID_ROW_GAP: null, // set a number to override GRID_GAP vertically
    GRID_COLUMN_GAP: null, // set a number to override GRID_GAP horizontally

    // ---- Card content styling ----
    IMAGE_TO_TEXT_GAP: "12px",
    CARD_FONT_SIZE_DESKTOP: "12px",
    CARD_FONT_SIZE_MOBILE: "11px",
    CARD_LETTER_SPACING: "0.02em",
    CARD_LINE_HEIGHT: 1.5,
    CARD_META_OPACITY: 0.5,
    HOVER_SCALE: 1.03,
    UNDERLINE_DURATION: 0.25,
  },

  COLLECTIONS: {
    SECTION_TOP_GAP_DESKTOP: 90,
    SECTION_TOP_GAP_MOBILE: 56,
    HEADING_FONT_SIZE: "14px",
    HEADING_FONT_WEIGHT: 600,
    HEADING_LETTER_SPACING: "0.05em",
    HEADING_TEXT_TRANSFORM: "uppercase",
    HEADING_MARGIN_BOTTOM: 28,
    CARD_GAP: 10,
    CARD_FONT_SIZE_DESKTOP: "15px",
    CARD_FONT_SIZE_MOBILE: "13px",
    CARD_LINE_HEIGHT: 1.5,
    CARD_OPACITY: 0.75,
    DATE_FONT_SIZE_DESKTOP: "12px",
    DATE_FONT_SIZE_MOBILE: "11px",
    DATE_OPACITY: 0.5,
    HOVER_OPACITY: 1,
    TRANSITION_DURATION: 0.2,
  },
};

// ============================================================================
// Helpers
// ============================================================================
const makeSlug = (t = "") =>
  t
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\p{L}\p{N}-]/gu, "");

const artistHref = (title, artistName) =>
  `/artworks/${makeSlug(title)}?artist=${encodeURIComponent(
    (artistName || "").replace(/\s+/g, "-")
  )}`;

/**
 * 🔧 De-duplicate artworks by a full content signature.
 *
 * Two artwork records are only considered the SAME artwork (and merged)
 * when title, year, size, AND cover_img_url are ALL identical. If any one
 * of those four fields differs — e.g. the same title but a different
 * `size` — they are treated as distinct artworks and BOTH are kept.
 */
function dedupeArtworks(list = []) {
  const seen = new Set();
  const result = [];

  for (const aw of list || []) {
    if (!aw) continue;

    const contentKey = [
      String(aw.title || "").trim().toLowerCase(),
      String(aw.year || "").trim(),
      String(aw.size || "").trim(),
      String(aw.cover_img_url || aw.image_url || "").trim(),
    ].join("|");

    const key = `content:${contentKey}`;

    if (seen.has(key)) continue;

    seen.add(key);
    result.push(aw);
  }

  return result;
}

// ============================================================================
// Collection section (Exhibitions / Fairs / Events)
// ============================================================================
const makeExhibitionSlug = (title) =>
  String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\p{L}\p{N}-]/gu, "");

const formatDate = (start, end) => {
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  return start || end;
};

const CollectionItem = memo(function CollectionItem({
  item,
  index,
  label,
  hrefPrefix,
  isCn,
  isMobile,
  textColor,
  bioFont,
  metaFont,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const C = CONFIG.COLLECTIONS;
  const title = item?.title || (isCn ? "无题" : "Untitled");
  const date = formatDate(item?.date_start, item?.date_end);
  const venue = item?.venue || item?.location || "";
  const slug = makeExhibitionSlug(title);
  const href = hrefPrefix ? `${hrefPrefix}/${slug}` : "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: isMobile ? 0 : index * 0.04, duration: 0.4 }}
      style={{ marginBottom: `${C.CARD_GAP}px` }}
    >
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          textDecoration: "none",
          color: textColor,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "baseline",
          gap: isMobile ? "2px" : "16px",
          opacity: isHovered ? C.HOVER_OPACITY : C.CARD_OPACITY,
          transition: `opacity ${C.TRANSITION_DURATION}s ease`,
        }}
      >
        <span
          style={{
            position: "relative",
            display: "inline-block",
            fontFamily: bioFont,
            fontSize: isMobile
              ? C.CARD_FONT_SIZE_MOBILE
              : C.CARD_FONT_SIZE_DESKTOP,
            lineHeight: C.CARD_LINE_HEIGHT,
            fontStyle: "italic",
          }}
        >
          {title}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{
              duration: CONFIG.RELATED.UNDERLINE_DURATION,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: textColor,
              transformOrigin: "left",
              pointerEvents: "none",
            }}
          />
        </span>
        <span
          style={{
            fontFamily: metaFont,
            fontSize: isMobile
              ? C.DATE_FONT_SIZE_MOBILE
              : C.DATE_FONT_SIZE_DESKTOP,
            opacity: C.DATE_OPACITY,
            whiteSpace: "nowrap",
          }}
        >
          {[date, venue].filter(Boolean).join(", ")}
        </span>
      </Link>
    </motion.div>
  );
});

const CollectionSection = memo(function CollectionSection({
  label,
  items,
  hrefPrefix,
  isCn,
  isMobile,
  textColor,
  sectionFont,
  bioFont,
  metaFont,
}) {
  const C = CONFIG.COLLECTIONS;

  return (
    <div
      style={{
        marginTop: `${
          isMobile
            ? C.SECTION_TOP_GAP_MOBILE
            : C.SECTION_TOP_GAP_DESKTOP
        }px`,
      }}
    >
      <h2
        style={{
          fontFamily: sectionFont,
          fontSize: C.HEADING_FONT_SIZE,
          fontWeight: C.HEADING_FONT_WEIGHT,
          letterSpacing: C.HEADING_LETTER_SPACING,
          textTransform: C.HEADING_TEXT_TRANSFORM,
          color: textColor,
          margin: `0 0 ${C.HEADING_MARGIN_BOTTOM}px`,
        }}
      >
        {label}
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <CollectionItem
            key={item.id || item._id || i}
            item={item}
            index={i}
            label={label}
            hrefPrefix={hrefPrefix}
            isCn={isCn}
            isMobile={isMobile}
            textColor={textColor}
            bioFont={bioFont}
            metaFont={metaFont}
          />
        ))}
      </div>
    </div>
  );
});

// ============================================================================
// Caption block under the featured artwork (reference style)
// ============================================================================
const ArtworkCaption = memo(function ArtworkCaption({
  artwork,
  artistName,
  isMobile,
  textColor,
  captionFont,
  metaFont,
  isCn,
}) {
  const C = CONFIG.CAPTION;
  const color = C.COLOR ?? textColor;

  const lineStyle = {
    fontSize: isMobile ? C.FONT_SIZE_MOBILE : C.FONT_SIZE_DESKTOP,
    fontWeight: C.FONT_WEIGHT,
    letterSpacing: C.LETTER_SPACING,
    lineHeight: C.LINE_HEIGHT,
    color,
    opacity: C.OPACITY,
    margin: 0,
    paddingTop: `${C.LINE_GAP}px`,
  };

  const dimensions = [artwork?.medium, artwork?.dimensions]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={{ marginTop: `${CONFIG.ARTWORK.IMAGE_TO_CAPTION_GAP}px` }}>
      <p style={{ ...lineStyle, fontFamily: captionFont, paddingTop: 0 }}>
        {artistName}
      </p>
      {artwork?.title && (
        <p
          style={{
            ...lineStyle,
            fontFamily: captionFont,
            fontStyle: C.TITLE_ITALIC ? "italic" : "normal",
          }}
        >
          {artwork.title}
        </p>
      )}
      {artwork?.year && (
        <p style={{ ...lineStyle, fontFamily: metaFont }}>{artwork.year}</p>
      )}
      {dimensions && (
        <p style={{ ...lineStyle, fontFamily: metaFont }}>{dimensions}</p>
      )}
    </div>
  );
});

// ============================================================================
// Related artwork card
// (Spacing between cards is now controlled entirely by the parent grid/row
// container — see the Related Artworks render section below — so this card
// no longer sets its own margin or masonry break rules.)
// ============================================================================
const RelatedArtworkCard = memo(function RelatedArtworkCard({
  artwork,
  index,
  artistName,
  textColor,
  captionFont,
  metaFont,
  isCn,
  isMobile,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const R = CONFIG.RELATED;

  const cardFontSize = isMobile
    ? R.CARD_FONT_SIZE_MOBILE
    : R.CARD_FONT_SIZE_DESKTOP;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: isMobile ? 0 : (index % 10) * 0.05, duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <Link
        href={artistHref(artwork.title, artistName)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            marginBottom: R.IMAGE_TO_TEXT_GAP,
            backgroundColor: "rgba(0,0,0,0.03)",
            overflow: "hidden",
          }}
        >
          {artwork.cover_img_url ? (
            <img
              src={artwork.cover_img_url}
              alt={artwork.title || ""}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transform: isHovered ? `scale(${R.HOVER_SCALE})` : "scale(1)",
                transition: "transform 0.4s ease-in-out",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "3/2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: metaFont,
                  fontSize: "11px",
                  color: textColor,
                  opacity: 0.3,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {isCn ? "无图" : "No Image"}
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: cardFontSize,
            color: textColor,
            lineHeight: R.CARD_LINE_HEIGHT,
            letterSpacing: R.CARD_LETTER_SPACING,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <span style={{ fontFamily: captionFont, opacity: 0.9 }}>
            {artistName}
          </span>

          <div
            style={{
              display: "inline-block",
              position: "relative",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontFamily: captionFont,
                fontStyle: "italic",
                opacity: 0.85,
              }}
            >
              {artwork.title || (isCn ? "无题" : "Untitled")}
              {artwork.year && (
                <span style={{ fontStyle: "normal" }}>, {artwork.year}</span>
              )}
            </span>
            <motion.span
              aria-hidden
              initial={false}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: R.UNDERLINE_DURATION, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: textColor,
                transformOrigin: "left",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: metaFont,
              opacity: R.CARD_META_OPACITY,
              marginTop: "2px",
            }}
          >
            {[artwork.medium, artwork.dimensions].filter(Boolean).join(" · ")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
});

// ============================================================================
// Related Artworks grid — renders either the "fixed" (row-chunked, last row
// stretches) or "auto" (CSS grid auto-fill) layout based on CONFIG.RELATED.
// ============================================================================
function RelatedArtworksGrid({
  artworks,
  artistName,
  textColor,
  captionFont,
  metaFont,
  isCn,
  isMobile,
}) {
  const R = CONFIG.RELATED;

  const mode = isMobile ? R.GRID_MODE_MOBILE : R.GRID_MODE_DESKTOP;
  const columns = isMobile ? R.GRID_COLUMNS_MOBILE : R.GRID_COLUMNS_DESKTOP;
  const minColumnWidth = isMobile
    ? R.GRID_MIN_COLUMN_WIDTH_MOBILE
    : R.GRID_MIN_COLUMN_WIDTH_DESKTOP;

  const rowGap = R.GRID_ROW_GAP ?? R.GRID_GAP;
  const columnGap = R.GRID_COLUMN_GAP ?? R.GRID_GAP;

  // Both modes render as a real CSS grid, which is what keeps every box
  // the same width on every row automatically — grid column TRACKS are
  // fixed once for the whole grid, so a short last row never stretches
  // its items to a different size than the rows above it. The only
  // difference between the two modes is how the column tracks are
  // defined:
  //   "fixed" → an exact number of equal tracks (repeat(N, 1fr))
  //   "auto"  → as many tracks as fit, each at least minColumnWidth wide
  const gridTemplateColumns =
    mode === "auto"
      ? `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`
      : `repeat(${Math.max(1, Math.floor(columns) || 1)}, 1fr)`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns,
        columnGap: `${columnGap}px`,
        rowGap: `${rowGap}px`,
      }}
    >
      {artworks.map((aw, i) => (
        <RelatedArtworkCard
          key={aw.id || aw._id || i}
          artwork={aw}
          index={i}
          artistName={artistName}
          textColor={textColor}
          captionFont={captionFont}
          metaFont={metaFont}
          isCn={isCn}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Artist Detail Skeleton — matches page layout
// ============================================================================
const artistShimmerStyle = {
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.15) 37%, rgba(0,0,0,0.06) 63%)",
  backgroundSize: "400px 100%",
  animation: "awd-shimmer 1.2s ease infinite",
  borderRadius: "2px",
};

function ArtistDetailSkeleton({ isMobile }) {
  const { colors } = useReverseTheme();
  const textColor = colors.text;
  const bgColor = colors.background;
  const contentOffsetLeft = isMobile ? 0 : CONFIG.PAGE.CONTENT_OFFSET_LEFT;
  const px = isMobile
    ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE + contentOffsetLeft
    : CONFIG.PAGE.PADDING_HORIZONTAL + contentOffsetLeft;

  const R = CONFIG.RELATED;
  const skeletonColumns = isMobile ? R.GRID_COLUMNS_MOBILE : R.GRID_COLUMNS_DESKTOP;
  const skeletonGap = R.GRID_GAP;
  const skeletonCount = isMobile ? skeletonColumns * 2 : skeletonColumns * 2;

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
      <div
        style={{
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
      <div
        style={{
          boxSizing: "border-box",
          maxWidth: `${CONFIG.PAGE.MAX_WIDTH}px`,
          margin: "0 auto",
          paddingTop: `${isMobile ? CONFIG.PAGE.PADDING_TOP_MOBILE : CONFIG.PAGE.PADDING_TOP_DESKTOP}px`,
          paddingBottom: `${CONFIG.PAGE.PADDING_BOTTOM}px`,
          paddingLeft: `${px}px`,
          paddingRight: `${isMobile ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE : CONFIG.PAGE.PADDING_HORIZONTAL}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            gap: isMobile ? "48px" : CONFIG.ARTWORK.COLUMN_GAP,
          }}
        >
          <div
            style={{
              flex: isMobile ? "none" : `0 0 ${CONFIG.BIO.COLUMN_WIDTH}`,
              maxWidth: isMobile ? "100%" : `${CONFIG.BIO.COLUMN_MAX_WIDTH}px`,
            }}
          >
            <div
              style={{
                ...artistShimmerStyle,
                width: "70%",
                height: isMobile ? "24px" : "30px",
                marginBottom: "40px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ ...artistShimmerStyle, width: "100%", height: "14px" }} />
              <div style={{ ...artistShimmerStyle, width: "95%", height: "14px" }} />
              <div style={{ ...artistShimmerStyle, width: "85%", height: "14px" }} />
              <div style={{ ...artistShimmerStyle, width: "70%", height: "14px" }} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                ...artistShimmerStyle,
                width: "100%",
                paddingBottom: "75%",
                borderRadius: "0",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: isMobile ? "64px" : "110px" }}>
          <div
            style={{
              ...artistShimmerStyle,
              width: "140px",
              height: "14px",
              marginBottom: "36px",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${skeletonColumns}, 1fr)`,
              columnGap: `${skeletonGap}px`,
              rowGap: `${isMobile ? 16 : 40}px`,
            }}
          >
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i}>
                <div
                  style={{
                    ...artistShimmerStyle,
                    width: "100%",
                    paddingBottom: "100%",
                    marginBottom: "12px",
                    borderRadius: "0",
                  }}
                />
                <div style={{ ...artistShimmerStyle, width: "60%", height: "10px", marginBottom: "6px" }} />
                <div style={{ ...artistShimmerStyle, width: "85%", height: "11px", marginBottom: "4px" }} />
                <div style={{ ...artistShimmerStyle, width: "45%", height: "10px" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "90px" }}>
          <div style={{ ...artistShimmerStyle, width: "120px", height: "14px", marginBottom: "28px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                <div style={{ ...artistShimmerStyle, width: `${50 + Math.random() * 30}%`, height: "15px" }} />
                <div style={{ ...artistShimmerStyle, width: "80px", height: "12px" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Page component
// ============================================================================
export default function ArtistDetailPageComponent({ artistSlug }) {
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { colors } = useReverseTheme();

  const { fontFamily: headingFont } = useFont("artistName");
  const { fontFamily: bioFont } = useFont("artistBio");
  const { fontFamily: captionFont } = useFont("artworkCardCaption");
  const { fontFamily: metaFont } = useFont("artworkCardMeta");
  const { fontFamily: sectionFont } = useFont("artistWorksHeading");

  const textColor = colors.text;
  const bgColor = colors.background;

  const artistName = decodeURIComponent(artistSlug || "").replace(/[-_]/g, " ");

  const { profile, artworks, exhibitions, fairs, events, isLoading, hasError, refetch, notFound } =
    useArtistDetailData(artistName, isCn);

  // 🛡️ 使用 useAsyncAction 包装 refetch，防止快速重复点击"重试"按钮
  const { execute: safeRefetch, isExecuting: isRefetching } = useAsyncAction(
    async () => {
      await refetch();
    },
    {
      throttleMs: 1000,
      onError: (err) => {
        console.warn("Refetch failed:", err);
      },
    }
  );

  if (isLoading) return <ArtistDetailSkeleton isMobile={isMobile} />;

  if (hasError) {
    return (
      <AlertInfo
        message={isCn ? "加载失败" : "Loading Failed"}
        subMessage={isCn ? "请重试" : "Please retry"}
        buttonText={isCn ? "重试" : "Retry"}
        onBack={safeRefetch}
        isCn={isCn}
      />
    );
  }

  if (notFound || !profile) {
    return (
      <div
        style={{
          backgroundColor: bgColor,
          color: textColor,
          minHeight: "100vh",
          padding: "120px 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: bioFont,
            fontSize: "14px",
            opacity: 0.4,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {isCn ? "未找到艺术家" : "Artist not found"}
        </p>
      </div>
    );
  }

  // 🔧 De-duplicate ALL artworks once, up front, using the full
  // title + year + size + cover_img_url signature.
  const dedupedArtworks = dedupeArtworks(artworks);

  const withImages = dedupedArtworks.filter((aw) => aw.cover_img_url);

  // Featured artwork = first artwork with an image (shown big, right column).
  const featured = withImages[0] || null;

  // Related grid uses the SAME de-duplicated list (no repeats possible now).
  const related = dedupedArtworks;

  const contentOffsetLeft = isMobile
    ? CONFIG.PAGE.CONTENT_OFFSET_LEFT_MOBILE
    : CONFIG.PAGE.CONTENT_OFFSET_LEFT;

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
      <div
        style={{
          boxSizing: "border-box",
          maxWidth: `${CONFIG.PAGE.MAX_WIDTH}px`,
          margin: "0 auto",
          marginTop: `${CONFIG.PAGE.OFFSET_TOP}px`,
          paddingTop: `${
            isMobile ? CONFIG.PAGE.PADDING_TOP_MOBILE : CONFIG.PAGE.PADDING_TOP_DESKTOP
          }px`,
          paddingBottom: `${CONFIG.PAGE.PADDING_BOTTOM}px`,
          paddingLeft: `${
            (isMobile
              ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE
              : CONFIG.PAGE.PADDING_HORIZONTAL) + contentOffsetLeft
          }px`,
          paddingRight: `${
            isMobile
              ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE
              : CONFIG.PAGE.PADDING_HORIZONTAL
          }px`,
        }}
      >
        {/* ══ TOP: Bio (left) + Featured artwork with caption (right) ══ */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            gap: isMobile ? "48px" : CONFIG.ARTWORK.COLUMN_GAP,
          }}
        >
          <div
            style={{
              flex: isMobile ? "none" : `0 0 ${CONFIG.BIO.COLUMN_WIDTH}`,
              maxWidth: isMobile ? "100%" : `${CONFIG.BIO.COLUMN_MAX_WIDTH}px`,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: headingFont,
                fontSize: isMobile
                  ? CONFIG.HEADING.FONT_SIZE_MOBILE
                  : CONFIG.HEADING.FONT_SIZE_DESKTOP,
                fontWeight: CONFIG.HEADING.FONT_WEIGHT,
                letterSpacing: CONFIG.HEADING.LETTER_SPACING,
                lineHeight: CONFIG.HEADING.LINE_HEIGHT,
                color: CONFIG.HEADING.COLOR ?? textColor,
                margin: `0 0 ${CONFIG.HEADING.MARGIN_BOTTOM}px`,
                position: "relative",
                top: `${CONFIG.HEADING.OFFSET_TOP}px`,
              }}
            >
              {profile.artist}
            </motion.h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${CONFIG.BIO.PARAGRAPH_GAP}px`,
              }}
            >
              {[profile.caption, ...(profile.introductions || [])]
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: bioFont,
                      fontSize: isMobile
                        ? CONFIG.BIO.FONT_SIZE_MOBILE
                        : CONFIG.BIO.FONT_SIZE_DESKTOP,
                      fontWeight: CONFIG.BIO.FONT_WEIGHT,
                      lineHeight: CONFIG.BIO.LINE_HEIGHT,
                      letterSpacing: CONFIG.BIO.LETTER_SPACING,
                      color: CONFIG.BIO.COLOR ?? textColor,
                      opacity: CONFIG.BIO.OPACITY,
                      margin: 0,
                    }}
                  >
                    {para.replace(/\\n/g, "\n")}
                  </p>
                ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <PDFViewerButton pdfUrl={profile.pdf_url} />
            </div>
          </div>

          {/* ── Right column: featured artwork + gray caption below ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                position: isMobile ? "static" : "sticky",
                top: `${CONFIG.ARTWORK.STICKY_TOP}px`,
              }}
            >
              {featured ? (
                // 🔧 `display: inline-block` shrink-wraps this wrapper to
                // the image's REAL rendered width (the <img> below uses
                // width/height: "auto" with maxWidth/maxHeight caps), so
                // the caption block underneath always inherits that exact
                // width and its left edge lines up with the image's left
                // edge, for any image size.
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    verticalAlign: "top",
                  }}
                >
                  <Link
                    href={artistHref(featured.title, profile.name)}
                    style={{ display: "block", textDecoration: "none" }}
                    aria-label={featured.title || profile.name}
                  >
                    <img
                      src={featured.cover_img_url}
                      alt={featured.title || profile.name}
                      decoding="async"
                      draggable={false}
                      style={{
                        display: "block",
                        width: "auto",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: CONFIG.ARTWORK.IMAGE_MAX_HEIGHT,
                        objectFit: "contain",
                        objectPosition: "left top",
                      }}
                    />
                  </Link>

                  <ArtworkCaption
                    artwork={featured}
                    artistName={profile.name}
                    isMobile={isMobile}
                    textColor={textColor}
                    captionFont={captionFont}
                    metaFont={metaFont}
                    isCn={isCn}
                  />
                </motion.div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: metaFont,
                      fontSize: "11px",
                      color: textColor,
                      opacity: 0.3,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {isCn ? "暂无展示图片" : "No images available"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ BOTTOM: Related artworks grid ══ */}
        {related.length > 0 && (
          <div
            style={{
              marginTop: `${
                isMobile
                  ? CONFIG.RELATED.SECTION_TOP_GAP_MOBILE
                  : CONFIG.RELATED.SECTION_TOP_GAP_DESKTOP
              }px`,
            }}
          >
            <h2
              style={{
                fontFamily: sectionFont,
                fontSize: CONFIG.RELATED.HEADING_FONT_SIZE,
                fontWeight: CONFIG.RELATED.HEADING_FONT_WEIGHT,
                letterSpacing: CONFIG.RELATED.HEADING_LETTER_SPACING,
                textTransform: CONFIG.RELATED.HEADING_TEXT_TRANSFORM,
                color: textColor,
                margin: `0 0 ${CONFIG.RELATED.HEADING_MARGIN_BOTTOM}px`,
              }}
            >
              {isCn ? "相关作品" : "Related Artworks"}
            </h2>

            <RelatedArtworksGrid
              artworks={related}
              artistName={profile.name}
              textColor={textColor}
              captionFont={captionFont}
              metaFont={metaFont}
              isCn={isCn}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* ══ Exhibitions ══ */}
        {exhibitions.length > 0 && (
          <CollectionSection
            label={isCn ? "展览" : "Exhibitions"}
            items={exhibitions}
            hrefPrefix="/exhibitions"
            isCn={isCn}
            isMobile={isMobile}
            textColor={textColor}
            sectionFont={sectionFont}
            bioFont={bioFont}
            metaFont={metaFont}
          />
        )}

        {/* ══ Fairs ══ */}
        {fairs.length > 0 && (
          <CollectionSection
            label={isCn ? "艺博会" : "Fairs"}
            items={fairs}
            hrefPrefix="/fairs"
            isCn={isCn}
            isMobile={isMobile}
            textColor={textColor}
            sectionFont={sectionFont}
            bioFont={bioFont}
            metaFont={metaFont}
          />
        )}

        {/* ══ Events ══ */}
        {events.length > 0 && (
          <CollectionSection
            label={isCn ? "活动" : "Events"}
            items={events}
            isCn={isCn}
            isMobile={isMobile}
            textColor={textColor}
            sectionFont={sectionFont}
            bioFont={bioFont}
            metaFont={metaFont}
          />
        )}
      </div>
    </div>
  );
}