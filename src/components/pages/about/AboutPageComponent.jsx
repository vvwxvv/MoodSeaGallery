"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import useAboutData from "@/components/pages/about/hooks/useAboutData";
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
import { renderArrayContent } from "@/utils/textFormatting";
import useFont from "@/hooks/useFont";

// ─────────────────────────────────────────────────────────────────────────────
//  ✦ 可配置区域 – 调整图片、文本布局及响应式尺寸
// ─────────────────────────────────────────────────────────────────────────────
const CONFIG = Object.freeze({
  // 页面整体
  pageMaxWidth: 1200,
  pagePaddingX: { xs: "24px", md: "48px" },
  pagePaddingY: { xs: "48px", md: "72px" },
  contentAlign: "center", // 'left' | 'center' | 'right'

  // 文本列
  text: {
    flex: 1.4,
    // ★★★ 在这里设置文本框宽度 ★★★
    maxWidth: {
      xs: "100%",   // 移动端全宽
      md: 600,      // 桌面端固定为 500px（您需要的值）
    },
    headingSize: "24px",
    headingWeight: 400,
    headingMargin: "0 0 32px 0",
    bodySize: "14px",
    bodyWeight: 500,
    bodyLineHeight: 1.7,
    bodyOpacity: 0.62,
    paragraphGap: "1.2em",
  },

  // 图片列（桌面端显示）
  image: {
    maxWidth: { xs: "100%", md: 720 }, // 响应式最大宽度
    desktopHeight: { xs: "auto", md: 500 }, // 响应式高度（桌面固定，移动端自动）
    objectFit: "contain", // 'contain' 保证完整显示，'cover' 则会裁剪
    borderRadius: 0,
    showOnMobile: true,
    mobileGap: "60px",
    mobileFallbackAspect: 0.85,
    mobileMinAspect: 0.5,
    mobileMaxAspect: 1.6,
  },

  // 列间距
  columnGap: { xs: 0, md: "50px" },
});

// ─────────────────────────────────────────────────────────────────────────────
//  辅助函数
// ─────────────────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const getContentMargin = (align) => {
  const map = {
    left: { ml: 0, mr: "auto" },
    center: { mx: "auto" },
    right: { ml: "auto", mr: 0 },
  };
  return map[align] || map.center;
};
const CONTENT_MX = getContentMargin(CONFIG.contentAlign);

