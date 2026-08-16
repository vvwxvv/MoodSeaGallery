"use client";

import React, { useContext} from "react";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import useGalleryContactData from "@/components/pages/contact/hooks/useGalleryContactData";
import PageSkeleton, {SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
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
  bodyOpacity: 0.62,
  paragraphGap: "1.2em",
  contactLabelWeight: 600,
  contactGap: "12px",
});

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT  – single column, centered, no image
// ─────────────────────────────────────────────────────────────────────────────
const LAYOUT = Object.freeze({
  CONTENT_ALIGN: "center",
  MAX_WIDTH: 800,                     // max width for the contact block
  PAGE_PX: { xs: "24px", md: "48px" },
  PAGE_PY: { xs: "48px", md: "72px" },
});

const ALIGN_MX = {
  left: { ml: 0, mr: "auto" },
  center: { mx: "auto" },
  right: { ml: "auto", mr: 0 },
};
const CONTENT_MX = ALIGN_MX[LAYOUT.CONTENT_ALIGN] || ALIGN_MX.center;

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL = Object.freeze({
  TOP_GAP: "22px",
});

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
// SKELETON  – shows only contact info skeleton
// ─────────────────────────────────────────────────────────────────────────────
const ContactSkeleton = () => (
  <PageSkeleton bgColor="#fff">
    <Box
      sx={{
        maxWidth: LAYOUT.MAX_WIDTH,
        ...CONTENT_MX,
        px: LAYOUT.PAGE_PX,
        py: LAYOUT.PAGE_PY,
      }}
    >
      <SkeletonLine width="140px" height={24} style={{ marginBottom: "32px" }} />
      <SkeletonLine width="320px" height={14} style={{ marginBottom: "12px" }} />
      <SkeletonLine width="280px" height={14} style={{ marginBottom: "12px" }} />
      <SkeletonLine width="300px" height={14} style={{ marginBottom: "12px" }} />
      <SkeletonLine width="360px" height={14} style={{ marginBottom: "12px" }} />
      <SkeletonLine width="260px" height={14} style={{ marginTop: "22px" }} />
    </Box>
  </PageSkeleton>
);

// ─────────────────────────────────────────────────────────────────────────────
// STATUS GUARD
// ─────────────────────────────────────────────────────────────────────────────
const ContactStatusGuard = ({ isLoading, error, hasData, isCn, onRetry }) => {
  if (isLoading) return <ContactSkeleton />;
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
    return <AlertInfo message={isCn ? "暂无联系信息" : "No contact information available"} isCn={isCn} />;
  }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const ContactPageComponent = () => {

  const {
    contacts,
    isLoading: contactLoading,
    error: contactError,
    handleRetry: contactRetry,
  } = useGalleryContactData();

  // ── Combined loading / error ──
  const isLoading = contactLoading;
  const error =  contactError;
  const handleRetry = () => {
    aboutRetry();
    contactRetry();
  };

  // ── Font ──
  const { fontFamily } = useFont(TYPE.bodySize);
  const effectiveFont = fontFamily;
  const { isCn } = useContext(LanguageContext);

  const hasData = Boolean(contacts && contacts.length > 0);

  if (isLoading || error || !hasData) {
    return (
      <ContactStatusGuard
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

  // ── Shared styles ──
  const headingStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.headingSize,
    fontWeight: TYPE.headingWeight,
    color: "black",
    margin: TYPE.headingMargin,
    letterSpacing: "0.02em",
  };

  const bodyStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.bodySize,
    fontWeight: TYPE.bodyWeight,
    color:"black",
    lineHeight: TYPE.bodyLineHeight,
    opacity: TYPE.bodyOpacity,
    margin: `0 0 ${TYPE.paragraphGap} 0`,
    textAlign: "justify",
  };

  const contactLineStyle = {
    fontFamily: effectiveFont,
    fontSize: TYPE.bodySize,
    color: "black",
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
    contactTitle: isCn ? "联系方式" : "Contact",
    openingLabel: isCn ? "开放时间:" : "Opening:",
    telLabel: isCn ? "电话:" : "Tel:",
    emailLabel: isCn ? "邮箱:" : "Email:",
    addressLabel: isCn ? "地址:" : "Address:",
  };

  // ── Contact block ──
  const contactBlock = (
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
  );

  return (
    <Box sx={{ backgroundColor: colors.background, color: colors.text, minHeight: "100vh" }}>
      {/* Whole‑page content block – single column, centered */}
      <Box
        sx={{
          maxWidth: LAYOUT.MAX_WIDTH,
          ...CONTENT_MX,
          px: LAYOUT.PAGE_PX,
          py: LAYOUT.PAGE_PY,
        }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {contactBlock}
        </motion.div>
      </Box>
    </Box>
  );
};

export default ContactPageComponent;