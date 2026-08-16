"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import useAboutData from "@/components/pages/about/hooks/useAboutData";
import useGalleryContactData from "@/components/pages/about/hooks/useGalleryContactData";
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
import { renderArrayContent } from "@/utils/textFormatting";
import useFont from "@/hooks/useFont";

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const TYPE = Object.freeze({
  headingSize: "24px",
  headingWeight: 600,
  headingMargin: "0 0 32px 0",
  bodySize: "14px",
  bodyWeight: 400,
  bodyLineHeight: 1.7,
  bodyOpacity: 0.62, // elegant grey body text
  paragraphGap: "1.2em",
  contactLabelWeight: 600,
  contactGap: "12px",
});

// ─────────────────────────────────────────────────────────────────────────────
// PAGE POSITION  (⇦ set the whole-page block position here)
//   CONTENT_ALIGN : "left" | "center" | "right"  → horizontal placement in the page
//   MAX_WIDTH     : outer cap for the whole block (bigger = wider spread)
//   PAGE_PX       : side padding (left/right breathing room)
//   PAGE_PY       : top / bottom spacing (lower the top value = content sits higher)
// ─────────────────────────────────────────────────────────────────────────────
const LAYOUT = Object.freeze({
  CONTENT_ALIGN: "center",               // ← "left" | "center" | "right"
  MAX_WIDTH: 1400,                       // outer cap for the whole block
  PAGE_PX: { xs: "24px", md: "48px" },   // side padding
  PAGE_PY: { xs: "48px", md: "72px" },   // top / bottom — lower top = content comes up
  COLUMN_GAP: { xs: 0, md: "72px" },     // gap between text & image column (desktop)

  TEXT_COLUMN_FLEX: 1.4,                 // left column grows more than the image
  TEXT_MAX_WIDTH: 680,                   // readable text-column cap
  IMAGE_COLUMN_FLEX: 1,                  // right column weight

  // Gap between the About block and the Contact block.
  ABOUT_TO_CONTACT_GAP: { xs: "60px", md: "96px" },
});