// ─────────────────────────────────────────────────────────────────────────────
//  动画
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
//  图片组件
// ─────────────────────────────────────────────────────────────────────────────
const AboutImage = React.memo(function AboutImage({ src, alt, fill = false }) {
  const [failed, setFailed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(CONFIG.image.mobileFallbackAspect);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleError = useCallback(() => setFailed(true), []);
  const handleLoad = useCallback((e) => {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    if (!w || !h) return;
    setAspectRatio(clamp(w / h, CONFIG.image.mobileMinAspect, CONFIG.image.mobileMaxAspect));
  }, []);

  if (fill) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `${CONFIG.image.borderRadius}px`,
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
              objectFit: CONFIG.image.objectFit,
              display: "block",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: CONFIG.image.maxWidth.md,
        aspectRatio: src ? aspectRatio : CONFIG.image.mobileFallbackAspect,
        borderRadius: `${CONFIG.image.borderRadius}px`,
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
            objectFit: CONFIG.image.objectFit,
            display: "block",
          }}
        />
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  骨架屏
// ─────────────────────────────────────────────────────────────────────────────
const AboutSkeleton = () => (
  <PageSkeleton bgColor="#fff">
    <Box
      sx={{
        maxWidth: CONFIG.pageMaxWidth,
        ...CONTENT_MX,
        px: CONFIG.pagePaddingX,
        py: CONFIG.pagePaddingY,
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "flex-start",
          gap: CONFIG.columnGap,
        }}
      >
        <Box
          sx={{
            flex: CONFIG.text.flex,
            minWidth: 0,
            maxWidth: CONFIG.text.maxWidth,
          }}
        >
          <SkeletonLine width="100px" height={24} style={{ marginBottom: "32px" }} />
          <SkeletonLine width="100%" height={14} style={{ marginBottom: "18px" }} />
          <SkeletonLine width="92%" height={14} style={{ marginBottom: "18px" }} />
          <SkeletonLine width="85%" height={14} style={{ marginBottom: "18px" }} />
          <SkeletonLine width="65%" height={14} />
        </Box>

        <Box
          sx={{
            flex: "0 0 auto",
            width: "100%",
            maxWidth: CONFIG.image.maxWidth,
            height: CONFIG.image.desktopHeight,
            display: { xs: "none", md: "block" },
          }}
        >
          <SkeletonBlock
            width="100%"
            height="100%"
            style={{ borderRadius: CONFIG.image.borderRadius }}
          />
        </Box>
      </Box>
    </Box>
  </PageSkeleton>
);

// ─────────────────────────────────────────────────────────────────────────────
//  状态守卫
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
//  主页面组件
// ─────────────────────────────────────────────────────────────────────────────
const AboutPageComponent = () => {
  const {
    isCn,
    colors,
    fontFamily: aboutFontFamily,
    galleryAbout,
    isLoading: aboutLoading,
    error: aboutError,
    handleRetry: aboutRetry,
  } = useAboutData();

  const { fontFamily } = useFont(CONFIG.text.bodySize);
  const effectiveFont = aboutFontFamily || fontFamily;

  const hasData = Boolean(galleryAbout);

  if (aboutLoading || aboutError || !hasData) {
    return (
      <AboutStatusGuard
        isLoading={aboutLoading}
        error={aboutError}
        hasData={hasData}
        isCn={isCn}
        onRetry={aboutRetry}
      />
    );
  }

  const { caption, introductions, portrait_image_url } = galleryAbout;
  const hasIntroduction = Array.isArray(introductions) && introductions.length > 0;
  const hasCaption = caption && caption.trim() !== "";

  const headingStyle = {
    fontFamily: effectiveFont,
    fontSize: CONFIG.text.headingSize,
    fontWeight: CONFIG.text.headingWeight,
    color: colors.text,
    margin: CONFIG.text.headingMargin,
    letterSpacing: "0.02em",
  };

  const bodyStyle = {
    fontFamily: effectiveFont,
    fontSize: CONFIG.text.bodySize,
    fontWeight: CONFIG.text.bodyWeight,
    color: colors.text,
    lineHeight: CONFIG.text.bodyLineHeight,
    opacity: CONFIG.text.bodyOpacity,
    margin: `0 0 ${CONFIG.text.paragraphGap} 0`,
    textAlign: "justify",
  };

  const imgAlt = isCn ? "画廊肖像" : "Gallery portrait";

  return (
    <Box sx={{ backgroundColor: colors.background, color: colors.text, minHeight: "100vh" }}>
      <Box
        sx={{
          maxWidth: CONFIG.pageMaxWidth,
          ...CONTENT_MX,
          px: CONFIG.pagePaddingX,
          py: CONFIG.pagePaddingY,
        }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              alignItems: "flex-start",
              gap: CONFIG.columnGap,
            }}
          >
            {/* ── 左侧文本列 ── */}
            <Box
              sx={{
                flex: CONFIG.text.flex,
                minWidth: 0,
                maxWidth: CONFIG.text.maxWidth, // ← 这里应用了 maxWidth 配置
              }}
            >
              <motion.div variants={itemVariants}>
                <h2 style={headingStyle}>{isCn ? "关于" : "About"}</h2>
                {hasCaption && <p style={bodyStyle}>{caption.replace(/\\n/g, "\n")}</p>}
                {hasIntroduction &&
                  introductions.map((item, i) => (
                    <p key={i} style={bodyStyle}>
                      {typeof item === "string" ? item : renderArrayContent([item], {})}
                    </p>
                  ))}
              </motion.div>

              {/* 移动端图片 */}
              {portrait_image_url && CONFIG.image.showOnMobile && (
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                    mt: CONFIG.image.mobileGap,
                  }}
                >
                  <motion.div variants={itemVariants} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <AboutImage src={portrait_image_url} alt={imgAlt} fill={false} />
                  </motion.div>
                </Box>
              )}
            </Box>

            {/* ── 右侧图片列（桌面） ── */}
            <Box
              sx={{
                flex: "0 0 auto",
                width: "100%",
                maxWidth: CONFIG.image.maxWidth,
                height: CONFIG.image.desktopHeight,
                display: { xs: "none", md: "block" },
              }}
            >
              <motion.div variants={itemVariants} style={{ width: "100%", height: "100%" }}>
                <AboutImage src={portrait_image_url} alt={imgAlt} fill />
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutPageComponent;