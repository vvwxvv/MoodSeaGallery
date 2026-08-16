"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import useAppTitle from "@/hooks/useAppTitle";
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
import useCurrentExhibitionImage from "@/components/pages/home/hooks/useCurrentExhibitionImage";
import { formatDateRange } from "@/components/pages/exhibition/utils/exhibitionDates";

// ═════════════════════════════════════════════════════════════════════════
// 📖 TEXT DICTIONARY
// ═════════════════════════════════════════════════════════════════════════
const HOME_TEXT = {
  cover: {
    currentExhibitionLabel: { en: "Current Exhibition", cn: "当前展览" },
    untitled: { en: "Untitled", cn: "未命名" },
  },
  page: {
    loadingFailedTitle: { en: "Loading Failed", cn: "加载失败" },
    loadingFailedSubtitle: { en: "Check connection and retry", cn: "请检查网络连接后重试" },
    retryButton: { en: "Retry", cn: "重试" },
  },
};

// ═════════════════════════════════════════════════════════════════════════
// 🎨 HOME_COVER_CONFIG — the single source of truth for the home cover.
//    Numbered in stacking order (back → front). Edit values here only;
//    the JSX below never needs touching for layout / visual tweaks.
//
//      1. PAGE               — outer shell (bg, overflow — kills scrollbars)
//      2. FULL_BLEED         — edge-to-edge width breakout technique
//      3. COVER_IMAGE        — cover photo (z0) + vertical offset handling
//      4. LEGIBILITY_SCRIM   — dark gradient for text readability (z1)
//      5. TITLE_DATE_BOX     — title + date block (z2) — FULLY CUSTOMIZABLE
//                              via the unified placement system (see below)
//      6. CURRENT_LABEL_BOX  — "Current Exhibition" label (z2) — same
//                              unified placement system
//      7. TITLE              — exhibition title (animated hover underline)
//      8. DATE               — artist / venue + date line
//      9. CURRENT_LABEL      — "Current Exhibition" text style
//     10. EMPTY_COVER        — fallback when no cover image exists
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │ 🎯 UNIFIED PLACEMENT SYSTEM (used by boxes 5 and 6)                 │
// │                                                                     │
// │   ALIGN_X   → "left" | "center" | "right"   horizontal anchor       │
// │   ALIGN_Y   → "top"  | "center" | "bottom"  vertical anchor         │
// │   INSET_X   → distance (px) from left/right edge — ignored when     │
// │               ALIGN_X is "center"                                   │
// │   INSET_Y   → distance (px) from top/bottom edge — ignored when     │
// │               ALIGN_Y is "center"                                   │
// │   OFFSET_X  → fine-tune nudge in px: positive = RIGHT, negative =   │
// │               LEFT (applied as transform — never breaks layout)     │
// │   OFFSET_Y  → fine-tune nudge in px: positive = UP, negative =      │
// │               DOWN (applied as transform — never breaks layout)     │
// │   TEXT_ALIGN→ "auto" follows ALIGN_X, or force "left"/"center"/     │
// │               "right"                                               │
// └─────────────────────────────────────────────────────────────────────┘
// ═════════════════════════════════════════════════════════════════════════
const HOME_COVER_CONFIG = {

  // ── 1. PAGE ──────────────────────────────────────────────────────────
  // ⚠️ Never force a fixed height (e.g. 100vh) here — that is what caused
  //    the phantom white gap + scrollbar. The page sizes to its content.
  PAGE: {
    OVERFLOW_X: "hidden",   // required by the 100vw full-bleed trick
    OVERFLOW_Y: "hidden",   // kills any accidental vertical scrollbar
    // Extra negative pull to cancel bottom gap injected by a PARENT layout
    // (padding/margin outside this component). Increase if a gap remains.
    BOTTOM_GAP_CANCEL: "0px",
  },

  // ── 2. FULL_BLEED — forces true viewport width regardless of parent ──
  FULL_BLEED: {
    WIDTH: "100vw",
    LEFT: "50%",
    RIGHT: "50%",
    MARGIN_LEFT: "-50vw",
    MARGIN_RIGHT: "-50vw",
  },

  // ── 3. COVER_IMAGE — the exhibition cover photograph ─────────────────
  COVER_IMAGE: {
    Z_INDEX: 0,
    HEIGHT_DESKTOP: "88vh",
    HEIGHT_MOBILE: "62vh",
    MIN_HEIGHT_DESKTOP: "560px",
    MIN_HEIGHT_MOBILE: "420px",

    // Pulls the cover up under the header. The cover HEIGHT is
    // automatically extended by this same amount (see coverHeight calc),
    // so the image still reaches the bottom edge — NO gap, NO scrollbar.
    OFFSET_TOP: 50,               // px, positive number = pull up this much

    HOVER_SCALE: 1.03,
    TRANSITION: "transform 0.6s ease",
    LOADING_BG: "rgba(0,0,0,0.03)",
  },

  // ── 4. LEGIBILITY_SCRIM — dark gradient so text stays readable ───────
  LEGIBILITY_SCRIM: {
    Z_INDEX: 1,
    GRADIENT:
      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)",
  },

  // ── 5. TITLE_DATE_BOX — title + date block (ONE box, moved together) ─
  // 🎯 Uses the UNIFIED PLACEMENT SYSTEM (see top of config).
  //
  //    ✅ Currently: DEAD CENTER of the cover image
  //       (ALIGN_X: "center", ALIGN_Y: "center", no nudges).
  //
  //    Examples:
  //      bottom-left  → ALIGN_X: "left",   ALIGN_Y: "bottom", INSET_Y: 200
  //      top-right    → ALIGN_X: "right",  ALIGN_Y: "top",    INSET_Y: 120
  //      center, up a bit → keep center/center, set OFFSET_Y: 60
  TITLE_DATE_BOX: {
    Z_INDEX: 2,
    // — placement —
    ALIGN_X: "left",            // "left" | "center" | "right"
    ALIGN_Y: "center",            // "top"  | "center" | "bottom"
    INSET_X: 0,                   // px from left/right edge (non-center only)
    INSET_Y: 0,                   // px from top/bottom edge (non-center only)
    OFFSET_X: 0,                  // px nudge → +right / −left
    OFFSET_Y: 0,                  // px nudge → +up / −down
    TEXT_ALIGN: "auto",           // "auto" follows ALIGN_X
    // — box style —
    BACKGROUND: "transparent",
    PADDING_DESKTOP: "0 64px",
    PADDING_MOBILE: "0 20px",
    MAX_WIDTH: "900px",
    INNER_GAP: "8px",             // vertical gap between title and date line
    TEXT_COLOR: "#ffffff",
  },

  // ── 6. CURRENT_LABEL_BOX — "Current Exhibition" label ────────────────
  // 🎯 Uses the same UNIFIED PLACEMENT SYSTEM.
  //    ✅ Currently: bottom-right, nudged UP 50px and RIGHT 20px.
  CURRENT_LABEL_BOX: {
    Z_INDEX: 2,
    // — placement —
    ALIGN_X: "right",             // "left" | "center" | "right"
    ALIGN_Y: "bottom",            // "top"  | "center" | "bottom"
    INSET_X: 0,                   // px from left/right edge (non-center only)
    INSET_Y: 30,                  // px from top/bottom edge (non-center only)
    OFFSET_X: 20,                 // px nudge → +right / −left
    OFFSET_Y: 50,                 // px nudge → +up / −down
    TEXT_ALIGN: "auto",           // "auto" follows ALIGN_X
    // — box style —
    BACKGROUND: "transparent",
    PADDING_DESKTOP: "0 64px",
    PADDING_MOBILE: "0 20px",
    TEXT_COLOR: "#ffffff",
  },

  // ── 7. TITLE ─────────────────────────────────────────────────────────
  TITLE: {
    FONT_ROLE: "exhibitionCaption",
    FONT_SIZE_DESKTOP: "68px",
    FONT_SIZE_MOBILE: "50px",
    FONT_WEIGHT: 500,
    LINE_HEIGHT: 1.2,
    LETTER_SPACING: "0px",
    UNDERLINE_HEIGHT: "1px",
    UNDERLINE_GAP: "2px",
    UNDERLINE_TRANSITION: "width 0.35s ease",
  },

  // ── 8. DATE ──────────────────────────────────────────────────────────
  DATE: {
    FONT_ROLE: "exhibitionCaption",
    FONT_SIZE: "18px",
    FONT_WEIGHT: 500,
    LINE_HEIGHT: "20px",
    LETTER_SPACING: "0px",
    OPACITY: 0.9,
    SEPARATOR: "   ",
  },

  // ── 9. CURRENT_LABEL — "Current Exhibition" text style ───────────────
  CURRENT_LABEL: {
    FONT_ROLE: "exhibitionSectionHeading",
    FONT_SIZE: "26px",
    FONT_WEIGHT: 600,
    LINE_HEIGHT: "34px",
    LETTER_SPACING: "0px",
  },

  // ── 10. EMPTY_COVER — placeholder when no cover image exists ─────────
  EMPTY_COVER: {
    FONT_ROLE: "exhibitionCardLabel",
    FONT_SIZE: "12px",
    LINE_HEIGHT: "16px",
    LETTER_SPACING: "0.15em",
    COLOR: "#999",
    OPACITY: 0.6,
    TEXT_TRANSFORM: "uppercase",
  },
};

// ═════════════════════════════════════════════════════════════════════════
// 🧰 HELPERS
// ═════════════════════════════════════════════════════════════════════════
const pickText = (entry, isCn) => (isCn ? entry.cn : entry.en);

function getExhibitionSlug(exhibition) {
  return String(exhibition?.title || exhibition?._id || exhibition?.id || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
}

/**
 * 🎯 UNIFIED PLACEMENT RESOLVER — shared by TITLE_DATE_BOX and
 * CURRENT_LABEL_BOX. Turns the config's ALIGN_X / ALIGN_Y / INSET_X /
 * INSET_Y / OFFSET_X / OFFSET_Y into absolute-position CSS.
 *
 * How it works:
 *  - Non-center anchors pin the box to an edge with INSET as the distance.
 *  - "center" anchors use the classic 50% + translate(-50%) technique.
 *  - OFFSET_X / OFFSET_Y are folded into the SAME transform, so nudges are
 *    pure visual shifts — they never affect layout flow (no gaps, no
 *    scrollbars). +X = right, +Y = up (Y inverted on purpose so config
 *    reads intuitively).
 */
function resolvePlacement(box) {
  const { ALIGN_X, ALIGN_Y, INSET_X, INSET_Y, OFFSET_X, OFFSET_Y, TEXT_ALIGN } = box;

  const style = {
    position: "absolute",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
  };

  // Base translate values (center anchoring contributes -50%)
  let translateX = `${OFFSET_X}px`;
  let translateY = `${-OFFSET_Y}px`; // +Y = up

  // — horizontal anchor —
  if (ALIGN_X === "left") {
    style.left = `${INSET_X}px`;
  } else if (ALIGN_X === "right") {
    style.right = `${INSET_X}px`;
  } else {
    // "center"
    style.left = "50%";
    translateX = `calc(-50% + ${OFFSET_X}px)`;
  }

  // — vertical anchor —
  if (ALIGN_Y === "top") {
    style.top = `${INSET_Y}px`;
  } else if (ALIGN_Y === "bottom") {
    style.bottom = `${INSET_Y}px`;
  } else {
    // "center"
    style.top = "50%";
    translateY = `calc(-50% + ${-OFFSET_Y}px)`;
  }

  style.transform = `translate(${translateX}, ${translateY})`;
  style.textAlign = TEXT_ALIGN === "auto" ? ALIGN_X : TEXT_ALIGN;

  return style;
}

/** Maps a text-align value to the matching flexbox alignment. */
function textAlignToFlexAlign(textAlign) {
  if (textAlign === "center") return "center";
  if (textAlign === "right") return "flex-end";
  return "flex-start";
}

// ═════════════════════════════════════════════════════════════════════════
// 🖼️ SUB-COMPONENTS (presentation only — all values from HOME_COVER_CONFIG)
// ═════════════════════════════════════════════════════════════════════════

/** Layer 0 — ExhibitionCoverImage: the cover photograph */
function ExhibitionCoverImage({ src, alt, isHovered }) {
  const { COVER_IMAGE } = HOME_COVER_CONFIG;
  return (
    <img
      src={src}
      alt={alt}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: COVER_IMAGE.Z_INDEX,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        transition: COVER_IMAGE.TRANSITION,
        transform: isHovered ? `scale(${COVER_IMAGE.HOVER_SCALE})` : "scale(1)",
        display: "block",
      }}
    />
  );
}