// Map CONTENT_ALIGN → horizontal margins for the outer block.
const ALIGN_MX = {
  left: { ml: 0, mr: "auto" },
  center: { mx: "auto" },
  right: { ml: "auto", mr: 0 },
};
const CONTENT_MX = ALIGN_MX[LAYOUT.CONTENT_ALIGN] || ALIGN_MX.center;

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL CONFIG  (contact → social list spacing — tune here)
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL = Object.freeze({
  TOP_GAP: "22px",
});

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE CONFIG  (tune here)
// Desktop: the image fills the FULL height of the text column (flex-stretch),
// cover-cropped, no frame / no border-radius. Mobile: natural ratio, stacked.
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE = Object.freeze({
  MAX_WIDTH: 520,               // px cap on the image column
  OBJECT_FIT: "cover",          // fills the panel (matches text-column height cleanly)
  BORDER_RADIUS: 0,             // no rounded corners / no frame
  // Mobile stacked image only:
  MOBILE_FALLBACK_ASPECT: 0.85, // ratio until the image reports its real size
  MOBILE_MIN_ASPECT: 0.5,
  MOBILE_MAX_ASPECT: 1.6,
  SHOW_ON_MOBILE: true,
  MOBILE_GAP: "60px",
});

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT IMAGE
//   fill = true  → desktop: height:100% of the (stretched) column, cover, no frame
//   fill = false → mobile:  natural aspect ratio, no frame
// ─────────────────────────────────────────────────────────────────────────────
const AboutImage = React.memo(function AboutImage({ src, alt, fill = false }) {
  const [failed, setFailed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(IMAGE.MOBILE_FALLBACK_ASPECT);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleError = useCallback(() => setFailed(true), []);

  const handleLoad = useCallback((e) => {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    if (!w || !h) return;
    setAspectRatio(clamp(w / h, IMAGE.MOBILE_MIN_ASPECT, IMAGE.MOBILE_MAX_ASPECT));
  }, []);

  // ── Desktop: fill the whole column height, no frame ──
  if (fill) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: `${IMAGE.MAX_WIDTH}px`,
          borderRadius: `${IMAGE.BORDER_RADIUS}px`,
          overflow: "hidden",
        }}
      >
        {src && !failed && (
          <img
            key={src}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={handleError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: IMAGE.OBJECT_FIT,
              display: "block",
            }}
          />
        )}
      </div>
    );
  }

  // ── Mobile: natural aspect ratio, no frame ──
  return (
    <div
      style={{
        width: "100%",
        maxWidth: `${IMAGE.MAX_WIDTH}px`,
        aspectRatio: src ? aspectRatio : IMAGE.MOBILE_FALLBACK_ASPECT,
        borderRadius: `${IMAGE.BORDER_RADIUS}px`,
        overflow: "hidden",
      }}
    >
      {src && !failed && (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: IMAGE.OBJECT_FIT,
            display: "block",
          }}
        />
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON  (matches the new left-hugging two-column layout)
// ─────────────────────────────────────────────────────────────────────────────
const AboutSkeleton = () => (
  <PageSkeleton bgColor="#fff">
    <Box
      sx={{
        maxWidth: LAYOUT.MAX_WIDTH,
        ...CONTENT_MX,
        px: LAYOUT.PAGE_PX,
        py: LAYOUT.PAGE_PY,
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "stretch",
          gap: LAYOUT.COLUMN_GAP,
        }}
      >
        {/* Left: text (About + Contact) */}
        <Box sx={{ flex: LAYOUT.TEXT_COLUMN_FLEX, minWidth: 0, maxWidth: LAYOUT.TEXT_MAX_WIDTH }}>
          <Box sx={{ mb: LAYOUT.ABOUT_TO_CONTACT_GAP }}>
            <SkeletonLine width="100px" height={24} style={{ marginBottom: "32px" }} />
            <SkeletonLine width="100%" height={14} style={{ marginBottom: "18px" }} />
            <SkeletonLine width="92%" height={14} style={{ marginBottom: "18px" }} />
            <SkeletonLine width="85%" height={14} style={{ marginBottom: "18px" }} />
            <SkeletonLine width="65%" height={14} />
          </Box>

          <Box>
            <SkeletonLine width="140px" height={24} style={{ marginBottom: "32px" }} />
            <SkeletonLine width="320px" height={14} style={{ marginBottom: "12px" }} />
            <SkeletonLine width="280px" height={14} style={{ marginBottom: "12px" }} />
            <SkeletonLine width="300px" height={14} style={{ marginBottom: "12px" }} />
            <SkeletonLine width="360px" height={14} />
          </Box>
        </Box>

        {/* Right: image (fills column height) */}
        <Box
          sx={{
            flex: LAYOUT.IMAGE_COLUMN_FLEX,
            minWidth: 0,
            maxWidth: `${IMAGE.MAX_WIDTH}px`,
            display: { xs: "none", md: "block" },
          }}
        >
          <SkeletonBlock width="100%" height="100%" style={{ minHeight: 420, borderRadius: IMAGE.BORDER_RADIUS }} />
        </Box>
      </Box>
    </Box>
  </PageSkeleton>
);

// ─────────────────────────────────────────────────────────────────────────────
// STATUS GUARD  (loading / error for both hooks)
// ─────────────────────────────────────────────────────────────────────────────
const AboutStatusGuard = ({ isLoading, error, hasData, isCn, onRetry }) => {
  if (isLoading) return <AboutSkeleton />;
  if (error) {
    return (
      <AlertInfo
        message={isCn ? "连接失败" : "Connection Failed"}
        subMessage={isCn ? "系统暂时不可用" : "System temporarily unavailable"}
        buttonText={isCn ? "重试" : "Try Again"}
        onBack={onRetry}
        isCn={isCn}
      />
    );
  }
  if (!hasData) {
    return <AlertInfo message={isCn ? "暂无关于数据" : "No about data available"} isCn={isCn} />;
  }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const AboutPageComponent = () => {
  // ── About data ──
  const {
    isCn,
    colors,
    fontFamily: aboutFontFamily,
    galleryAbout,
    isLoading: aboutLoading,
    error: aboutError,
    handleRetry: aboutRetry,
  } = useAboutData();

  // ── Contact data ──
  const {
    contacts,
    isLoading: contactLoading,
    error: contactError,
    handleRetry: contactRetry,
  } = useGalleryContactData();

  // ── Combined loading / error ──
  const isLoading = aboutLoading || contactLoading;
  const error = aboutError || contactError;
  const handleRetry = () => {
    aboutRetry();
    contactRetry();
  };

  // ── Font ──
  const { fontFamily } = useFont(TYPE.bodySize);
  const effectiveFont = aboutFontFamily || fontFamily;

  const hasData = Boolean(galleryAbout);

  if (isLoading || error || !hasData) {
    return (
      <AboutStatusGuard
        isLoading={isLoading}
        error={error}
        hasData={hasData}
        isCn={isCn}
        onRetry={handleRetry}
      />
    );
  }

  // ── Contact info ──
  const contact = contacts?.[0] || null;

  const rawSocial = contact?.social_media ?? contact?.socialMedia ?? [];
  const socialMedia = Array.isArray(rawSocial)
    ? rawSocial.filter((s) => s && (s.platform || s.account || s.url))
    : [];

  const contactInfo = contact
    ? {
        galleryName: contact.gallery_name ?? contact.galleryName ?? "",
        openingTime: contact.opening_time ?? contact.openingTime ?? "",
        email: contact.email ?? "",
        phone: contact.phone ?? "",
        address: Array.isArray(contact.address) ? contact.address.join(", ") : "",
        web_url: contact.web_url ?? "",
        socialMedia,
      }
    : null;

  // ── About fields ──
  const { caption, introductions, portrait_image_url } = galleryAbout;
  const hasIntroduction = Array.isArray(introductions) && introductions.length > 0;
  const hasCaption = caption && caption.trim() !== "";

  // ── Shared styles ──
  const headingStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.headingSize,
    fontWeight: TYPE.headingWeight,
    color: colors.text,
    margin: TYPE.headingMargin,
    letterSpacing: "0.02em",
  };

  const bodyStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.bodySize,
    fontWeight: TYPE.bodyWeight,
    color: colors.text,
    lineHeight: TYPE.bodyLineHeight,
    opacity: TYPE.bodyOpacity,
    margin: `0 0 ${TYPE.paragraphGap} 0`,
    textAlign: "justify",
  };

  const contactLineStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.bodySize,
    color: colors.text,
    margin: `0 0 ${TYPE.contactGap} 0`,
    display: "flex",
    gap: "6px",
    opacity: TYPE.bodyOpacity,
  };

  const labelStyle = { fontWeight: TYPE.contactLabelWeight, opacity: 1 };
  const linkStyle = {
    color: "inherit",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  };

  const labels = {
    aboutTitle: isCn ? "关于" : "About",
    contactTitle: isCn ? "联系方式" : "Contact",
    openingLabel: isCn ? "开放时间:" : "Opening:",
    telLabel: isCn ? "电话:" : "Tel:",
    emailLabel: isCn ? "邮箱:" : "Email:",
    addressLabel: isCn ? "地址:" : "Address:",
  };

  const imgAlt = isCn ? "画廊肖像" : "Gallery portrait";


  return (
    <Box sx={{ backgroundColor: colors.background, color: colors.text, minHeight: "100vh" }}>
      {/* Whole-page content block — position controlled by LAYOUT.CONTENT_ALIGN */}
      <Box
        sx={{
          maxWidth: LAYOUT.MAX_WIDTH,
          ...CONTENT_MX,
          px: LAYOUT.PAGE_PX,
          py: LAYOUT.PAGE_PY,
        }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              alignItems: "stretch", // ← image column stretches to text-column height
              gap: LAYOUT.COLUMN_GAP,
            }}
          >
            {/* ── LEFT COLUMN: text (About + Contact) ── */}
            <Box sx={{ flex: LAYOUT.TEXT_COLUMN_FLEX, minWidth: 0, maxWidth: LAYOUT.TEXT_MAX_WIDTH }}>


              {/* ── CONTACT SECTION ── */}
              <Box style={{ marginTop:"400px" }}>
              <motion.div variants={itemVariants}>
      <h2 style={headingStyle}>{labels.contactTitle}</h2>

      {contactInfo ? (
        <>
          {contactInfo.openingTime && (
            <div style={contactLineStyle}>
              <span style={labelStyle}>{labels.openingLabel}</span>
              <span>{contactInfo.openingTime}</span>
            </div>
          )}
          {contactInfo.phone && (
            <div style={contactLineStyle}>
              <span style={labelStyle}>{labels.telLabel}</span>
              <span>{contactInfo.phone}</span>
            </div>
          )}
          {contactInfo.email && (
            <div style={contactLineStyle}>
              <span style={labelStyle}>{labels.emailLabel}</span>
              <a href={`mailto:${contactInfo.email}`} style={linkStyle}>
                {contactInfo.email}
              </a>
            </div>
          )}
          {contactInfo.address && (
            <div style={contactLineStyle}>
              <span style={labelStyle}>{labels.addressLabel}</span>
              <span>{contactInfo.address}</span>
            </div>
          )}
          {contactInfo.web_url && (
            <div style={contactLineStyle}>
              <span style={labelStyle}>Web:</span>
              <a href={contactInfo.web_url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {contactInfo.web_url}
              </a>
            </div>
          )}

          {/* ── Social media ── */}
          {contactInfo.socialMedia.length > 0 && (
            <div style={{ marginTop: SOCIAL.TOP_GAP }}>
              {contactInfo.socialMedia.map((s, i) => (
                <div key={`${s.platform || "social"}-${i}`} style={contactLineStyle}>
                  {s.platform && <span style={labelStyle}>{s.platform}:</span>}
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                      {s.account || s.url}
                    </a>
                  ) : (
                    <span>{s.account}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p style={bodyStyle}>{isCn ? "暂无联系信息" : "No contact information available"}</p>
      )}
    </motion.div>

              </Box>
            </Box>

          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutPageComponent;