/** Layer 1 — CoverLegibilityScrim: dark gradient for text readability */
function CoverLegibilityScrim() {
  const { LEGIBILITY_SCRIM } = HOME_COVER_CONFIG;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: LEGIBILITY_SCRIM.Z_INDEX,
        background: LEGIBILITY_SCRIM.GRADIENT,
        pointerEvents: "none",
      }}
    />
  );
}

/** Layer 2a — ExhibitionTitleDateBlock: ONE box containing the title AND
 *  the date line. The whole box moves together via the unified placement
 *  system in TITLE_DATE_BOX config (currently: dead center of cover). */
function ExhibitionTitleDateBlock({ title, metaLine, isHovered, isMobile }) {
  const { TITLE_DATE_BOX, TITLE, DATE } = HOME_COVER_CONFIG;
  const { fontFamily: titleFontFamily } = useFont(TITLE.FONT_ROLE);
  const { fontFamily: dateFontFamily } = useFont(DATE.FONT_ROLE);

  const placement = resolvePlacement(TITLE_DATE_BOX);
  const flexAlign = textAlignToFlexAlign(placement.textAlign);

  return (
    <div
      style={{
        // ── placement (from unified resolver) ──
        ...placement,
        zIndex: TITLE_DATE_BOX.Z_INDEX,
        // ── box style ──
        background: TITLE_DATE_BOX.BACKGROUND,
        padding: isMobile ? TITLE_DATE_BOX.PADDING_MOBILE : TITLE_DATE_BOX.PADDING_DESKTOP,
        maxWidth: TITLE_DATE_BOX.MAX_WIDTH,
        width: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: TITLE_DATE_BOX.INNER_GAP,
        alignItems: flexAlign,
        pointerEvents: "none",
      }}
    >
      {/* — 7. TITLE (animated hover underline) — */}
      <p
        style={{
          position: "relative",
          display: "inline-block",
          background: "transparent",
          fontFamily: titleFontFamily,
          fontSize: isMobile ? TITLE.FONT_SIZE_MOBILE : TITLE.FONT_SIZE_DESKTOP,
          fontWeight: TITLE.FONT_WEIGHT,
          lineHeight: TITLE.LINE_HEIGHT,
          letterSpacing: TITLE.LETTER_SPACING,
          color: TITLE_DATE_BOX.TEXT_COLOR,
          margin: 0,
        }}
      >
        {title}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: TITLE.UNDERLINE_GAP,
            height: TITLE.UNDERLINE_HEIGHT,
            width: isHovered ? "100%" : "0%",
            backgroundColor: TITLE_DATE_BOX.TEXT_COLOR,
            transition: TITLE.UNDERLINE_TRANSITION,
          }}
        />
      </p>

      {/* — 8. DATE / ARTIST LINE — */}
      {metaLine && (
        <p
          style={{
            background: "transparent",
            fontFamily: dateFontFamily,
            fontSize: DATE.FONT_SIZE,
            fontWeight: DATE.FONT_WEIGHT,
            lineHeight: DATE.LINE_HEIGHT,
            letterSpacing: DATE.LETTER_SPACING,
            color: TITLE_DATE_BOX.TEXT_COLOR,
            opacity: DATE.OPACITY,
            margin: 0,
          }}
        >
          {metaLine}
        </p>
      )}
    </div>
  );
}

/** Layer 2b — ExhibitionCurrentLabel: "Current Exhibition" label.
 *  Position fully driven by CURRENT_LABEL_BOX via the same unified
 *  placement system (currently: bottom-right + nudges). */
function ExhibitionCurrentLabel({ label, isMobile }) {
  const { CURRENT_LABEL_BOX, CURRENT_LABEL } = HOME_COVER_CONFIG;
  const { fontFamily } = useFont(CURRENT_LABEL.FONT_ROLE);

  const placement = resolvePlacement(CURRENT_LABEL_BOX);

  return (
    <div
      style={{
        // ── placement (from unified resolver) ──
        ...placement,
        zIndex: CURRENT_LABEL_BOX.Z_INDEX,
        // ── box style ──
        background: CURRENT_LABEL_BOX.BACKGROUND,
        padding: isMobile
          ? CURRENT_LABEL_BOX.PADDING_MOBILE
          : CURRENT_LABEL_BOX.PADDING_DESKTOP,
        pointerEvents: "none",
      }}
    >
      <p
        style={{
          background: "transparent",
          fontFamily,
          fontSize: CURRENT_LABEL.FONT_SIZE,
          fontWeight: CURRENT_LABEL.FONT_WEIGHT,
          lineHeight: CURRENT_LABEL.LINE_HEIGHT,
          letterSpacing: CURRENT_LABEL.LETTER_SPACING,
          color: CURRENT_LABEL_BOX.TEXT_COLOR,
          margin: 0,
        }}
      >
        {label}
      </p>
    </div>
  );
}

/** Layer 10 — EmptyCoverPlaceholder: fallback when no cover image exists */
function EmptyCoverPlaceholder({ text }) {
  const { EMPTY_COVER } = HOME_COVER_CONFIG;
  const { fontFamily } = useFont(EMPTY_COVER.FONT_ROLE);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        fontFamily,
        fontSize: EMPTY_COVER.FONT_SIZE,
        lineHeight: EMPTY_COVER.LINE_HEIGHT,
        letterSpacing: EMPTY_COVER.LETTER_SPACING,
        color: EMPTY_COVER.COLOR,
        opacity: EMPTY_COVER.OPACITY,
        textTransform: EMPTY_COVER.TEXT_TRANSFORM,
      }}
    >
      {text}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 🏛️ CURRENT EXHIBITION COVER (composition)
// ═════════════════════════════════════════════════════════════════════════
function CurrentExhibitionCover({ exhibition, coverImageUrl, isCn, isMobile, fallbackName }) {
  const t = (entry) => pickText(entry, isCn);
  const { FULL_BLEED, COVER_IMAGE, DATE } = HOME_COVER_CONFIG;

  const [isHovered, setIsHovered] = useState(false);

  const title = exhibition?.title || t(HOME_TEXT.cover.untitled);
  const dateRange = formatDateRange(exhibition, isCn);
  const artistOrVenue = exhibition?.artist || exhibition?.venue || "";
  const metaLine = [artistOrVenue, dateRange].filter(Boolean).join(DATE.SEPARATOR);
  const slug = getExhibitionSlug(exhibition);

  // ── HEIGHT MATH — the no-white-space guarantee ──────────────────────
  // The cover is pulled up by OFFSET_TOP via negative margin. To stop that
  // from leaving an OFFSET_TOP-sized hole at the bottom of the document,
  // we EXTEND the cover's height by exactly the same amount. Net result:
  // the image bottom edge lands precisely where it would have without the
  // offset — zero gap, zero scrollbar.
  const baseHeight = isMobile ? COVER_IMAGE.HEIGHT_MOBILE : COVER_IMAGE.HEIGHT_DESKTOP;
  const baseMinHeight = isMobile ? COVER_IMAGE.MIN_HEIGHT_MOBILE : COVER_IMAGE.MIN_HEIGHT_DESKTOP;
  const coverHeight = `calc(${baseHeight} + ${COVER_IMAGE.OFFSET_TOP}px)`;
  const coverMinHeight = `calc(${baseMinHeight} + ${COVER_IMAGE.OFFSET_TOP}px)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        // ══ FULL-BLEED BREAKOUT — zero side margin regardless of parent ══
        position: "relative",
        width: FULL_BLEED.WIDTH,
        left: FULL_BLEED.LEFT,
        right: FULL_BLEED.RIGHT,
        marginLeft: FULL_BLEED.MARGIN_LEFT,
        marginRight: FULL_BLEED.MARGIN_RIGHT,
        marginTop: `-${COVER_IMAGE.OFFSET_TOP}px`, // pull up (height compensated above)
        marginBottom: 0,
        background: "transparent",
        display: "block",
        lineHeight: 0, // kills inline-box whitespace below the cover
      }}
    >
      <Link
        href={`/exhibitions/${slug}`}
        style={{ display: "block", textDecoration: "none", background: "transparent", lineHeight: 0 }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            height: coverHeight,
            minHeight: coverMinHeight,
            position: "relative",
            overflow: "hidden",
            backgroundColor: coverImageUrl ? "transparent" : COVER_IMAGE.LOADING_BG,
            cursor: "pointer",
            isolation: "isolate",
          }}
        >
          {coverImageUrl ? (
            <>
              {/* z0 — cover photo */}
              <ExhibitionCoverImage src={coverImageUrl} alt={title} isHovered={isHovered} />

              {/* z1 — legibility gradient */}
              <CoverLegibilityScrim />

              {/* z2 — title + date box (ONE unit, currently centered) */}
              <ExhibitionTitleDateBlock
                title={title}
                metaLine={metaLine}
                isHovered={isHovered}
                isMobile={isMobile}
              />

              {/* z2 — "Current Exhibition" label (bottom-right + nudges) */}
              <ExhibitionCurrentLabel
                label={t(HOME_TEXT.cover.currentExhibitionLabel)}
                isMobile={isMobile}
              />
            </>
          ) : (
            <EmptyCoverPlaceholder text={fallbackName} />
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// SKELETON
// ═════════════════════════════════════════════════════════════════════════
function HomeSkeleton({ isMobile, bgColor }) {
  const coverHeight = isMobile ? "62vh" : "88vh";
  const coverMinHeight = isMobile ? "420px" : "560px";
  return (
    <PageSkeleton bgColor={bgColor}>
      <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
        {/* Full-bleed cover block */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            marginLeft: "-50vw",
            left: "50%",
            right: "50%",
            height: coverHeight,
            minHeight: coverMinHeight,
            overflow: "hidden",
          }}
        >
          {/* z0 — cover photo placeholder */}
          <SkeletonBlock
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0 }}
          />

          {/* z1 — dark scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* z2 — title + date block (bottom-left placement) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: "200px",
              padding: isMobile ? "0 20px" : "0 64px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "900px",
            }}
          >
            <SkeletonLine
              width={isMobile ? "200px" : "440px"}
              height={isMobile ? 50 : 68}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.35) 37%, rgba(255,255,255,0.15) 63%)",
                backgroundSize: "400px 100%",
              }}
            />
            <SkeletonLine
              width="200px"
              height={18}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.25) 37%, rgba(255,255,255,0.1) 63%)",
                backgroundSize: "400px 100%",
                opacity: 0.9,
              }}
            />
          </div>

          {/* z2 — "Current Exhibition" label (bottom-right) */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: "30px",
              transform: "translate(20px, 50px)",
              padding: isMobile ? "0 20px" : "0 64px",
            }}
          >
            <SkeletonLine
              width="180px"
              height={26}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.35) 37%, rgba(255,255,255,0.15) 63%)",
                backgroundSize: "400px 100%",
              }}
            />
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 🏠 PAGE
// ═════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { colors } = useReverseTheme();
  const { displayName: fallbackName } = useAppTitle(isCn ? "cn" : "en");

  const t = (entry) => pickText(entry, isCn);

  const {
    currentExhibition,
    coverImageUrl,
    isLoading,
    hasError,
    refetch,
  } = useCurrentExhibitionImage(isCn);

  if (isLoading) return <HomeSkeleton isMobile={isMobile} bgColor={colors.background} />;

  if (hasError) {
    return (
      <AlertInfo
        message={t(HOME_TEXT.page.loadingFailedTitle)}
        subMessage={t(HOME_TEXT.page.loadingFailedSubtitle)}
        buttonText={t(HOME_TEXT.page.retryButton)}
        onBack={refetch}
        isCn={isCn}
      />
    );
  }

  const { PAGE } = HOME_COVER_CONFIG;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        // No forced height — page sizes to the cover. See PAGE config note.
        overflowX: PAGE.OVERFLOW_X,
        overflowY: PAGE.OVERFLOW_Y,
        marginBottom: PAGE.BOTTOM_GAP_CANCEL !== "0px" ? `-${PAGE.BOTTOM_GAP_CANCEL}` : 0,
        fontSize: 0,   // belt-and-braces: no whitespace text nodes create gaps
        lineHeight: 0,
      }}
    >
      <CurrentExhibitionCover
        exhibition={currentExhibition}
        coverImageUrl={coverImageUrl}
        isCn={isCn}
        isMobile={isMobile}
        fallbackName={fallbackName}
      />
    </div>
  );
}